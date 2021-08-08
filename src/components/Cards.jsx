import Card from "./Card";
import { AnimeContext } from "../contexts/AnimeContext";
import { useContext } from "react";
import CurrentCalendarCard from "./CurrentCalendarCard";

function Cards(props) {
  let animesMap;
  const { animes } = useContext(AnimeContext);
  let { currentAnimes } = useContext(AnimeContext);
  props.type == "Current" ? (animesMap = currentAnimes) : (animesMap = animes);

  return animesMap.length ? (
    props.type === "Current" ? (
      <div className="cards grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-10 justify-items-center ">
        {animesMap.map((anime) => {
          return (
            <CurrentCalendarCard
              name={anime.name}
              key={anime.id}
              // anime_id={anime.aid}
              genre={anime.genre}
              rating={anime.rating}
              episodes={anime.episodes}
              url={anime.url}
              date={anime.date}
            />
          );
        })}
      </div>
    ) : (
      <div className="cards grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-10 justify-items-center ">
        {animesMap.map((anime) => {
          return (
            <Card
              name={anime.name}
              anime_id={anime.aid}
              genre={anime.genre}
              rating={anime.rating}
              episodes={anime.episodes}
              url={anime.url}
              date={anime.date}
              id={anime.id}
            />
          );
        })}
      </div>
    )
  ) : (
    <h1 className="empty text-white text-center text-xl font-bold">
      NO MORE ANIME....
    </h1>
  );
}

export default Cards;
