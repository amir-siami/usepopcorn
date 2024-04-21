import WatchedMovies from "./WatchedMovies";
import MovieList from "./MovieList";
import Box from "./Box";
import Summary from "./Summary";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function Main({
  movies,
  isLoading,
  error,
  KEY,
  handleCloseMovie,
  selectedId,
  setSelectedId,
}) {
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <main className="main">
      <Box>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        )}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
            KEY={KEY}
            onAddWatched={handleAddWatched}
            watched={watched}
          />
        ) : (
          <>
            <Summary watched={watched} />
            <WatchedMovies
              watched={watched}
              onDeleteWatched={handleDeleteWatched}
            />
          </>
        )}
      </Box>
    </main>
  );
}

export default Main;
