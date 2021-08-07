import Card from "./Card";
import { AnimeContext } from "../contexts/AnimeContext";
import { useContext } from "react";

function Cards() {
  const { animes } = useContext(AnimeContext);
  return animes.length ? (
    <div className="cards">
      {animes.map((anime) => {
        console.log(animes);
        return (
          <Card
            name={anime.name}
            id={anime.id}
            key={anime.id}
            anime_id={anime.aid}
            genre={anime.genre}
            rating={anime.rating}
            url={anime.url}
          />
        );
      })}
    </div>
  ) : (
    <h1 className="empty">No More Animes On The List</h1>
  );
}

export default Cards;
