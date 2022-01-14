import { useContext, useRef, useState } from "react";
import "../card.css";
import { AnimeContext } from "../contexts/AnimeContext";

function CurrentCalendarCard(props) {
  const { dispatch, animes, setWatchlist } = useContext(AnimeContext);
  const [isLoading, setisLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

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
        aid: props.aid,
        rating: props.rating,
        description: props.description,
        episodes: props.episodes,
        date: props.date,
        banner: props.banner,
        nextEpisode: props.nextEpisode,
        id: Date.now(),
      },
    });
    setWatchlist();
  }

  function successFunction() {
    setSuccess(true);
    Loading().then(() => {
      setSuccess(false);
    });
  }

  function duplicateWatchlist() {
    setIsDuplicate(true);
    Loading().then(() => {
      setIsDuplicate(false);
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
          <div className="button flex">
            <button
              id="add"
              className={
                (isLoading
                  ? "bg-yellow-300 text-gray-900 "
                  : success
                  ? "bg-green-600 text-white "
                  : isDuplicate
                  ? "bg-red-600 text-white "
                  : "bg-blue-600 text-white ") +
                "flex justify-center  items-center p-2 w-1/2 mx-auto rounded-md text-white active:text-gray-900 active:bg-gray-200"
              }
              onClick={() => {
                // console.log(isDuplicate);
                let duplicate = animes.find((x) => {
                  return x.aid === props.aid;
                });

                setisLoading(true);
                Loading().then(() => {
                  // console.log(isDuplicate);
                  if (duplicate) {
                    // console.log("IF RAN");
                    duplicateWatchlist();
                    setisLoading(false);
                  } else {
                    // console.log("ELSE RAN");
                    handleAdd();
                    successFunction();
                    setisLoading(false);
                  }
                });
              }}
            >
              {isDuplicate ? (
                <i className="fas fa-times-circle mr-2"></i>
              ) : (
                <i className="far fa-plus-square mr-2"></i>
              )}
              {isLoading
                ? "LOADING"
                : success
                ? "SUCCESS"
                : isDuplicate
                ? "INCLUDED"
                : "WATCHLIST"}
            </button>
            <button
              onClick={() => {
                props.showModalFunction(props.aid, true);
              }}
              className="flex justify-center items-center p-2 w-1/2 mx-2 bg-pink-600 rounded-md text-white active:text-red-600 active:bg-gray-200 hover:text-red-600 hover:bg-gray-200"
            >
              MORE INFO
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentCalendarCard;
