
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { isFavorite, saveFavorite, removeFavorite } from '../utils/favorites';
import useFetch from "../hooks/useFetch";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetailsPage () {
    const {id} = useParams();
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;
    const {data: movie, loading, error} = useFetch(url);
    const [favorited, setFavorited] = useState(false);

    useEffect (() => {
        if (movie) {
            setFavorited(isFavorite(movie.imdbID));
        }
    }, [movie]);

    function handleFavoriteClick () {
        if (favorited) {
            removeFavorite(movie.imdbID);
        } else {
            saveFavorite(movie);
        }
     setFavorited(!favorited);   
    }

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!movie) return null;    

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