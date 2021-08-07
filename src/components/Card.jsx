import { useContext, useEffect, useRef } from "react";
import "../card.css";
import { AnimeContext } from "../contexts/AnimeContext";

function Card(props) {
  const { dispatch } = useContext(AnimeContext);
  const slider = useRef(null);
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

  function handleDelete(e) {
    dispatch({ type: "REMOVE_ANIME", id: props.id });
  }

  let mouseDown = false;
  let startX, scrollLeft;

  let startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.current.offsetLeft;
    scrollLeft = slider.current.scrollLeft;
  };
  const stopDragging = (event) => {
    mouseDown = false;
  };

  function mouseMoveEvent(e) {
    e.preventDefault();

    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.current.offsetLeft;
    const scroll = x - startX;
    slider.current.scrollLeft = scrollLeft - scroll;
  }

  return (
    <>
      <div
        className="card_outer flex items-end z-10"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)),
    url(${props.url}) no-repeat center center/cover`,
        }}
      >
        <div className="card_content_cover"></div>
        <div className="card_content my-2">
          <h1 className="pr-2 font-bold text-xl">{props.name}</h1>
          <div className="card_details">
            <div className="episodes">
              {props.episodes ? `EP : ${props.episodes}` : ""}
            </div>
            <div className="year">
              {props.date
                ? `${months[props.date.month - 1]} ${props.date.year}`
                : ""}
            </div>
            <div className="card_rating">
              <p>{props.rating ? `${props.rating / 10}` : ""}</p>
              <i className="fas fa-star"></i>
            </div>
          </div>

          <div
            className="genre mb-2"
            ref={slider}
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={mouseMoveEvent}
          >
            {props.genre.map((item, index) => {
              {
                return (
                  <p
                    className="genre_item mr-2 rounded-full py-1 my-1 px-2 bg-gray-600 text-sm bg-opacity-80"
                    key={index}
                  >
                    {item}
                  </p>
                );
              }
              {
                /* return item + " "; */
              }
            })}
          </div>

          <button
            id="delete"
            className="flex justify-center items-center p-2 w-full mx-auto bg-red-600 rounded-md text-white hover:text-red-600 hover:bg-gray-200"
            onClick={handleDelete}
          >
            <i class="far fa-trash-alt mr-2"></i>DELETE
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
