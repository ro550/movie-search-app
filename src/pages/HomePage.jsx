import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSearch (term) {
    setSearchTerm(term);
    setMovies([]);
    setLoading(true);
    setError(null);

    try {
      // Send a request to the OMDb API to search for movies using the user's search term
      const response = await fetch (`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(term)}`);
      const data = await response.json();
      
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }

    } catch (err) {
        setError("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar onSearch={handleSearch} />
      
      {/*Show the loading spinner, error message or movie grid based on the current state*/}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
}
export default HomePage;