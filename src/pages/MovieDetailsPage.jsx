
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
        <div className="max-w-4xl mx-auto px-4 py-6">
            <Link to="/" className="inline-block mb-4 text-blue-600 hover:underline text-sm">Back to Search</Link>

            {movie.Poster !== "N/A" ? (
                <img src={movie.Poster} alt={movie.Title} className="w-full rounded-lg shadow-md lg:w-72 lg:shrink-0" />
            ) : (
                <div className="w-full h-80 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 lg:w-72 lg:shrink-0">No Poster Available</div>
            )}

            <h1 className="text-2xl font-bold sm:text-3xl">{movie.Title}</h1>
            <button onClick={handleFavoriteClick}>{favorited ? '♥ Favorited' : '♡ Add to Favorites'}</button>
            <div className="flex flex-wrap gap-2 mt-3 text-sm text-slate-600">
              <span>{movie.Year}</span>
              <span>•</span>
              <span>{movie.Rated}</span>
              <span>•</span>
              <span>{movie.Runtime}</span>
              <span>•</span>
              <span>{movie.Genre}</span>
            </div>

            <p className="mt-4 text-slate-700 leading-relaxed">{movie.Plot}</p>
            <div className="mt-4 space-y-1 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-800">Director: </span>{movie.Director}</p>
                <p><span className="font-semibold text-slate-800">Actors: </span>{movie.Actors}</p>
                <p><span className="font-semibold text-slate-800">IMDB Rating: </span>{movie.imdbRating}</p>
            </div>
        </div>
    );
}
export default MovieDetailsPage;