#!/usr/bin/env python3
import os
import random
import subprocess
import logging
import shutil
from datetime import datetime, timedelta
from pathlib import Path
import re
import time

from openai import OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


with open(__file__) as f:
    contents = f.read()
    if "sk-" in contents and "os.getenv(" not in contents:
        raise Exception("❌ API key should not be hardcoded in public repos!")


# Setup logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

is_github_actions = os.getenv("GITHUB_ACTIONS") == "true"


script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)
print(script_dir)
DEDUPE_LOG = os.path.join(script_dir, "seen_functions.txt")
print(DEDUPE_LOG)

TS_FILE_PATH = os.path.join(script_dir, "learn.ts")
# openai.api_key = os.getenv("OPENAI_API_KEY")

MAX_SEEN_FUNCTIONS = 100  # only use the last 100 function names to keep prompt short


def generate_typescript_snippet():
    """
    Uses OpenAI GPT-4o to generate a short, typed, and useful TypeScript function or class method.
    Strips markdown code fences and validates the output before returning it.
    Falls back to a noop() function if generation fails.
    """
    # Load last N seen function names
    if os.path.exists(DEDUPE_LOG):
        with open(DEDUPE_LOG) as f:
            seen_funcs = [line.strip() for line in f if line.strip()]
        recent_funcs = seen_funcs[-MAX_SEEN_FUNCTIONS:]
        dedupe_note = (
            "Use a unique and distinct name. You must avoid reusing any of these already used names: "
            + ", ".join(recent_funcs)
            + "."
        )
        # print("Path exists")
        # print(dedupe_note)
    else:
        # print("Path DOES NOT exist")
        dedupe_note = ""

    prompt = f"""
{dedupe_note}
Now, write useful TypeScript function or class method. You may call free external APIs.
Return only raw TypeScript code — do NOT include markdown code fences or explanations.
Use proper typing.
IMPORTANT: Do NOT generate any weather-related functions as they already exist.
"""

    print("final prompt sent to GPT: " + prompt)

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert in backend development using TypeScript.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=200,
        )

        print("response from GPT:", response.choices[0].message.content)
        ts_code = response.choices[0].message.content.strip()

        # Remove Markdown code fences like ```typescript
        if ts_code.startswith("```"):
            lines = ts_code.splitlines()
            ts_code = "\n".join(
                line for line in lines if not line.strip().startswith("```")
            ).strip()

        if not any(k in ts_code for k in ("function", "class", "=>")):
            raise ValueError("No valid TypeScript code detected.")
        if "noop" in ts_code and "No operation" in ts_code:
            raise ValueError("Generated fallback; rejecting to avoid loop.")

        logging.info(f"gpt-4o snippet preview:\n{ts_code[:120]}...")

        return f"\n{ts_code}\n"

    except Exception as e:
        logging.warning("gpt-4o generation failed: %s", str(e))
        if "function noop" in Path(TS_FILE_PATH).read_text():
            logging.warning("Skipping fallback: noop() already exists.")
            return f"// Skipped fallback on {datetime.now().strftime('%Y-%m-%d')}\n"

        return f"""// Appended by cron on {datetime.now().strftime('%Y-%m-%d')}
export function noop(): void {{
  console.log("No operation performed.");
}}\n"""


def extract_all_function_like_names(code: str) -> set[str]:
    """
    Extracts top-level function names, class method names, and class names from TypeScript code.
    """
    fn_pattern = r"^\s*(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*(<[^>]*>)?\s*\("
    method_pattern = r"^\s*(?:async\s+)?(\w+)\s*\(.*\)\s*\{"
    class_pattern = r"^\s*(?:export\s+)?class\s+(\w+)\s*\{"
    # class_pattern = r"^\s*(?:export\s+)?class\s+(\w+)"

    matches = set(name for name, _ in re.findall(fn_pattern, code, flags=re.MULTILINE))
    matches |= set(re.findall(class_pattern, code, flags=re.MULTILINE))

    for match in re.findall(method_pattern, code, flags=re.MULTILINE):
        if match not in {
            "if",
            "for",
            "while",
            "constructor",
            "return",
            "switch",
            "catch",
        }:
            matches.add(match)

    return matches


def is_duplicate(snippet: str) -> bool:
    new_funcs = extract_all_function_like_names(snippet)

    # Read known function names from file
    if os.path.exists(DEDUPE_LOG):
        with open(DEDUPE_LOG, "r") as f:
            seen = set(line.strip() for line in f.readlines())
    else:
        seen = set()

    overlap = new_funcs & seen
    if overlap:
        logging.warning(f"Duplicate function(s) from log: {', '.join(overlap)}")
        return True
    return False


def append_ts_code(max_attempts=3, delay_seconds=2) -> bool:
    """
    Attempts to generate a unique TypeScript snippet and append it to the file.
    Retries if a duplicate is found, up to max_attempts.
    """
    for attempt in range(1, max_attempts + 1):
        logging.info(f"Generation attempt {attempt} of {max_attempts}")
        snippet = generate_typescript_snippet()

        if not is_duplicate(snippet):
            with open(TS_FILE_PATH, "a") as f:
                f.write(snippet)

            new_funcs = extract_all_function_like_names(snippet)
            logging.info(f"Extracted function names: {new_funcs}")

            # Read existing functions
            existing_funcs = set()
            if os.path.exists(DEDUPE_LOG):
                with open(DEDUPE_LOG, "r") as f:
                    existing_funcs = {line.strip() for line in f if line.strip()}

            # Add new functions and write back deduplicated
            all_funcs = sorted(existing_funcs | new_funcs)
            with open(DEDUPE_LOG, "w") as log:
                for func in all_funcs:
                    log.write(func + "\n")

            logging.info("✅ Appended new TypeScript snippet.")
            return True
        else:
            logging.warning("⚠️ Duplicate snippet detected — retrying.")
            time.sleep(delay_seconds)

    logging.error("❌ Max attempts reached. No unique snippet could be generated.")
    return False


def generate_random_commit_message():
    """
    Returns a short Conventional Commits-style message with the current date for the Git commit.
    """
    return f"feat(ts): append daily snippet ({datetime.now().strftime('%Y-%m-%d')})"


def git_commit():
    """
    Stages learn.ts and commits it to Git with a generated commit message.
    """
    subprocess.run(["git", "add", TS_FILE_PATH], check=True)
    message = generate_random_commit_message()
    subprocess.run(["git", "commit", "-m", message], check=True)


def git_push():
    """
    Pushes the local Git commit to the remote repository.
    Logs errors if the push fails.
    """
    result = subprocess.run(["git", "push"], capture_output=True, text=True)
    if result.returncode == 0:
        logging.info("Pushed to GitHub.")
    else:
        logging.error("Git push failed:")
        logging.error(result.stderr)


def update_cron_with_random_time():
    """
    Sets a new cron job to run update_code.py at a random time tomorrow.
    Only runs when not inside GitHub Actions.
    """
    future_time = datetime.now() + timedelta(days=1)
    hour = random.randint(0, 23)
    minute = random.randint(0, 59)

    python_exec = shutil.which("python3")
    cron_cmd = f"{minute} {hour} * * * cd {script_dir} && OPENAI_API_KEY={os.getenv('OPENAI_API_KEY')} {python_exec} {os.path.join(script_dir, 'update_code.py')}\n"

    cron_file = "/tmp/current_cron"
    os.system("crontab -l > /tmp/current_cron 2>/dev/null || true")

    with open(cron_file, "r") as f:
        lines = f.readlines()

    with open(cron_file, "w") as f:
        for line in lines:
            if "update_code.py" not in line or f"{script_dir}" not in line:
                f.write(line)
        f.write(cron_cmd)

    os.system(f"crontab {cron_file}")
    os.remove(cron_file)
    logging.info(f"Cron job set for {hour:02d}:{minute:02d} tomorrow.")


def main():
    """
    Orchestrates the generation, commit, push, and (if local) cron rescheduling.
    Wraps all logic in a try-catch block for robust error logging.
    """
    try:
        updated = append_ts_code()
        if updated:
            git_commit()
            git_push()
        else:
            logging.info("No changes made — skipping commit/push.")

        if not is_github_actions:
            update_cron_with_random_time()
    except Exception as e:
        logging.exception("Script failed")
        exit(1)


if __name__ == "__main__":
    main()
