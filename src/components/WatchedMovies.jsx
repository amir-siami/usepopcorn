import WatchedMovie from "./WatchedMovie";

function WatchedMovies({ watched, onDeleteWatched }) {
  return (
    <>
      <ul className="list">
        {watched?.map((movie) => (
          <WatchedMovie
            imdbID={movie.imdbID}
            title={movie.title}
            poster={movie.poster}
            imdbRating={movie.imdbRating}
            userRating={movie.userRating}
            runtime={movie.runtime}
            key={movie.imdbID}
            onDeleteWatched={onDeleteWatched}
          />
        ))}
      </ul>
    </>
  );
}

export default WatchedMovies;
