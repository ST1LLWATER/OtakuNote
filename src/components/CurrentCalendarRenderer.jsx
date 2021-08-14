import { useContext, useEffect } from "react";
import { AnimeContext } from "../contexts/AnimeContext";
import CurrentCalendar from "./CurrentCalendar";

function CurrentCalendarRenderer() {
  const { searchAnimes, animes } = useContext(AnimeContext);
  useEffect(() => {
    searchAnimes({ type: "CLEAR" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <CurrentCalendar />;
}

export default CurrentCalendarRenderer;
