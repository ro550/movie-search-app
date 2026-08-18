
import MovieCard from './MovieCard';

function MovieGrid({ movies }) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;

