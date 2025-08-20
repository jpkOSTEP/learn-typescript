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

async function retrieveRandomProgrammingJoke(): Promise<string> {
    try {
        const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
        const jokes = await response.json();
        if (jokes.length > 0) {
            return jokes[0].setup + ' ' + jokes[0].punchline;
        }
        throw new Error('No jokes found');
    } catch (error) {
        throw new Error('Failed to fetch joke: ' + error.message);
    }
}

async function fetchCryptoPrice(cryptoSymbol: string): Promise<number | null> {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data[cryptoSymbol]?.usd || null;
  } catch (error) {
    console.error('Error fetching cryptocurrency price:', error);
    return null;
  }
}

async function fetchRandomAdvice(): Promise<string> {
  const response = await fetch('https://api.adviceslip.com/advice');
  const data = await response.json();
  return data.slip.advice;
}

class AdviceGiver {
  static async getAdvice(): Promise<string> {
    try {
      const advice = await fetchRandomAdvice();
      return advice;
    } catch (error) {
      return 'Unable to fetch advice at the moment.';
    }
  }
}

// Example usage:
// AdviceGiver.getAdvice().then(console.log);

async function fetchRandomTrivia(): Promise<string> {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    if (!response.ok) {
      throw new Error('Failed to fetch trivia');
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].question;
    } else {
      throw new Error('No trivia found');
    }
  } catch (error) {
    console.error('Error fetching trivia:', error);
    return 'Unable to fetch trivia at this time.';
  }
}

async function getRandomQuote(): Promise<string> {
  const response = await fetch('https://api.quotable.io/random');
  if (!response.ok) {
    throw new Error('Failed to fetch a random quote');
  }
  const data = await response.json();
  return `"${data.content}" - ${data.author}`;
}

async function fetchRandomDogFact(): Promise<string> {
    const response = await fetch('https://dog-api.kinduff.com/api/facts');
    if (!response.ok) {
        throw new Error('Failed to fetch dog fact');
    }
    const data: { facts: string[] } = await response.json();
    return data.facts[0];
}

async function fetchRandomUser(): Promise<any> {
  try {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) {
      throw new Error('Failed to fetch random user');
    }
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

fetchRandomUser().then(user => {
  console.log(user);
}).catch(error => {
  console.error('Error fetching random user:', error);
});

async function fetchRandomAdviceSlip(): Promise<string> {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) {
      throw new Error(`Error fetching advice: ${response.statusText}`);
    }
    const data = await response.json();
    return data.slip.advice;
  } catch (error) {
    console.error(error);
    return 'Failed to fetch advice.';
  }
}

async function fetchRandomDadJoke(): Promise<string> {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch dad joke');
  }
  
  const data: { joke: string } = await response.json();
  return data.joke;
}

async function fetchInspirationalQuote(): Promise<string> {
  const response = await fetch('https://type.fit/api/quotes');
  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }
  const quotes: { text: string; author: string | null }[] = await response.json();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  return quote.text + (quote.author ? ` - ${quote.author}` : '');
}

import fetch from 'node-fetch';

async function getLatestNewsHeadlines(apiKey: string, country: string = 'us'): Promise<string[]> {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.articles.map((article: { title: string }) => article.title);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}

// Example usage:
// const apiKey = 'your_news_api_key';
// getLatestNewsHeadlines(apiKey).then(headlines => console.log(headlines));

async function fetchRandomChuckNorrisJoke(): Promise<string> {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  if (!response.ok) {
    throw new Error('Failed to fetch joke');
  }
  const data: { value: string } = await response.json();
  return data.value;
}

// Example usage:
fetchRandomChuckNorrisJoke().then(joke => console.log(joke)).catch(error => console.error(error));

async function fetchRandomActivity(): Promise<string> {
  const response = await fetch('https://www.boredapi.com/api/activity/');
  if (!response.ok) {
    throw new Error('Failed to fetch random activity');
  }
  const data = await response.json();
  return data.activity;
}

async function getRandomAstronomyPicture(): Promise<string> {
  const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch astronomy picture');
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error fetching astronomy picture:', error);
    throw error;
  }
}

import axios from 'axios';

async function fetchRandomRecipe(): Promise<{ title: string; ingredients: string[]; instructions: string }> {
  const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
  const meal = response.data.meals[0];
  return {
    title: meal.strMeal,
    ingredients: Object.keys(meal)
      .filter(key => key.startsWith('strIngredient') && meal[key])
      .map(key => meal[key]),
    instructions: meal.strInstructions
  };
}

async function fetchRandomAdviceTip(): Promise<string> {
  const response = await fetch('https://api.adviceslip.com/advice');
  if (!response.ok) {
    throw new Error('Failed to fetch advice');
  }
  const data = await response.json();
  return data.slip.advice;
}

async function retrieveRandomMealSuggestion(): Promise<string> {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  if (!response.ok) {
    throw new Error('Failed to fetch meal suggestion');
  }
  const data = await response.json();
  const meal = data.meals[0];
  return `Try cooking: ${meal.strMeal}, a delicious ${meal.strArea} dish. You can find the recipe here: ${meal.strSource}`;
}

async function getCountryInfo(countryName: string): Promise<{ name: string; capital: string; population: number; region: string; }> {
  const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
  const data = await response.json();
  if (data && data.length > 0) {
    const country = data[0];
    return {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'N/A',
      population: country.population,
      region: country.region
    };
  } else {
    throw new Error('Country not found');
  }
}

async function fetchRandomBeer(): Promise<{ name: string; description: string; abv: number }> {
  const response = await fetch('https://api.punkapi.com/v2/beers/random');
  const data = await response.json();
  if (Array.isArray(data) && data.length > 0) {
    const beer = data[0];
    return {
      name: beer.name,
      description: beer.description,
      abv: beer.abv
    };
  }
  throw new Error('Failed to fetch random beer');
}

async function getExchangeRate(baseCurrency: string, targetCurrency: string): Promise<number> {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    if (!response.ok) {
        throw new Error('Failed to fetch exchange rate data');
    }
    const data = await response.json();
    const rate = data.rates[targetCurrency];
    if (!rate) {
        throw new Error(`Exchange rate not available for ${targetCurrency}`);
    }
    return rate;
}

async function getRandomDadJoke(): Promise<string> {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch dad joke');
    }
    const data: { joke: string } = await response.json();
    return data.joke;
  } catch (error) {
    return 'Could not fetch a dad joke at this time.';
  }
}

import axios from 'axios';

async function fetchRandomAdviceSnippets(): Promise<string[]> {
  try {
    const response = await axios.get('https://api.adviceslip.com/advice');
    const advice = response.data.slip.advice;
    return advice.split('. ').map(snippet => snippet.trim()).filter(snippet => snippet.length > 0);
  } catch (error) {
    console.error('Error fetching advice:', error);
    throw new Error('Could not fetch advice.');
  }
}

class CryptoInfoFetcher {
  async fetchCryptoInfo(cryptoSymbol: string): Promise<{ name: string; price: number; marketCap: number }> {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        vs_currency: 'usd',
        ids: cryptoSymbol
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch crypto information');
    }

    const data = await response.json();
    if (data.length === 0) {
      throw new Error('Crypto symbol not found');
    }

    const crypto = data[0];
    return {
      name: crypto.name,
      price: crypto.current_price,
      marketCap: crypto.market_cap
    };
  }
}

async function getRandomSpaceFact(): Promise<string> {
  try {
    const response = await fetch("https://api.spacexdata.com/v4/launches/latest");
    if (!response.ok) {
      throw new Error("Failed to fetch space data");
    }
    const data = await response.json();
    const fact = `The latest SpaceX launch was: ${data.name}, which happened on ${new Date(data.date_utc).toLocaleDateString()}.`;
    return fact;
  } catch (error) {
    console.error(error);
    return "Could not retrieve space fact at this time.";
  }
}

async function fetchRandomStarWarsCharacter(): Promise<string> {
    const response = await fetch('https://swapi.dev/api/people/');
    if (!response.ok) {
        throw new Error('Failed to fetch Star Wars characters.');
    }
    const data = await response.json();
    const characters = data.results.map((character: { name: string }) => character.name);
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

async function fetchRandomJokeAndFact(): Promise<{ joke: string; fact: string }> {
  const jokeResponse = await fetch('https://official-joke-api.appspot.com/random_joke');
  const jokeData = await jokeResponse.json();
  const joke = `${jokeData.setup} - ${jokeData.punchline}`;

  const factResponse = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const factData = await factResponse.json();
  const fact = factData.text;

  return { joke, fact };
}

async function getRandomNasaImage(): Promise<string> {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    if (!response.ok) {
        throw new Error('Failed to fetch NASA image');
    }
    const data: { url: string } = await response.json();
    return data.url;
}

async function fetchRandomArtPiece(): Promise<{ title: string; artist: string; imageUrl: string }> {
  const response = await fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=1&fields=id,title,artist_title,image_id');
  const data = await response.json();
  if (data.data && data.data.length > 0) {
    const art = data.data[0];
    return {
      title: art.title,
      artist: art.artist_title,
      imageUrl: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
    };
  } else {
    throw new Error('No art pieces found');
  }
}

async function retrieveRandomScienceFact(): Promise<string> {
    try {
        const response = await fetch('https://random-science-facts-api.herokuapp.com/facts/random');
        if (!response.ok) {
            throw new Error('Failed to fetch a science fact');
        }
        const data = await response.json();
        return data.fact;
    } catch (error) {
        console.error('Error fetching science fact:', error);
        return 'Science fact could not be retrieved at this time.';
    }
}

async function retrieveRandomHistoricalEvent(): Promise<string> {
    const response = await fetch('https://api.api-ninjas.com/v1/facts?limit=1', {
        headers: {
            'X-Api-Key': 'YOUR_API_KEY'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch historical event');
    }
    const data: { fact: string }[] = await response.json();
    return data[0].fact;
}

// Example of usage
retrieveRandomHistoricalEvent()
    .then(event => console.log(event))
    .catch(error => console.error(error));

class BookFinder {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchBookByTitle(title: string): Promise<any> {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${this.apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data.items || [];
  }
}

const bookFinder = new BookFinder('your-google-books-api-key');
bookFinder.searchBookByTitle('TypeScript Basics')
  .then(books => console.log(books))
  .catch(error => console.error(error));

async function retrieveRandomCocktail(): Promise<string> {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  if (!response.ok) {
    throw new Error('Failed to fetch a random cocktail');
  }
  const data = await response.json();
  const cocktail = data.drinks[0];
  return `Cocktail Name: ${cocktail.strDrink}\nIngredients: ${cocktail.strIngredient1}, ${cocktail.strIngredient2}, ${cocktail.strIngredient3}\nInstructions: ${cocktail.strInstructions}`;
}

async function getRandomTriviaFact(): Promise<string> {
  const response = await fetch('https://opentdb.com/api.php?amount=1&type=boolean');
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].question;
  }
  throw new Error('Failed to fetch trivia fact');
}

async function fetchRandomQuoteFromAPI(): Promise<string> {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data: { content: string } = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
}

async function fetchRandomWord(): Promise<string> {
  const response = await fetch('https://random-word-api.herokuapp.com/word');
  if (!response.ok) {
    throw new Error('Failed to fetch a random word');
  }
  const data: string[] = await response.json();
  return data[0];
}

async function fetchRandomMusicAlbum(): Promise<{ artist: string, album: string, year: number }> {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const albums = await response.json();
    const randomIndex = Math.floor(Math.random() * albums.length);
    const randomAlbum = albums[randomIndex];

    return {
        artist: randomAlbum.userId.toString(),
        album: randomAlbum.title,
        year: new Date().getFullYear() // Placeholder year since the API doesn't provide release years
    };
}

async function fetchRandomAstroFact(): Promise<string> {
  try {
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.bodies.length);
    const randomBody = data.bodies[randomIndex];
    return `Did you know? ${randomBody.englishName} has a gravity of ${randomBody.gravity} m/s².`;
  } catch (error) {
    throw new Error(`Failed to fetch astro fact: ${error.message}`);
  }
}

async function retrieveRandomBookQuote(): Promise<string> {
  const response = await fetch('https://api.quotable.io/random?tags=books');
  if (!response.ok) {
    throw new Error('Failed to fetch a book quote');
  }
  const data: { content: string; author: string } = await response.json();
  return `${data.content} — ${data.author}`;
}

async function getRandomFamousQuote(): Promise<string> {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
        throw new Error('Failed to fetch a quote');
    }
    const data = await response.json();
    return `${data.content} — ${data.author}`;
}

async function getRandomPlantFact(): Promise<string> {
    const response = await fetch('https://plant-facts-api.herokuapp.com/api/v1/plants/random');
    if (!response.ok) {
        throw new Error('Failed to fetch plant fact');
    }
    const data: { fact: string } = await response.json();
    return data.fact;
}

async function fetchRandomMovieTitle(): Promise<string> {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY');
  if (!response.ok) {
    throw new Error('Failed to fetch movie data');
  }
  const data = await response.json();
  const movies = data.results;
  if (movies.length === 0) {
    throw new Error('No movies found');
  }
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex].title;
}

async function fetchRandomArtGallery(): Promise<{ title: string; artist: string; year: string; imageUrl: string }> {
    const response = await fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=1');
    const data = await response.json();
    if (data.data && data.data.length > 0) {
        const artwork = data.data[0];
        return {
            title: artwork.title,
            artist: artwork.artist_display,
            year: artwork.date_display,
            imageUrl: artwork.image_url
        };
    }
    throw new Error('No artwork found');
}

async function fetchRandomNatureImage(): Promise<string> {
    const response = await fetch('https://api.unsplash.com/photos/random?query=nature&client_id=YOUR_ACCESS_KEY');
    if (!response.ok) {
        throw new Error('Failed to fetch random nature image');
    }
    const data = await response.json();
    return data.urls.regular;
}

async function getRandomInspirationImage(): Promise<string> {
  const response = await fetch('https://inspirobot.me/api?generate=true');
  if (!response.ok) {
    throw new Error('Failed to fetch an inspirational image');
  }
  return await response.text();
}

async function fetchRandomPuzzle(): Promise<string> {
  const response = await fetch('https://api.puzzle.com/random');
  if (!response.ok) {
    throw new Error('Failed to fetch a random puzzle');
  }
  const data = await response.json();
  return data.puzzle;
}

import fetch from 'node-fetch';

async function fetchRandomArtMovement(): Promise<string> {
  try {
    const response = await fetch('https://www.artic.edu/api/v1/artworks?limit=1&fields=art_movement_title');
    if (!response.ok) {
      throw new Error('Failed to fetch art movement');
    }
    const data = await response.json();
    const artMovement = data.data[0]?.art_movement_title;
    if (artMovement) {
      return artMovement;
    } else {
      throw new Error('No art movement found');
    }
  } catch (error) {
    console.error('Error fetching art movement:', error);
    throw error;
  }
}

// Usage
fetchRandomArtMovement().then(console.log).catch(console.error);

async function retrieveRandomQuoteFromTVShow(): Promise<string> {
    const response = await fetch('https://api.tvmaze.com/quotes/random');
    if (!response.ok) {
        throw new Error('Failed to fetch a random TV show quote');
    }
    const data: { quote: string } = await response.json();
    return data.quote;
}

async function fetchRandomFilmTrivia(): Promise<string> {
  const response = await fetch('https://api.themoviedb.org/3/movie/random?api_key=YOUR_API_KEY');
  if (!response.ok) {
    throw new Error('Failed to fetch film trivia');
  }
  const data = await response.json();
  const trivia = data.overview;
  return trivia || 'No trivia available for this film.';
}

// Example usage
fetchRandomFilmTrivia()
  .then(trivia => console.log(trivia))
  .catch(error => console.error(error));

async function fetchRandomArtMuseum(): Promise<string> {
  const response = await fetch('https://api.artic.edu/api/v1/museums');
  if (!response.ok) {
    throw new Error('Failed to fetch art museum data');
  }
  const data = await response.json();
  if (data.data.length === 0) {
    throw new Error('No museums found');
  }
  const randomIndex = Math.floor(Math.random() * data.data.length);
  return data.data[randomIndex].name;
}

async function fetchMarsRoverPhotos(roverName: string, sol: number): Promise<string[]> {
    const apiKey = 'DEMO_KEY'; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the NASA API');
        }
        const data = await response.json();
        return data.photos.map((photo: { img_src: string }) => photo.img_src);
    } catch (error) {
        console.error('Error fetching Mars Rover photos:', error);
        return [];
    }
}

async function fetchRandomArtQuote(): Promise<string> {
    const response = await fetch('https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=1');
    const data = await response.json();
    const artwork = data.data[0];
    return artwork ? artwork.thumbnail.alt_text : 'No quote available at this time.';
}

async function fetchRandomAnimalFact(): Promise<string> {
    try {
        const response = await fetch('https://some-random-api.ml/facts/animal');
        if (!response.ok) {
            throw new Error('Failed to fetch animal fact');
        }
        const data = await response.json();
        return data.fact;
    } catch (error) {
        console.error(error);
        return 'An error occurred while fetching an animal fact.';
    }
}

async function fetchRandomPokemonDetails(): Promise<{ name: string; abilities: string[]; }> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 100) + 1);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokémon details');
    }
    const data = await response.json();
    return {
        name: data.name,
        abilities: data.abilities.map((ability: { ability: { name: string; }; }) => ability.ability.name)
    };
}

async function fetchRandomArtGalleryInfo(): Promise<{ title: string; location: string; established: number }> {
    const response = await fetch('https://api.example.com/randomArtGallery');
    if (!response.ok) {
        throw new Error('Failed to fetch art gallery information');
    }
    const data = await response.json();
    return {
        title: data.title,
        location: data.location,
        established: data.established,
    };
}

async function fetchRandomSpaceImage(): Promise<string> {
  const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
  if (!response.ok) {
    throw new Error('Failed to fetch space image');
  }
  const data = await response.json();
  return data.url;
}

import fetch from 'node-fetch';

async function getRandomComic(): Promise<{ title: string; img: string; alt: string }> {
    const response = await fetch('https://xkcd.com/info.0.json');
    if (!response.ok) {
        throw new Error('Failed to fetch comic');
    }
    const data: { title: string; img: string; alt: string } = await response.json();
    return data;
}

getRandomComic().then(comic => {
    console.log(`Title: ${comic.title}`);
    console.log(`Image URL: ${comic.img}`);
    console.log(`Alt Text: ${comic.alt}`);
}).catch(error => {
    console.error(error);
});

async function fetchRandomMythicalCreature(): Promise<string> {
    try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const creatures = ["Dragon", "Unicorn", "Phoenix", "Griffin", "Mermaid", "Minotaur", "Cyclops", "Pegasus"];
        const randomIndex = Math.floor(Math.random() * creatures.length);
        return `Random Mythical Creature: ${creatures[randomIndex]}`;
    } catch (error) {
        console.error('Error fetching mythical creature:', error);
        throw error;
    }
}

async function getRandomArtMovementInfo(): Promise<{ name: string; description: string; }> {
    const response = await fetch('https://api.artic.edu/api/v1/art-movements?limit=1&fields=id,title,description');
    const data = await response.json();
    if (data.data.length > 0) {
        const movement = data.data[0];
        return {
            name: movement.title,
            description: movement.description || 'No description available.'
        };
    }
    throw new Error('No art movement data available.');
}

getRandomArtMovementInfo().then(info => console.log(info)).catch(error => console.error(error));

async function fetchRandomLiteraryQuote(): Promise<string> {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=literature');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return `${data.content} — ${data.author}`;
  } catch (error) {
    console.error('Error fetching random literary quote:', error);
    return 'An error occurred while fetching a quote.';
  }
}

async function fetchRandomFuturisticGadget(): Promise<string> {
  const response = await fetch('https://futuristic-gadgets-api.example.com/random');
  if (!response.ok) {
    throw new Error('Failed to fetch futuristic gadget');
  }
  const gadgetData = await response.json();
  return gadgetData.name;
}

import fetch from 'node-fetch';

async function fetchRandomHistoricalFigure(): Promise<string> {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const name = `${data.results[0].name.first} ${data.results[0].name.last}`;
    return name;
}

async function fetchRandomCountryFact(): Promise<string> {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    return `Did you know? The country ${randomCountry.name.common} has a population of approximately ${randomCountry.population.toLocaleString()} people and its capital is ${randomCountry.capital ? randomCountry.capital[0] : 'unknown'}.`;
}

async function fetchRandomSuperhero(): Promise<{ name: string; power: string; universe: string }> {
    const response = await fetch('https://superheroapi.com/api/1234567890/random');
    const data = await response.json();
    return {
        name: data.name,
        power: data.powerstats.power,
        universe: data.biography.publisher
    };
}

async function fetchRandomCocktailDetails(): Promise<{ name: string; instructions: string; ingredients: string[] } | null> {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    if (!response.ok) {
      throw new Error('Failed to fetch cocktail details');
    }
    const data = await response.json();
    if (!data.drinks || data.drinks.length === 0) {
      return null;
    }

    const drink = data.drinks[0];
    const ingredients: string[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}` as keyof typeof drink];
      const measure = drink[`strMeasure${i}` as keyof typeof drink];
      if (ingredient) {
        ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
      }
    }

async function fetchRandomBirdFact(): Promise<string> {
    const response = await fetch('https://some-random-api.ml/facts/bird');
    if (!response.ok) {
        throw new Error('Failed to fetch bird fact');
    }
    const data: { fact: string } = await response.json();
    return data.fact;
}

// Usage example
fetchRandomBirdFact().then(fact => console.log(fact)).catch(error => console.error(error));

async function fetchRandomPlanetInfo(): Promise<{ name: string; climate: string; terrain: string }> {
  const response = await fetch('https://swapi.dev/api/planets/');
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  const planet = data.results[randomIndex];
  return { name: planet.name, climate: planet.climate, terrain: planet.terrain };
}

async function fetchRandomArtGalleryExhibit(): Promise<string> {
    const response = await fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=1&fields=id,title');
    if (!response.ok) {
        throw new Error('Failed to fetch art gallery exhibit');
    }
    const data = await response.json();
    const exhibit = data.data[0];
    return `Exhibit Title: ${exhibit.title}`;
}

async function fetchRandomScienceArticle(): Promise<string> {
  try {
    const response = await fetch('https://api.example.com/random-science-article');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: { title: string, url: string } = await response.json();
    return `Title: ${data.title}, URL: ${data.url}`;
  } catch (error) {
    return `Error fetching article: ${error.message}`;
  }
}

async function fetchRandomAnimalImage(): Promise<string> {
  const response = await fetch('https://some-random-api.ml/img/dog');
  if (!response.ok) {
    throw new Error('Failed to fetch animal image');
  }
  const data: { link: string } = await response.json();
  return data.link;
}

import axios from 'axios';

async function fetchRandomLandmarkInfo(): Promise<string> {
  const response = await axios.get('https://api.example.com/random-landmark');
  if (response.data && response.data.name && response.data.location) {
    return `Landmark: ${response.data.name}, Location: ${response.data.location}`;
  }
  throw new Error('Failed to fetch landmark information');
}

fetchRandomLandmarkInfo().then(console.log).catch(console.error);

async function fetchRandomInsectFact(): Promise<string> {
  try {
    const response = await fetch('https://random-insect-facts-api.com/fact');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: { fact: string } = await response.json();
    return data.fact;
  } catch (error) {
    console.error('Error fetching insect fact:', error);
    return 'Could not fetch an insect fact at this time.';
  }
}

async function fetchRandomBotanicalGarden(): Promise<string> {
    try {
        const response = await fetch('https://api.example.com/random-botanical-garden');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: { name: string; location: string; description: string } = await response.json();
        return `Visit the ${data.name} located in ${data.location}. Here's a brief description: ${data.description}`;
    } catch (error) {
        console.error('Failed to fetch botanical garden:', error);
        return 'Failed to retrieve information about a random botanical garden.';
    }
}

async function fetchRandomUnderwaterCreatureFact(): Promise<string> {
    const response = await fetch('https://api.example.com/randomUnderwaterCreatureFact');
    if (!response.ok) {
        throw new Error('Failed to fetch underwater creature fact');
    }
    const data: { fact: string } = await response.json();
    return data.fact;
}

async function fetchRandomParkInfo(): Promise<string> {
    const response = await fetch('https://developer.nps.gov/api/v1/parks?limit=1&api_key=YOUR_API_KEY');
    if (!response.ok) {
        throw new Error('Failed to fetch park information');
    }
    const data = await response.json();
    const park = data.data[0];
    return `Park Name: ${park.fullName}\nDescription: ${park.description}\nLocation: ${park.states}`;
}

async function fetchRandomArtisticMedium(): Promise<string> {
    try {
        const response = await fetch('https://api.artic.edu/api/v1/artworks?fields=artwork_type_title');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const artworks = data.data;
        const uniqueMediums = new Set<string>();
        artworks.forEach((artwork: { artwork_type_title: string }) => {
            uniqueMediums.add(artwork.artwork_type_title);
        });
        const mediumsArray = Array.from(uniqueMediums);
        const randomIndex = Math.floor(Math.random() * mediumsArray.length);
        return mediumsArray[randomIndex];
    } catch (error) {
        console.error(error);
        return 'Unknown Medium';
    }
}

function fetchRandomMathFact(): Promise<string> {
  return fetch('http://numbersapi.com/random/math')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => data)
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      return 'Error fetching math fact.';
    });
}

async function fetchRandomArtTool(): Promise<string> {
  const response = await fetch('https://www.artic.edu/api/v1/tools');
  if (!response.ok) {
    throw new Error('Failed to fetch art tool data');
  }
  const data = await response.json();
  const tools = data.data;
  if (!tools || tools.length === 0) {
    throw new Error('No art tools found');
  }
  const randomTool = tools[Math.floor(Math.random() * tools.length)];
  return randomTool.title;
}

async function fetchRandomQuoteOfTheDay(): Promise<string> {
  try {
    const response = await fetch('https://quotes.rest/qod');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data: { contents: { quotes: { quote: string }[] } } = await response.json();
    return data.contents.quotes[0].quote;
  } catch (error) {
    console.error('Error fetching the quote of the day:', error);
    return 'An error occurred while fetching the quote.';
  }
}

async function fetchRandomArtGalleryCollection(): Promise<string[]> {
  const response = await fetch('https://api.artic.edu/api/v1/artworks');
  if (!response.ok) {
    throw new Error('Failed to fetch art gallery collection');
  }
  
  const data = await response.json();
  return data.data.map((artwork: { title: string }) => artwork.title);
}

async function fetchRandomAstronautFact(): Promise<string> {
    try {
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const astronauts = data.bodies.filter((body: any) => body.isPlanet === false && body.englishName.includes('Astronaut'));
        if (astronauts.length === 0) {
            return 'No astronaut facts available.';
        }
        const randomIndex = Math.floor(Math.random() * astronauts.length);
        return `Did you know? ${astronauts[randomIndex].englishName}: ${astronauts[randomIndex].moons ? `has ${astronauts[randomIndex].moons.length} moons.` : 'has no moons.'}`;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function obtainRandomHaiku(): Promise<string> {
    const response = await fetch('https://api.goprogram.ai/inspiration');
    if (!response.ok) {
        throw new Error('Failed to fetch haiku');
    }
    const data = await response.json();
    return data.quote;
}

async function obtainAstronomyPictureOfTheDay(): Promise<{ title: string; explanation: string; url: string }> {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    if (!response.ok) {
        throw new Error('Failed to fetch the Astronomy Picture of the Day');
    }
    const data = await response.json();
    return {
        title: data.title,
        explanation: data.explanation,
        url: data.url
    };
}

async function obtainRandomFungiFact(): Promise<string> {
    const response = await fetch('https://fungi-facts-api.com/random');
    if (!response.ok) {
        throw new Error('Failed to fetch fungi fact');
    }
    const data: { fact: string } = await response.json();
    return data.fact;
}

async function fetchRandomFolkTale(): Promise<string> {
  const response = await fetch('https://api.folktaleapi.com/v1/folktale/random');
  if (!response.ok) {
    throw new Error('Failed to fetch random folktale');
  }
  const data = await response.json();
  return data.title;
}

async function obtainRandomBoardGameDetails(): Promise<{ name: string, description: string, yearPublished: number, minPlayers: number, maxPlayers: number }> {
    const response = await fetch('https://api.boardgameatlas.com/api/search?order_by=popularity&limit=1&client_id=YOUR_CLIENT_ID');
    const data = await response.json();
    if (data.games && data.games.length > 0) {
        const game = data.games[0];
        return {
            name: game.name,
            description: game.description_preview,
            yearPublished: game.year_published,
            minPlayers: game.min_players,
            maxPlayers: game.max_players
        };
    }
    throw new Error('No board games found');
}

async function obtainEpicGamesFreeGames(): Promise<any> {
    const response = await fetch('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions');
    if (!response.ok) {
        throw new Error('Failed to fetch free games from Epic Games');
    }
    const data = await response.json();
    return data.data.Catalog.searchStore.elements.map((game: any) => ({
        title: game.title,
        description: game.description,
        currentPrice: game.price.totalPrice.fmtPrice.originalPrice,
        promotionalOffers: game.promotions.promotionalOffers.length > 0 ? game.promotions.promotionalOffers : 'None',
        url: `https://www.epicgames.com/store/en-US/p/${game.productSlug}`
    }));
}

async function obtainRandomCityInfo(): Promise<{ name: string; country: string; population: number; timeZone: string }> {
    const response = await fetch('https://api.teleport.org/api/urban_areas/');
    const urbanAreasData = await response.json();
    const urbanAreas = urbanAreasData._links['ua:item'];

    const randomIndex = Math.floor(Math.random() * urbanAreas.length);
    const randomCityUrl = urbanAreas[randomIndex].href;
    const cityResponse = await fetch(`${randomCityUrl}details/`);
    const cityData = await cityResponse.json();

    const cityName = urbanAreas[randomIndex].name;
    const country = cityData.categories.find((cat: any) => cat.id === 'LOCATION').data.find((item: any) => item.id === 'country').string_value;
    const population = cityData.categories.find((cat: any) => cat.id === 'POPULATION').data.find((item

import axios from 'axios';

async function obtainRandomMarineSpeciesFact(): Promise<string> {
    try {
        const response = await axios.get('https://some-marine-api.com/random/species/fact');
        return response.data.fact;
    } catch (error) {
        throw new Error('Failed to fetch marine species fact');
    }
}

// Usage example
obtainRandomMarineSpeciesFact().then(fact => console.log(fact)).catch(console.error);

async function acquireRandomSpaceTrivia(): Promise<string> {
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
    if (!response.ok) {
        throw new Error('Failed to fetch space trivia');
    }

    const data = await response.json();
    const bodies = data.bodies;
    const randomIndex = Math.floor(Math.random() * bodies.length);
    const randomBody = bodies[randomIndex];

    return `Did you know? ${randomBody.englishName} is a celestial body with a mean radius of ${randomBody.meanRadius} km.`;
}

async function fetchRandomOceanFact(): Promise<string> {
  const response = await fetch('https://some-ocean-fact-api.com/random');
  if (!response.ok) {
    throw new Error('Failed to fetch ocean fact');
  }
  const data: { fact: string } = await response.json();
  return data.fact;
}

async function fetchRandomMythologyStory(): Promise<string> {
  const response = await fetch('https://api.mythologyapi.com/v1/stories/random');
  if (!response.ok) {
    throw new Error('Failed to fetch random mythology story');
  }
  const data = await response.json();
  return data.story || 'No story found';
}

async function fetchRandomMysteryNovel(): Promise<string> {
  const response = await fetch('https://api.example.com/random-mystery-novel');
  if (!response.ok) {
    throw new Error('Failed to fetch mystery novel');
  }
  const data = await response.json();
  return data.title;
}

async function obtainRandomPhilosophicalConcept(): Promise<string> {
    const response = await fetch('https://api.example.com/philosophical-concepts/random');
    if (!response.ok) {
        throw new Error('Failed to fetch a philosophical concept');
    }
    const data: { concept: string } = await response.json();
    return data.concept;
}

async function fetchRandomCryptocurrencyInfo(): Promise<{ name: string; price: number; symbol: string }> {
    try {
        const response = await fetch('https://api.coinlore.net/api/tickers/?start=0&limit=1');
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            const crypto = data.data[0];
            return {
                name: crypto.name,
                price: parseFloat(crypto.price_usd),
                symbol: crypto.symbol
            };
        } else {
            throw new Error('No cryptocurrency data available');
        }
    } catch (error) {
        throw new Error(`Failed to fetch cryptocurrency info: ${error.message}`);
    }
}

async function obtainRandomSpaceMissionDetail(): Promise<{ missionName: string; launchDate: string; details: string; }> {
    const response = await fetch('https://api.spacexdata.com/v4/launches/latest');
    if (!response.ok) {
        throw new Error('Failed to fetch the latest SpaceX mission details');
    }
    const data = await response.json();
    return {
        missionName: data.name,
        launchDate: data.date_utc,
        details: data.details || 'No details available'
    };
}

async function fetchRandomCatBreedInfo(): Promise<{ name: string; description: string; temperament: string; origin: string }> {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  if (!response.ok) {
    throw new Error('Failed to fetch cat breed information');
  }
  const breeds = await response.json();
  const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
  return {
    name: randomBreed.name,
    description: randomBreed.description,
    temperament: randomBreed.temperament,
    origin: randomBreed.origin
  };
}

async function getRandomBotanicalFact(): Promise<string> {
  const response = await fetch('https://random-botanical-fact-api.com/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch random botanical fact');
  }
  const data: { fact: string } = await response.json();
  return data.fact;
}

async function fetchRandomArtTechnique(): Promise<string> {
    const response = await fetch('https://api.artic.edu/api/v1/techniques?page=1&limit=10');
    if (!response.ok) {
        throw new Error('Failed to fetch art techniques');
    }
    const data = await response.json();
    const techniques = data.data.map((technique: { title: string }) => technique.title);
    return techniques[Math.floor(Math.random() * techniques.length)];
}

async function obtainRandomChessOpening(): Promise<{ name: string; moves: string }> {
    const response = await fetch("https://api.chessdb.net/query?op=random");
    if (!response.ok) {
        throw new Error("Failed to fetch random chess opening");
    }
    const data = await response.json();
    return {
        name: data.name,
        moves: data.moves
    };
}
