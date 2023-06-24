import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '99cd462612631601e1d34ef28e0a686c';

export async function getMovies(params, query) {
  return await axios.get(
    `${BASE_URL}${params}?api_key=${API_KEY}&${query}&language=en-US`
  );
}
