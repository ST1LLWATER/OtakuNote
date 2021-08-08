import React, { createContext, useReducer } from "react";
import animeReducer from "../customHooks/animeReducer";
import authReducer from "../customHooks/authReducer";

export const AnimeContext = createContext();

function AnimeContextProvider(props) {
  const [animes, dispatch] = useReducer(animeReducer, []);
  const [auth, authenticator] = useReducer(authReducer, {
    safeMode: true,
    loading: false,
    password: false,
    passwordToggle: false,
  });
  return (
    <AnimeContext.Provider value={{ animes, dispatch, auth, authenticator }}>
      {props.children}
    </AnimeContext.Provider>
  );
}

export default AnimeContextProvider;
