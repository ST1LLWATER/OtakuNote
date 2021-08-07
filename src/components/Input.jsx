import { useState, useReducer, useEffect, useContext } from "react";
import { AnimeContext } from "../contexts/AnimeContext";

function Input() {
  // const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [animeName, setAnimeName] = useState("");
  const [data, setData] = useState("");
  const { dispatch } = useContext(AnimeContext);

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
        console.log("data returned:", data);
        if (data.errors) {
          alert("ANIME NAME NOT FOUND... BE MORE SPECIFIC");
        } else {
          setData(data);
          dispatch({
            type: "ADD_ANIME",
            anime: {
              name: data.data.Media.title.english
                ? data.data.Media.title.english
                : data.data.Media.title.romaji,
              url: data.data.Media.coverImage.extraLarge,
              genre: data.data.Media.genres,
              aid: data.data.Media.id,
              rating: data.data.Media.averageScore,
              episodes: data.data.Media.episodes,
              date: data.data.Media.startDate,
            },
          });
        }
      });
  }
  function DataLiveFetcher() {
    const query = `query($name: String, $status: MediaStatus) {
            Media((filter: {status: "RELEASED"})) {
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
        console.log("data returned live:", data);
        if (data.errors) {
          alert("ANIME NAME NOT FOUND... BE MORE SPECIFIC");
        }
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAnimeName(name);
    // DataLiveFetcher();
    // console.log(animeName);
    // DataFetcher(animeName);
    // dispatch({ type: "ADD_ANIME", anime: { name } });
    setName("");
    // setGenre("");
  }
  useEffect(() => {
    dispatch({ type: "LOAD_ANIMES" });
    if (animeName) {
      DataFetcher(animeName);
    }
  }, [animeName]);

  return (
    <>
      <form
        id="input_form"
        className="flex justify-center m-8"
        onSubmit={handleSubmit}
      >
        <input
          id="name"
          className="p-2 mr-4 w-full bg-gray-600 text-gray-100 focus:ring rounded ring-blue-700 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full"
          type="text"
          name="hidden"
          value={name}
          placeholder="Anime Name"
          autoComplete="false"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="px-4 py-2 mr-4 rounded hover:bg-white hover:text-blue-700 bg-blue-700 text-white"
        >
          INSERT
        </button>
      </form>
    </>
  );
}

export default Input;
