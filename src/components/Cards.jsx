import Card from "./Card";
import { AnimeContext } from "../contexts/AnimeContext";
import { useContext } from "react";

function Cards() {
  const { animes } = useContext(AnimeContext);
  return animes.length ? (
    <div className="cards grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center">
      {animes.map((anime) => {
        return (
          <Card
            name={anime.name}
            id={anime.id}
            key={anime.id}
            anime_id={anime.aid}
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
    <h1 className="empty text-white text-center text-xl font-bold">
      No More Animes On The List
    </h1>
  );
}

export default Cards;
