import { Link } from "react-router-dom";

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
          <Link to="/search" className="px-4 py-2 hover:text-white">
            SEARCH
          </Link>
          <Link to="/" className=" px-4 py-2 hover:text-white">
            WATCHLIST
          </Link>
          <Link to="/current" className="px-4 py-2 hover:text-white">
            ONGOING ANIMES
          </Link>
          <Link to="/" className="px-4 py-2 hover:text-white">
            KHOPCHA
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
