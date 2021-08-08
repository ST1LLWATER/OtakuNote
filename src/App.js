import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import CurrentCalendar from "./components/CurrentCalendar";
import CurrentCalendarRenderer from "./components/CurrentCalendarRenderer";
import Nav from "./components/Nav";
import Watchlist from "./components/Watchlist";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Watchlist} />
        <Route exact path="/current" component={CurrentCalendarRenderer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
