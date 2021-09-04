import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function Nav() {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="w-full flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center  text-white mb-4 md:mb-0">
          <span className="ml-3 cursor-default text-2xl">
            {"STILLWATER </>"}
          </span>
        </div>
        <nav className="md:ml-auto flex flex-wrap justify-center items-center text-lg ">
          <NavLink
            activeClassName="active_link"
            to="/search"
            className="px-4 py-2 hover:text-white"
          >
            SEARCH
          </NavLink>
          <NavLink
            activeClassName="active_link"
            to="/"
            className=" px-4 py-2 hover:text-white"
          >
            WATCHLIST
          </NavLink>
          <NavLink
            activeClassName="active_link"
            to="/current"
            className="px-4 py-2 hover:text-white"
          >
            ONGOING ANIMES
          </NavLink>
          <a
            href="https://github.com/ST1LLWATER"
            target="_blank"
            className="px-4 py-2 hover:text-white text-2xl"
          >
            <FaGithub />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
