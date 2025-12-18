import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/omdb";
import { useState } from "react";

export default function MovieDetails() {
const { id } = useParams();
const [movie, setMovie] = useState(null);


React.useEffect(() => {
getMovieDetails(id).then(setMovie);
}, [id]);


if (!movie) return <p>Loading...</p>;


return (
<div className="flex flex-col md:flex-row gap-6">
<img src={movie.Poster} className="w-full md:w-64 rounded" />
<div>
<h1 className="text-2xl font-bold">{movie.Title}</h1>
<p>{movie.Plot}</p>
<p><b>Cast:</b> {movie.Actors}</p>
<p><b>Rating:</b> {movie.imdbRating}</p>
</div>
</div>
);
}