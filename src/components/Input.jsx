import { useState, useRef, useEffect, useContext } from "react";
import { AnimeContext } from "../contexts/AnimeContext";
import CurrentCalendar from "./CurrentCalendar";

function Input() {
  const [name, setName] = useState("");
  const [animeName, setAnimeName] = useState("");
  const firstUpdate = useRef(true);
  const { dispatch, auth, authenticator } = useContext(AnimeContext);
  //FETCHING DATA FROM API AND SENDING TO REDUCER TO ADD IT TO ANIMES STATE OF REDUCER
  function DataFetcher(name) {
    const query = `query($name: String, $status: MediaStatus) {         
      Media(search: $name, type: ANIME, status: $status) {
        id,
        title {
          english,
          romaji,
        },
        status,
        startDate {
          year,
          month,
          day
        },
        averageScore,
        type,
        genres,
        isAdult,
        episodes,
        nextAiringEpisode {
          id,
          airingAt,
          timeUntilAiring
        },
        bannerImage,
        coverImage {
          large,
          extraLarge
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
        variables: { name: name },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors || (auth.safeMode ? data.data.Media.isAdult : 0)) {
          alert("ANIME NAME NOT FOUND... BE MORE SPECIFIC");
        } else {
          dispatch({
            type: "ADD_ANIME",
            anime: {
              name: data.data.Media.title.english
                ? data.data.Media.title.english
                : data.data.Media.title.romaji,
              url: data.data.Media.coverImage.extraLarge,
              genre: data.data.Media.genres,
              // aid: data.data.Media.id,
              rating: data.data.Media.averageScore,
              episodes: data.data.Media.episodes,
              date: data.data.Media.startDate,
              id: Date.now(),
            },
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

  //LOADING ANIMES FROM LOCAL STORAGE AND IF WE GOT NEW ANIME REQ FROM INPUT i.e. animeName state changed above SEND THAT ANIME REQ TO API
  useEffect(() => {
    dispatch({ type: "LOAD_ANIMES" });
    if (animeName) {
      //If to prevent sending an empty req to API as use effect runs when DOM loads too and animeName is "" i.e false at beginning
      DataFetcher(animeName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeName]); // <---- NOTICE THE DEPENDENCY ARRAY OF animeName which runs it everytime user enters a new anime req.

  useEffect(() => {
    if (firstUpdate.current) {
      console.log('Pssst... Password is "stillwinter"');
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
    <>
      <form
        id="input_form"
        className="flex items-center justify-center flex-col mx-8 mt-8 xl:flex-row lg:flex-row md:flex-col sm:flex-col"
        onSubmit={handleSubmit}
      >
        <input
          id="name"
          className="p-2 mr-4 w-full bg-gray-600 text-gray-100 focus:ring rounded ring-blue-700 xl:w-1/2 lg:w-1/2 md:w-3/4 sm:w-full"
          type="text"
          name="hidden"
          value={name}
          placeholder="Anime Name"
          autoComplete="false"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="buttons flex justify-center items-center my-4">
          <button
            type="submit"
            className="px-4 py-2 mr-4 rounded hover:bg-white hover:text-blue-700 bg-blue-700 text-white"
          >
            INSERT
          </button>
          <button
            className={
              "px-4 py-2 mr-4 rounded text-white " +
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
    </>
  );
}

export default Input;
