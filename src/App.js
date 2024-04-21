import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import SearchBox from "./components/SearchBox";
import ResultNums from "./components/ResultNums";
import { useMovies } from "./hooks/useMovies";

const KEY = "d51726b";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const { movies, isLoading, error } = useMovies(query);

  return (
    <>
      <NavBar>
        <Logo classes={"logo"} text={"usePopcorn"} img={"🍿"} role={"img"} />
        <SearchBox query={query} setQuery={setQuery} />
        <ResultNums classes={"num-results"}>
          Found <strong>{!movies ? "0" : movies.length}</strong> results
        </ResultNums>
      </NavBar>

      <Main
        movies={movies}
        isLoading={isLoading}
        error={error}
        KEY={KEY}
        handleCloseMovie={handleCloseMovie}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </>
  );
}
