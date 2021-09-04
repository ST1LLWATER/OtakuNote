import { Route, Switch } from "react-router-dom";
import "./App.css";
import CurrentCalendarRenderer from "./components/CurrentCalendarRenderer";
import Nav from "./components/Nav";
import SearchRenderer from "./components/SearchRenderer";
import Watchlist from "./components/Watchlist";
import AnimeContextProvider from "./contexts/AnimeContext";

function App() {
  return (
    <AnimeContextProvider>
      <Nav />
      <Switch>
        <Route exact path="/search" component={SearchRenderer} />
        <Route exact path="/" component={Watchlist} />
        <Route exact path="/current" component={CurrentCalendarRenderer} />
      </Switch>
    </AnimeContextProvider>
  );
}

export default App;
