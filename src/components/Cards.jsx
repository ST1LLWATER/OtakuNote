import Card from "./Card";
import { AnimeContext } from "../contexts/AnimeContext";
import Modal from "./Modal";
import { useContext } from "react";
import CurrentCalendarCard from "./CurrentCalendarCard";

function Cards(props) {
  let animesMap;
  const { animes, authenticator, auth, currentAnimes } =
    useContext(AnimeContext);

  props.type === "Current" ? (animesMap = currentAnimes) : (animesMap = animes);
  function showModal(id, val = false) {
    if (val) {
      let aid = id;
      let newSelectedState = currentAnimes.find((x) => x.aid === aid);
      authenticator({ type: "SET_SELECTED_STATE", payload: newSelectedState });
    } else {
      let newSelectedState = animes.find((x) => x.id === id);
      authenticator({ type: "SET_SELECTED_STATE", payload: newSelectedState });
    }
  }

  function hideModal() {
    document.body.style.overflow = "auto";
    authenticator({ type: "NULLIFER" });
  }

  return animesMap.length ? (
    props.type === "Current" ? (
      <div className="cards grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-6 justify-items-center ">
        {animesMap.map((anime, index) => {
          return (
            <CurrentCalendarCard
              name={anime.name}
              key={index}
              aid={anime.aid}
              genre={anime.genre}
              rating={anime.rating}
              episodes={anime.episodes}
              url={anime.url}
              description={anime.description}
              date={anime.date}
              banner={anime.banner}
              nextEpisode={anime.nextEpisode}
              showModalFunction={showModal}
              isOngoing={true}
            />
          );
        })}
        {auth.selectedState && (
          <Modal
            info={auth.selectedState}
            onClose={hideModal}
            onGoingCard={true}
          />
        )}
      </div>
    ) : (
      <div className="cards grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-10 justify-items-center ">
        {animesMap.map((anime, index) => {
          return (
            <Card
              // key={index}
              name={anime.name}
              key={index}
              genre={anime.genre}
              rating={anime.rating}
              episodes={anime.episodes}
              description={anime.description}
              url={anime.url}
              date={anime.date}
              id={anime.id}
              showModalFunction={showModal}
            />
          );
        })}
        {auth.selectedState && (
          <Modal
            info={auth.selectedState}
            onClose={hideModal}
            onGoingCard={false}
          />
        )}
      </div>
    )
  ) : (
    <>
      <h1 className="text-4xl text-white mt-32 text-center">
        WoW! Such Silence......
      </h1>
      <p className="text-2xl text-white my-5 text-center">Go On! Add Some</p>
    </>
  );
}

export default Cards;
