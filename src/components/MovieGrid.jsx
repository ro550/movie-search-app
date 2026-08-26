
import MovieCard from './MovieCard';

function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto pb-8">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;

