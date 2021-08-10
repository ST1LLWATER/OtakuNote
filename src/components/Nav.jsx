import { Link } from "react-router-dom";

function Nav() {
  return (
    // <nav id="nav" className="">
    //   <div className="nav-content">
    //     <ul className="nav-items">
    //       <li>
    //         <Link className="nav-item" to="/">
    //           WATCHLIST
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/current" className="nav-item whitespace-nowrap">
    //           CURRENT CALENDAR
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
    <header class="text-gray-400 bg-gray-900 body-font">
      <div class="container mx-auto w-screen flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div class="flex title-font font-medium items-center  text-white mb-4 md:mb-0">
          <span class="ml-3 cursor-default text-2xl">{"STILLWATER </>"}</span>
        </div>
        <nav class="md:ml-auto flex flex-wrap justify-between items-center text-lg ">
          <Link to="/" class=" px-4 py-2 hover:text-white">
            WATCHLIST
          </Link>
          <Link to="/current" class="px-4 py-2 hover:text-white">
            ONGOING ANIMES
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
