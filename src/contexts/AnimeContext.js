import React, { createContext, useReducer } from "react";
import animeReducer from "../customHooks/animeReducer";
import authReducer from "../customHooks/authReducer";
import currentAnimeReducer from "../customHooks/currentAnimeReducer";
import searchReducer from "../customHooks/searchReducer";
import supabase from "../supabase";

export const AnimeContext = createContext();

function AnimeContextProvider(props) {
  const [animes, dispatch] = useReducer(animeReducer, []);
  const [currentAnimes, currentAnimeDispatch] = useReducer(
    currentAnimeReducer,
    []
  );

  async function loadWatchlist() {
    const user = supabase.auth.user();
    let { data, error } = await supabase
      .from("watchlist")
      .select()
      .eq("email", user.email);

    data = data[0].watchlist;

    dispatch({ type: "LOAD_DATABASE_ANIMES", animes: data });
  }

  function syncWatchlist() {
    let items = localStorage.getItem("list");
    if (items) {
      const parsedItems = JSON.parse(items);
      items = parsedItems;
    } else {
      items = [];
    }
    setWatchlist(items);
  }

  async function setWatchlist(items) {
    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from("watchlist")
      .upsert({ email: user.email, watchlist: items });
  }

  const [auth, authenticator] = useReducer(authReducer, {
    safeMode: true,
    loading: false,
    password: false,
    passwordToggle: false,
    selectedState: null,
  });
  const [search, searchAnimes] = useReducer(searchReducer, []);
  return (
    <AnimeContext.Provider
      value={{
        animes,
        dispatch,
        auth,
        authenticator,
        currentAnimes,
        currentAnimeDispatch,
        search,
        searchAnimes,
        setWatchlist,
        syncWatchlist,
        loadWatchlist,
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  );
}

export default AnimeContextProvider;
