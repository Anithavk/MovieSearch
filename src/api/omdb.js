const BASE_URL = "https://www.omdbapi.com/?i=tt3896198";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;


export async function searchMovies(query, page = 1, type = "") {
const url = `${BASE_URL}&apikey=${API_KEY}&s=${query}&page=${page}&type=${type}`;
const res = await fetch(url);
const data = await res.json();
if (data.Response === "False") throw new Error(data.Error);
return data;
}


export async function getMovieDetails(imdbID) {
const url = `${BASE_URL}&apikey=${API_KEY}&plot=full`;
const res = await fetch(url);
const data = await res.json();
if (data.Response === "False") throw new Error(data.Error);
return data;
}