import Input from "./Input";
import Cards from "./Cards";
import { useContext, useEffect } from "react";
import { AnimeContext } from "../contexts/AnimeContext";

function Watchlist() {
  const { dispatch, currentAnimeDispatch, searchAnimes } =
    useContext(AnimeContext);
  useEffect(() => {
    dispatch({ type: "LOAD_ANIMES" });
    currentAnimeDispatch({ type: "CLEAR" });
    searchAnimes({ type: "CLEAR" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Cards type="watchlist" />
    </>
  );
}

export default Watchlist;
