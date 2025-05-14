# TypeScript Learning Repository

This repository automatically generates unique TypeScript functions and classes daily, serving as a learning resource for TypeScript developers.

## Features

- Daily generation of unique TypeScript functions and classes
- Automatic deduplication of function names
- GitHub Actions workflow for automated updates
- TypeScript configuration with strict type checking
- Environment variable management for API keys

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- Git
- OpenAI API key

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/jpkOSTEP/learn-typescript.git
   cd learn-typescript
   ```

2. **Set up Python virtual environment**
   ```bash
   # Create virtual environment
   python -m venv .venv

   # Activate virtual environment
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate

   # Install Python dependencies
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   # On Windows:
   set OPENAI_API_KEY=your_api_key_here
   # On macOS/Linux:
   export OPENAI_API_KEY=your_api_key_here
   ```

4. **Install TypeScript dependencies**
   ```bash
   npm install
   ```

## Running the Generator

To manually generate a new TypeScript function:

1. Ensure your virtual environment is activated
2. Run the generator:
   ```bash
   python update_code.py
   ```

The script will:
- Generate a unique TypeScript function/class
- Add it to `learn.ts`
- Update `seen_functions.txt`
- Commit and push changes (if configured)

## Project Structure

- `learn.ts`: Main TypeScript file containing generated functions
- `update_code.py`: Python script for generating new functions
- `seen_functions.txt`: Tracks used function names to ensure uniqueness
- `requirements.txt`: Python dependencies
- `package.json`: TypeScript/Node.js dependencies
- `.github/workflows/`: GitHub Actions workflow files

## Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key for GPT-4 access

Optional environment variables:
- `WEATHER_API_KEY`: If using weather-related functions (not recommended as they're already included)

## Troubleshooting

1. **ModuleNotFoundError: No module named 'openai'**
   - Ensure virtual environment is activated
   - Run `pip install -r requirements.txt`

2. **TypeScript compilation errors**
   - Run `npm install` to install dependencies
   - Check `tsconfig.json` for configuration

3. **Git push failures**
   - Ensure Git is configured with your credentials
   - Check repository permissions

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- The TypeScript community for best practices and inspiration 