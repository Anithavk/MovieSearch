export function getFavorites() {
return JSON.parse(localStorage.getItem("favorites") || "[]");
}


export function toggleFavorite(movie) {
const favs = getFavorites();
const index = favs.findIndex((f) => f.imdbID === movie.imdbID);
if (index === -1) favs.push(movie);
else favs.splice(index, 1);
localStorage.setItem("favorites", JSON.stringify(favs));
}