import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { searchMovies } from "../api/omdb";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  async function fetchMovies(p = 1) {
    if (!query) return;
    try {
      setError(null);
      const data = await searchMovies(query, p, type);
      setMovies(data.Search || []);
      setTotal(Number(data.totalResults || 0));
    } catch (err) {
      setError(err.message);
      setMovies([]);
    }
  }

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header
        query={query}
        setQuery={setQuery}
        type={type}
        setType={setType}
        onSearch={() => {
          setPage(1);
          fetchMovies(1);
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>

        {total > 10 && (
          <Pagination page={page} total={total} onChange={setPage} />
        )}
      </main>

      <Footer />
    </div>
  );
}
