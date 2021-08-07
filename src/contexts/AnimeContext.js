import React, { createContext, useReducer } from "react";
import animeReducer from "../animeReducer";

export const AnimeContext = createContext();

function AnimeContextProvider(props) {
  const [animes, dispatch] = useReducer(animeReducer, []);
  return (
    <AnimeContext.Provider value={{ animes, dispatch }}>
      {props.children}
    </AnimeContext.Provider>
  );
}

export default AnimeContextProvider;
