// Utility Functions
function findMax<T extends number | string>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items.reduce((max, item) => (item > max ? item : max));
}

function getUniqueElements<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

function isPalindrome(input: string): boolean {
  const sanitizedInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedInput = sanitizedInput.split('').reverse().join('');
  return sanitizedInput === reversedInput;
}

function filterArrayByType<T>(array: unknown[], type: string): T[] {
  return array.filter(item => typeof item === type) as T[];
}

function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const total = numbers.reduce((sum, num) => sum + num, 0);
  return total / numbers.length;
}

function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter(number => number % 2 === 0);
}

function sumArray(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// Data Structures
class Queue<T> {
  private items: T[] = [];
  
  enqueue(item: T): void {
    this.items.push(item);
  }
  
  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Utility Classes
class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }
}

class Rectangle {
  constructor(private width: number, private height: number) {}

  calculateArea(): number {
    return this.width * this.height;
  }
}

class TemperatureConverter {
  static celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
}

// API Functions
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const data: T = await response.json();
  return data;
}

async function getWeatherForecast(city: string): Promise<string> {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('Weather API key not configured');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    return `The current temperature in ${city} is ${temperature}°C with ${description}.`;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return `Failed to get weather data: ${error.message}`;
    }
    return 'Failed to get weather data: Unknown error occurred';
  }
}

async function retrievePublicAPIs(): Promise<any[]> {
  const response = await fetch('https://api.publicapis.org/entries');
  if (!response.ok) {
    throw new Error('Failed to fetch public APIs');
  }
  const data = await response.json();
  return data.entries;
}

async function fetchRandomUser(): Promise<any> {
  const response = await fetch('https://randomuser.me/api/');
  if (!response.ok) {
    throw new Error('Failed to fetch random user data');
  }
  const data = await response.json();
  return data.results[0];
}

async function retrieveCountryInfo(countryName: string): Promise<{ name: string, population: number, capital: string } | null> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const data = await response.json();
    const country = data[0];
    return {
      name: country.name.common,
      population: country.population,
      capital: country.capital[0]
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Fallback function
export function noop(): void {
  console.log("No operation performed.");
}

function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function filterByProperty<T, K extends keyof T>(arr: T[], key: K, value: T[K]): T[] {
  return arr.filter(item => item[key] === value);
}

function getUniqueValues<T>(array: T[]): T[] {
  const uniqueSet: Set<T> = new Set(array);
  return Array.from(uniqueSet);
}

function findMaxInArray(arr: number[]): number | null {
  if (arr.length === 0) return null;
  return arr.reduce((max, current) => (current > max ? current : max), arr[0]);
}

function removeDuplicates<T>(array: T[]): T[] {
  const seen = new Set<T>();
  return array.filter(item => {
    if (seen.has(item)) {
      return false;
    }
    seen.add(item);
    return true;
  });
}

function deduplicateArray<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

function getAverage(numbers: number[]): number | null {
  if (numbers.length === 0) return null;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}
async function retrieveCityWeather(city: string): Promise<{ temperature: number; description: string } | null> {
  try {
    const apiKey = 'your_api_key_here'; // Replace with your actual API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    return null;
  }
}

async function fetchCatFacts(limit: number): Promise<string[]> {
    const response = await fetch(`https://catfact.ninja/facts?limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch cat facts');
    }
    const data = await response.json();
    return data.data.map((fact: { fact: string }) => fact.fact);
}

async function fetchSpaceXLaunches(): Promise<any[]> {
    const response = await fetch('https://api.spacexdata.com/v4/launches');
    if (!response.ok) {
        throw new Error('Failed to fetch SpaceX launches');
    }
    const launches: any[] = await response.json();
    return launches;
}

async function retrieveJokeAndFact(): Promise<{ joke: string; fact: string }> {
  const jokeResponse = await fetch('https://official-joke-api.appspot.com/random_joke');
  const jokeData = await jokeResponse.json();
  const joke = `${jokeData.setup} - ${jokeData.punchline}`;

  const factResponse = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const factData = await factResponse.json();
  const fact = factData.text;

  return { joke, fact };
}

async function retrieveRandomDogImage(): Promise<string> {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!response.ok) {
      throw new Error('Failed to fetch dog image');
    }
    const data: { message: string; status: string } = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching dog image:', error);
    throw error;
  }
}
