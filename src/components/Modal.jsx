import { useContext, useEffect, useState } from "react";
import { AnimeContext } from "../contexts/AnimeContext";
let dayjs = require("dayjs");

function Modal(props) {
  let newDescription = props.info.description.replace(/\([^\)]+?\)/g, "");
  const { auth } = useContext(AnimeContext);
  const [flipOut, setFlipOut] = useState(false);
  console.log(props);

  useEffect(() => {
    if (auth.selectedState) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          Loading().then(() => {
            props.onClose();
          });
        }
      });
    }
  }, [auth.selectedState]);

  const Loading = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const Loading2 = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  };

  // console.log(newDescription);
  return (
    <>
      <div
        id="myModal"
        className="modal py-10 fixed flex justify-center align-middle left-0 bottom-0 right-0 top-0 w-full h-full"
      >
        <div
          className={`modal-content ${
            flipOut ? "flipOut" : ""
          } text-white mb-2 flex flex-col rounded-lg relative text-sm w-5/6 sm:w-5/6 xl:w-1/2 lg:w-1/2 md:w-1/2 max-h-full p-4 overflow-y-auto bg-gray-900 sm:text-base xl:text-base lg:text-base md:text-base`}
        >
          <h1
            style={{
              background: `linear-gradient(90deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)),
    url(${props.info.banner}) no-repeat center center/cover`,
            }}
            className="text-2xl py-7 px-3 text-white font-bold mb-2 xl:text-3xl lg:text-2xl md:text-2xl sm:2xl"
          >
            {props.info.name}
          </h1>

          <div
            className={props.info.nextEpisode ? "" : "pb-14"}
            dangerouslySetInnerHTML={{
              __html: newDescription,
            }}
          ></div>
          {props.info.nextEpisode ? (
            <div className="pb-14">
              <p>
                Next Episode At:{" "}
                {dayjs(props.info.nextEpisode.airingAt * 1000).format(
                  "D MMMM YYYY"
                )}
              </p>
              {/* <p>Time Remaining: </p> */}
              <p>Upcoming Episode No: {props.info.nextEpisode.episode}</p>
            </div>
          ) : null}
          <button
            className="sticky bottom-0 ml-auto mr-2 mb-5 bg-red-500 hover:bg-yellow-300 hover:text-black text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setFlipOut(true);
              Loading2().then(() => {
                props.onClose();
              });
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
