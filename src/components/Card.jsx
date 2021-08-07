import { useContext } from "react";
import "../card.css";
import { AnimeContext } from "../contexts/AnimeContext";

function Card(props) {
  const { dispatch } = useContext(AnimeContext);
  function handleDelete(e) {
    dispatch({ type: "REMOVE_ANIME", id: props.id });
  }
  // const genres = props.genre.split(",");
  return (
    <>
      <div
        class="card_outer"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
    url(${props.url}) no-repeat center center/cover`,
        }}
      >
        <div class="card_content_cover"></div>
        <div class="card_content">
          <h1>{props.name}</h1>
          <div className="genre">
            {props.genre.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
          <div class="card_details">
            <div class="card_rating">
              <p>{props.rating / 10}</p>
              <i class="fas fa-star"></i>
            </div>
          </div>
          <button id="delete" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
