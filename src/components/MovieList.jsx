import Movie from "./Movie";

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          imdbID={movie.imdbID}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
          key={movie.imdbID}
          onSelectMovie={() => onSelectMovie(movie.imdbID)}
        />
      ))}
    </ul>
  );
}

export default MovieList;
