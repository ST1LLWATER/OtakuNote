import { useEffect, useState, useContext } from "react";
import { AnimeContext } from "../contexts/AnimeContext";
import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import supabase from "../supabase";

function Nav() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { syncWatchlist, loadWatchlist } = useContext(AnimeContext);

  const Loading = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setUser(user.user_metadata);
    }
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user.user_metadata);
        loadWatchlist();
      }
      if (event === "SIGNED_OUT") setUser(null);
    });
  }, [loadWatchlist]);

  async function signInWithDiscord() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "discord",
    });
  }
  async function signout() {
    const { error } = await supabase.auth.signOut();
    console.log({ error });
  }

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="w-full flex flex-wrap px-5 py-4 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center  text-white mb-4 md:mb-0">
          <span className="ml-3 cursor-default text-2xl">
            {"STILLWATER </>"}
          </span>
        </div>
        <nav className="md:ml-auto flex flex-wrap justify-center items-center text-lg ">
          <NavLink
            exact
            activeClassName="active_link"
            to="/search"
            className="px-4 py-2 hover:text-white"
          >
            Search
          </NavLink>
          <NavLink
            exact
            activeClassName="active_link"
            to="/"
            className=" px-4 py-2 hover:text-white"
          >
            Watchlist
          </NavLink>
          <NavLink
            exact
            activeClassName="active_link"
            to="/current"
            className="px-4 py-2 hover:text-white"
          >
            Ongoing
          </NavLink>
          <button
            className="px-4 py-2 hover:text-white"
            onClick={!user ? signInWithDiscord : null}
          >
            {user ? user.full_name : "Login"}
          </button>
          <button
            className={`px-4 py-2 hover:text-white ${user ? "" : "hidden"}`}
            onClick={signout}
          >
            {user ? "Logout" : null}
          </button>
          <button
            className={`px-4 py-2 hover:text-white ${user ? "" : "hidden"}`}
            onClick={() => {
              setLoading(true);
              syncWatchlist();
              Loading().then(() => {
                setLoading(false);
                setDone(true);
                Loading().then(() => setDone(false));
              });
            }}
          >
            {loading ? "Wait" : done ? "Done" : "Sync"}
          </button>
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
