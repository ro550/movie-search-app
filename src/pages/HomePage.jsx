import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function buildSearchUrl(term) {
  return `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(term)}`;
}

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error, refetch } = useFetch(buildSearchUrl(searchTerm), true);
  const movies = data?.Search || [];

  function handleSearch(term) {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return; // Do not perform search if the term is empty

    setSearchTerm(trimmedTerm);
    refetch(buildSearchUrl(trimmedTerm));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <h1 className="text-2xl font-bold px-4 max-w-6xl mx-auto mb-4 sm:text-3xl">Home Page</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Show the loading spinner, error message, no-results message, or movie grid based on current state */}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && data && movies.length === 0 && (
        <p className="text-center text-slate-600 mt-8 px-4">
          No movies found for "{searchTerm}". Try a different title.
        </p>
      )}
      {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
}

export default HomePage;