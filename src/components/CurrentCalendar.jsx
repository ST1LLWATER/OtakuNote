import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { AnimeContext } from "../contexts/AnimeContext";
import Cards from "./Cards";

function CurrentCalendar() {
  const { currentAnimes, currentAnimeDispatch } = useContext(AnimeContext);
  //   console.log(currentAnimes);
  function CurrentDataFetcher() {
    const query = `query ($page: Int = 1) {
        Page(page: $page, perPage: 50) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          media(type: ANIME, status: RELEASING, season: SUMMER, seasonYear: 2021 sort:SCORE_DESC) {
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
            episodes
            genres
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
          status: "RELEASING",
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("data returned:", data);
        let apiData = data.data.Page.media;
        apiData.map((item, index) => {
          currentAnimeDispatch({
            type: "ADD_ANIME",
            anime: {
              name: item.title.english ? item.title.english : item.title.romaji,
              url: item.coverImage.extraLarge,
              genre: item.genres,
              // aid: item.id,
              rating: item.averageScore,
              episodes: item.episodes,
              date: item.startDate,
            },
          });
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
  }, []);
  return currentAnimes.length > 10 ? <Cards type="Current" /> : "Loading...";
}

export default CurrentCalendar;
