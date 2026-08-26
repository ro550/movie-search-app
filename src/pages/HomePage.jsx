import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`;
  const {data, loading, error, refetch} = useFetch(url, true);
  const movies = data?.Search || [];

  async function handleSearch (term) {
    setSearchTerm(term);
    const searchUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(term)}`
    refetch(searchUrl);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <h1 className="text-2xl font-bold px-4 max-w-6xl mx-auto mb-4 sm:text-3xl">Home Page</h1>
      <SearchBar onSearch={handleSearch} />
      
      {/*Show the loading spinner, error message or movie grid based on the current state*/}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
}
export default HomePage;