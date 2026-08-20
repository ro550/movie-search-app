
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
    <Link to={`/movie/${movie.imdbID}`}>
      <div>
        {posterUrl ? (
          <img src={posterUrl} alt={movie.Title} />
        ) : (
          <div>No Poster Available</div>
        )}
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <p>{movie.Type}</p>
        <button onClick={handleFavoriteClick}> {favorited ? '♥' : '♡'} </button>  {/*button that adds or removes the movie from favorites*/}
      </div>
    </Link>
  );
}

export default MovieCard;