import Input from "./Input";
import Cards from "./Cards";

function Watchlist() {
  return (
    <>
      <div className="form">
        <Input />
      </div>
      <Cards type="watchlist" />
    </>
  );
}

export default Watchlist;
