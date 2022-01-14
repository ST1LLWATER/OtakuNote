import { useState, useRef, useEffect, useContext } from "react";
import { AnimeContext } from "../contexts/AnimeContext";
import CurrentCalendarCard from "./CurrentCalendarCard";
import Modal from "./Modal";

function Search() {
  const [name, setName] = useState("");
  const [animeName, setAnimeName] = useState("");
  const firstUpdate = useRef(true);
  const { searchAnimes, auth, search, authenticator, currentAnimeDispatch } =
    useContext(AnimeContext);

  function showModal(id, val = false) {
    let aid = id;
    let newSelectedState = search.find((x) => x.aid === aid);
    authenticator({ type: "SET_SELECTED_STATE", payload: newSelectedState });
  }

  function hideModal() {
    document.body.style.overflow = "auto";
    authenticator({ type: "NULLIFER" });
  }

  //FETCHING DATA FROM API AND SENDING TO REDUCER TO ADD IT TO ANIMES STATE OF REDUCER
  function DataFetcher(searchName) {
    // console.log(searchName, typeof searchName);
    const query = `query ($page: Int = 1) {
        Page(page: $page, perPage: 50) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          media(type: ANIME, search:"${searchName}", sort:POPULARITY_DESC) {
            id
            title {
              english
              romaji
            }
            coverImage {
              extraLarge
              large
            }
            startDate {
              year
              month
              day
            }
            status
            description
            episodes
            genres
            bannerImage
            isAdult
            averageScore
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
          }
        }
      }`;

    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors || !data.data.Page.media.length) {
          alert("ANIME NAME NOT FOUND... BE MORE SPECIFIC");
        } else {
          console.log(data);
          let apiData = data.data.Page.media;
          apiData.map((item) => {
            if (auth.safeMode && item.isAdult) {
              return;
            } else {
              searchAnimes({
                type: "SEARCH_ANIME",
                anime: {
                  name: item.title.english
                    ? item.title.english
                    : item.title.romaji,
                  url: item.coverImage.extraLarge,
                  genre: item.genres,
                  description: item.description,
                  rating: item.averageScore,
                  episodes: item.episodes,
                  date: item.startDate,
                  banner: item.bannerImage,
                  nextEpisode: item.nextAiringEpisode,
                  aid: item.id,
                },
              });
            }
            return null;
          });
        }
      });
  }
  //Taking input from form and adding the requested name to animeName state and clearing the form input
  function handleSubmit(e) {
    e.preventDefault();
    setAnimeName(name);
    setName("");
  }

  useEffect(() => {
    currentAnimeDispatch({ type: "CLEAR" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //LOADING ANIMES FROM LOCAL STORAGE AND IF WE GOT NEW ANIME REQ FROM INPUT i.e. animeName state changed above SEND THAT ANIME REQ TO API
  useEffect(() => {
    if (animeName) {
      searchAnimes({ type: "CLEAR" });
      //If to prevent sending an empty req to API as use effect runs when DOM loads too and animeName is "" i.e false at beginning
      DataFetcher(animeName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeName]); // <---- NOTICE THE DEPENDENCY ARRAY OF animeName which runs it everytime user enters a new anime req.

  useEffect(() => {
    if (firstUpdate.current) {
      console.log("Remember The Stillwinter");
      //If to prevent the useeffect to run the main code on firstupdate i.e when DOM LOADS
      firstUpdate.current = false;
      return;
    } else {
      //Main code to add loading and change the safe mode button
      if (auth.password) {
        Loading().then(() => {
          authenticator({ type: "TOGGLE_SAFE_MODE" });
          authenticator({ type: "TOGGLE_LOADING" });
        });
      } else {
        Loading().then(() => {
          alert("WRONG PASSWORD!");
          authenticator({ type: "TOGGLE_LOADING" });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.passwordToggle]);

  //Loading promise for loading animation of 1s
  const Loading = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const LoadingAuth = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <div className="my-8">
      <form
        id="input_form"
        className="mx-8 mt-4 flex flex-col justify-center items-center space-x-4 xl:flex-row lg:flex-row md:flex-row sm:flex-col "
        onSubmit={handleSubmit}
      >
        <input
          id="name"
          className="w-full sm:w-full xl:w-3/4 lg:w-3/4 md:w-3/4 mt-4 bg-gray-600 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          type="text"
          value={name}
          placeholder="Search Anime"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="buttons flex justify-center items-center space-x-4 mt-4">
          <button
            type="submit"
            className="px-4 py-2 rounded hover:bg-white hover:text-blue-700 bg-blue-700 text-white"
          >
            SEARCH
          </button>
          <button
            className={
              "px-4 py-2 rounded text-white whitespace-nowrap " +
              (auth.loading
                ? "bg-yellow-300 text-gray-900"
                : auth.safeMode
                ? "bg-green-700 "
                : "bg-red-700 ")
            }
            type="button"
            onClick={() => {
              //This IF prevents asking for password when coming back from SAFE MODE OFF to ON
              if (auth.password) {
                authenticator({ type: "TOGGLE_LOADING" });
                authenticator({ type: "CHECK_PASSWORD", payload: "xD" }); //Unique Strategy To prevent loading of useEffect and set password to false again. Check Dependency of UseEffect line 118 authReducer for more info.
                Loading().then(() => {
                  authenticator({ type: "TOGGLE_SAFE_MODE" });
                  authenticator({ type: "TOGGLE_LOADING" });
                });
              } else {
                //If Safe Mode Is ON Ask Password To turn it off
                authenticator({ type: "TOGGLE_LOADING" });
                LoadingAuth().then(() => {
                  let password = prompt("ENTER PASSWORD");
                  if (password === null) {
                    authenticator({ type: "TOGGLE_LOADING" });
                    return;
                  } else if (password === "") {
                    authenticator({ type: "TOGGLE_LOADING" });
                    return;
                  } else {
                    authenticator({
                      type: "CHECK_PASSWORD",
                      payload: password,
                    });
                  }
                });
              }
            }}
          >
            {auth.loading //Button text rendering based on states
              ? "LOADING"
              : auth.safeMode
              ? "SAFE MODE:ON"
              : "SAFE MODE:OFF"}
          </button>
        </div>
      </form>
      <div className="cards grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-6 justify-items-center ">
        {search
          ? search.map((anime) => {
              return (
                <CurrentCalendarCard
                  name={anime.name}
                  key={anime.id}
                  aid={anime.aid}
                  genre={anime.genre}
                  rating={anime.rating}
                  episodes={anime.episodes}
                  url={anime.url}
                  description={anime.description}
                  date={anime.date}
                  banner={anime.banner}
                  nextEpisode={anime.nextEpisode}
                  showModalFunction={showModal}
                />
              );
            })
          : ""}
      </div>
      {auth.selectedState && (
        <Modal
          info={auth.selectedState}
          onClose={hideModal}
          onGoingCard={true}
        />
      )}
    </div>
  );
}

export default Search;
