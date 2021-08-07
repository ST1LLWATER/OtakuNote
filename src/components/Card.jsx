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
        className="card_outer"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)),
    url(${props.url}) no-repeat center center/cover`,
        }}
      >
        <div className="card_content_cover"></div>
        <div className="card_content">
          <h1>{props.name}</h1>
          <div className="genre">
            <p>
              {props.genre.map((item, index) => {
                {
                  /* return <p key={index}>{item}</p>; */
                }
                return item + " ";
              })}
            </p>
          </div>
          <div className="card_details">
            <div className="card_rating">
              <p>{props.rating / 10}</p>
              <i className="fas fa-star"></i>
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
