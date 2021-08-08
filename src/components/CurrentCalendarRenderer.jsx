import AnimeContextProvider from "../contexts/AnimeContext";
import CurrentCalendar from "./CurrentCalendar";

function CurrentCalendarRenderer() {
  return (
    <AnimeContextProvider>
      <CurrentCalendar />
    </AnimeContextProvider>
  );
}

export default CurrentCalendarRenderer;
