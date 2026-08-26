
import { Link } from "react-router-dom";
import { isFavorite, saveFavorite, removeFavorite } from "../utils/favorites";
import { useState } from "react";

// Displays a movie's poster, title, year and type
// Shows "No Poster Available" when the movie does not have a poster
function MovieCard({ movie }) {
  const [favorited, setFavorited] = useState(isFavorite(movie.imdbID));
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : null;

  function handleFavoriteClick (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevents the click from reaching the parent Link

    if (favorited) {
      removeFavorite(movie.imdbID);
    } else {
      saveFavorite(movie);
    }
    setFavorited(!favorited);
  }

  return (
    <Link to={`/movie/${movie.imdbID}`} className="group block">
      <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow relative">
        {posterUrl ? (
          <img src={posterUrl} alt={movie.Title} className="w-full h-64 object-cover sm:h-72" />
        ) : (
          <div className="w-full h-64 bg-slate-200 flex items-center justify-center text-slate-500 text-sm text-center px-2 sm:h-72">No Poster Available</div>
        )}
        <div className="p-3">
          <h3 className="font-semibold text-sm truncate sm:text-base">{movie.Title}</h3>
          <div className="flex justify-between items-center mt-1 text-xs text-slate-500 sm:text-sm">
            <span>{movie.Year}</span>
            <span className="capitalize bg-slate-100 rounded px-2 py-0.5">{movie.Type}</span>
          </div>
          <button onClick={handleFavoriteClick}> {favorited ? '♥' : '♡'} </button>  {/*button that adds or removes the movie from favorites*/}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;