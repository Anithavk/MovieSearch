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
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  async function fetchMovies(p = 1) {
    if (!query.trim()) return;

    // ❌ Prevent invalid episode search
    if (type === "episode") {
      setMovies([]);
      setTotal(0);
      setError("Please select a TV series to view episodes");
      return;
    }

    try {
      setError("");

      const data = await searchMovies(query, p, type);

      // ❌ OMDb failure handling
      if (data.Response === "False") {
        setMovies([]);
        setTotal(0);
        setError(data.Error);
        return;
      }

      setMovies(data.Search || []);
      const totalResults = Number(data.totalResults || 0);
      setTotal(totalResults);
      setTotalPages(Math.ceil(totalResults / 10));
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setMovies([]);
      setTotal(0);
    }
  }

  // Fetch when page changes (but only if page is valid)
  useEffect(() => {
    if (page <= totalPages) {
      fetchMovies(page);
    }
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

        {!error && movies.length === 0 && query && (
          <p className="text-gray-500 text-center mb-4">
            No results found
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>

    {type !== "episode" && totalPages > 1 && (
  <Pagination
    page={page}
    totalPages={totalPages}
    onChange={(p) => {
      if (p >= 1 && p <= totalPages) {
        setPage(p);
      }
    }}
  />
)}
      </main>

      <Footer />
    </div>
  );
}
