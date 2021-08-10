import { useContext, useEffect } from "react";
import { AnimeContext } from "../contexts/AnimeContext";

function Modal(props) {
  let newDescription = props.info.description.replace(/\([^\)]+?\)/g, "");
  const { auth } = useContext(AnimeContext);

  function keyChecker(e) {
    // if (e.value === "ESCAPE") {
    console.log(e);
    //   props.onClose;
    // }
  }

  useEffect(() => {
    if (auth.selectedState) {
      document.body.style.overflow = "hidden";
    }
  }, [auth.selectedState]);

  // console.log(newDescription);
  return (
    <>
      <div
        id="myModal"
        class="modal py-10 fixed flex justify-center align-middle left-0 bottom-0 right-0 top-0 w-full h-full"
      >
        <div class="modal-content text-white mb-2 flex flex-col rounded-lg relative text-sm w-5/6 sm:w-5/6 xl:w-1/2 lg:w-1/2 md:w-1/2 max-h-full p-4 overflow-y-auto bg-gray-900 sm:text-base xl:text-base lg:text-base md:text-base ">
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
            className="pb-14"
            dangerouslySetInnerHTML={{
              __html: newDescription,
            }}
          ></div>
          <button
            className="sticky bottom-0 ml-auto bg-red-500 hover:bg-red-700 hover:bg-yellow-300 hover:text-black text-white font-bold py-2 px-4 rounded"
            onClick={props.onClose}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
