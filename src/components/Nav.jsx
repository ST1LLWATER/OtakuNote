import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav id="nav" className="">
      <div className="nav-content">
        <ul className="nav-items">
          <li>
            <Link className="nav-item" to="/">
              WATCHLIST
            </Link>
          </li>
          <li>
            <Link to="/current" className="nav-item whitespace-nowrap">
              CURRENT CALENDAR
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
