import { useContext, useEffect } from "react";
import { AnimeContext } from "../contexts/AnimeContext";
import Cards from "./Cards";

function CurrentCalendar() {
  const { currentAnimes, currentAnimeDispatch, auth } =
    useContext(AnimeContext);

  let date = new Date();

  let seasonObject = {
    WINTER: ["January", "February", "March"],
    SPRING: ["April", "May", "June"],
    SUMMER: ["July", "August", "September"],
    FALL: ["October", "November", "December"],
  };

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function CurrentDataFetcher() {
    let seasonKey;
    let month = months[date.getMonth()];
    let currentYear = date.getFullYear();
    getSeason(month);

    function getSeason(month) {
      Object.keys(seasonObject).find((key) => {
        if (seasonObject[key].includes(`${month}`)) {
          seasonKey = key;
        }
      });
    }

    const query = `query ($page: Int = 1) {
        Page(page: $page, perPage: 50) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          media(type: ANIME, status: RELEASING, season: ${seasonKey}, seasonYear: ${currentYear}, sort:POPULARITY_DESC) {
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
        variables: {
          page: 1,
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("data returned:", data);
        let apiData = data.data.Page.media;
        apiData.map((item) => {
          if (auth.safeMode && item.isAdult) {
            return;
          } else {
            currentAnimeDispatch({
              type: "ADD_ANIME",
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
        //   console.log(apiData);
        //   data.data.Page.media.map((item, index) => {
        //     currentAnimeDispatch({
        //       type: "ADD_ANIME",
        //       anime: {
        //         name: item.title.english ? item.title.english : item.title.romaji,
        //         url: item.coverImage.extraLarge,
        //         genre: item.genres,
        //         aid: item.id,
        //         rating: item.averageScore,
        //         episodes: item.episodes,
        //         date: item.startDate,
        //       },
        //     });
        //   });
      });
  }
  useEffect(() => {
    CurrentDataFetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return currentAnimes.length > 0 ? (
    <Cards type="Current" />
  ) : (
    <div className="text-4xl text-white mt-32 text-center"> Loading.... </div>
  );
}

export default CurrentCalendar;
