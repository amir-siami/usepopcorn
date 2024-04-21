function WatchedMovie({
  imdbID,
  poster,
  title,
  imdbRating,
  userRating,
  runtime,
  onDeleteWatched,
}) {
  return (
    <li key={imdbID}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDeleteWatched(imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
