
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { isFavorite, saveFavorite, removeFavorite } from '../utils/favorites';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetailsPage () {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorited, setFavorited] = useState(false);

    useEffect (() => {
        async function fetchMovie() {
            setLoading(true);
            setError(null);
            setMovie(null);

            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
                const data = await response.json();

                if (data.Response === "True") {
                    setMovie(data);
                    setFavorited(isFavorite(data.imdbID));
                } else {
                    setError(data.Error);
                }
            } catch (err) {
                setError("Something went wrong. Please check your internet connection and try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!movie) return null;

    function handleFavoriteClick () {
        if (favorited) {
            removeFavorite(movie.imdbID);
        } else {
            saveFavorite(movie);
        }
     setFavorited(!favorited);   
    }

    return (
        <div>
            <Link to="/">Back to Search</Link>

            {movie.Poster !== "N/A" ? (
                <img src={movie.Poster} alt={movie.Title} />
            ) : (
                <div>No Poster Available</div>
            )}

            <h1>{movie.Title}</h1>
            <button onClick={handleFavoriteClick}>{favorited ? '♥ Favorited' : '♡ Add to Favorites'}</button>
            <p>{movie.Year}</p>
            <p>Rated: {movie.Rated}</p>
            <p>Runtime: {movie.Runtime}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Director: {movie.Director}</p>
            <p>Actors: {movie.Actors}</p>
            <p>{movie.Plot}</p>
            <p>IMDB Rating: {movie.imdbRating}</p>
        </div>
    );
}
export default MovieDetailsPage;