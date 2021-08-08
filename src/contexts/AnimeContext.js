import React, { createContext, useReducer } from "react";
import animeReducer from "../customHooks/animeReducer";
import authReducer from "../customHooks/authReducer";
import currentAnimeReducer from "../customHooks/currentAnimeReducer";

export const AnimeContext = createContext();

function AnimeContextProvider(props) {
  const [animes, dispatch] = useReducer(animeReducer, []);
  const [currentAnimes, currentAnimeDispatch] = useReducer(
    currentAnimeReducer,
    []
  );
  const [auth, authenticator] = useReducer(authReducer, {
    safeMode: true,
    loading: false,
    password: false,
    passwordToggle: false,
  });
  return (
    <AnimeContext.Provider
      value={{
        animes,
        dispatch,
        auth,
        authenticator,
        currentAnimes,
        currentAnimeDispatch,
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  );
}

export default AnimeContextProvider;
