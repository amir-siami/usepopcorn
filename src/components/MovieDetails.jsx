import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "../hooks/useKey";

function MovieDetails({
  selectedId,
  onCloseMovie,
  KEY,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  function handleNewRating(rating) {
    setUserRating(rating);
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found 🤔");

          setMovie(data);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [KEY, selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <ErrorMessage message={error} />
          ) : (
            <>
              <header>
                <button className="btn-back" onClick={onCloseMovie}>
                  ⬅
                </button>
                <img src={poster} alt={`Poster of ${movie} movie`} />
                <div className="details-overview">
                  <h2>{title}</h2>
                  <p>
                    {released} &bull; {runtime}
                  </p>
                  <p>{genre}</p>
                  <p>
                    <span>⭐</span>
                    {imdbRating} IMDb rating
                  </p>
                </div>
              </header>
              <section>
                <div className="rating">
                  {!isWatched ? (
                    <>
                      <StarRating
                        maxRating={10}
                        size={24}
                        onSetRating={handleNewRating}
                      />
                      {userRating > 0 && (
                        <button className="btn-add" onClick={handleAdd}>
                          + Add to list
                        </button>
                      )}
                    </>
                  ) : (
                    <p>
                      You rated this movie {watchedUserRating} <span>⭐</span>
                    </p>
                  )}
                </div>
                <p>
                  <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MovieDetails;
