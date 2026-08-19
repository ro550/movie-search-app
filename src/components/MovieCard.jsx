
import { Link } from 'react-router-dom';

// Displays a movie's poster, title, year and type
// Shows "No Poster Available" when the movie does not have a poster
function MovieCard({ movie }) {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : null;

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
      </div>
    </Link>
  );
}

export default MovieCard;