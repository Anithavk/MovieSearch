import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toggleFavorite, getFavorites } from "../utils/favorites.js";

export default function MovieCard({ movie }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFav(favorites.some((f) => f.imdbID === movie.imdbID));
  }, [movie]);

  const handleFavorite = () => {
    toggleFavorite(movie);
    // Update local state after toggle
    const favorites = getFavorites();
    setIsFav(favorites.some((f) => f.imdbID === movie.imdbID));
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col">
      <Link to={`/movie/${movie.imdbID}`} className="flex-1">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
          alt={movie.Title}
          className="w-full h-72 sm:h-80 object-cover rounded-t-lg"
        />
        <div className="p-3 space-y-1">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
            {movie.Title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {movie.Year} • {movie.Type}
          </p>
        </div>
      </Link>

      <button
        onClick={handleFavorite}
        className={`m-3 py-2 rounded text-sm font-medium transition ${
          isFav ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {isFav ? "Remove Favorite" : "Add to Favorites"}
      </button>
    </div>
  );
}
