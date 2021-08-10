import { useContext, useRef, useState } from "react";
import "../card.css";
import { AnimeContext } from "../contexts/AnimeContext";

function CurrentCalendarCard(props) {
  const { dispatch } = useContext(AnimeContext);
  const [addWatchlist, setAddWatchlist] = useState(false);
  const [success, setSuccess] = useState(false);

  const Loading = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

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

  // useEffect(() => {
  //   dispatch({ type: "LOAD_ANIMES" });
  // }, []);

  function mouseMoveEvent(e) {
    e.preventDefault();

    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.current.offsetLeft;
    const scroll = x - startX;
    slider.current.scrollLeft = scrollLeft - scroll;
  }

  function handleAdd() {
    dispatch({
      type: "ADD_ANIME",
      anime: {
        name: props.name,
        genre: props.genre,
        url: props.url,
        // aid: props.id,
        rating: props.rating,
        description: props.description,
        episodes: props.episodes,
        date: props.date,
        banner: props.banner,
        id: Date.now(),
      },
    });
  }

  function successFunction() {
    setSuccess(true);
    Loading().then(() => {
      setSuccess(false);
    });
  }

  return (
    <>
      <div
        className="card_outer flex items-end z-10"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)),
    url(${props.url}) no-repeat center center/cover`,
        }}
      >
        <div className="card_content_cover"></div>
        <div className="card_content my-2">
          <h1 className="pr-2 font-bold text-xl">{props.name}</h1>
          <div className="card_details">
            {props.episodes ? (
              <div className="episodes">EP : {props.episodes} </div>
            ) : (
              ""
            )}

            {props.date ? (
              <div className="year">
                {months[props.date.month - 1]} {props.date.year}{" "}
              </div>
            ) : (
              ""
            )}

            <div className="card_rating">
              {props.rating ? (
                <>
                  {" "}
                  {props.rating / 10} <i className="fas fa-star"></i>
                </>
              ) : (
                ""
              )}
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
              return (
                <p
                  className="genre_item mr-2 rounded-full py-1 my-1 px-2 bg-gray-600 text-sm bg-opacity-80"
                  key={index}
                >
                  {item}
                </p>
              );
            })}
          </div>

          <button
            id="add"
            className={
              (addWatchlist
                ? "bg-yellow-300 text-gray-900 "
                : success
                ? "bg-green-600 text-white "
                : "bg-blue-600 text-white ") +
              "flex justify-center  items-center p-2 w-full mx-auto rounded-md text-white active:text-gray-900 active:bg-gray-200"
            }
            onClick={() => {
              handleAdd();
              setAddWatchlist(true);
              Loading().then(() => {
                setAddWatchlist(false);
                successFunction();
              });
            }}
          >
            <i className="far fa-plus-square mr-2"></i>
            {addWatchlist ? "LOADING" : success ? "SUCCESS" : "WATCHLIST"}
          </button>
        </div>
      </div>
    </>
  );
}

export default CurrentCalendarCard;
