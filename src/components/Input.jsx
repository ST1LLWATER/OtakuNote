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
          },
        });
      });
  }

  // useEffect(() => {
  //   dispatch({ type: "LOAD_ANIME" });
  // });

  function handleSubmit(e) {
    e.preventDefault();
    setAnimeName(name);
    // console.log(animeName);
    // DataFetcher(animeName);
    // dispatch({ type: "ADD_ANIME", anime: { name } });
    setName("");
    // setGenre("");
  }
  useEffect(() => {
    if (animeName) {
      DataFetcher(animeName);
      console.log(data);
    }
  }, [animeName]);

  return (
    <>
      <form id="input_form" onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Anime Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">INSERT</button>
      </form>
    </>
  );
}

export default Input;
