import Input from "./Input";
import Cards from "./Cards";
import AnimeContextProvider from "../contexts/AnimeContext";

function Watchlist() {
  return (
    <AnimeContextProvider>
      <div className="cover">
        <div className="form">
          <Input />
        </div>
        <Cards type="watchlist" />
      </div>
    </AnimeContextProvider>
  );
}

export default Watchlist;
