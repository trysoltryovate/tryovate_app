import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo.png";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(true);
  return (
    <>
      <header className="container h-16 w-full">
        <nav className="flex h-full w-full items-center justify-between">
          <Link className="font-bold italic" to={"/"} title="Go to Home page">
            <img
              src={Logo}
              alt="tryovate_logo"
              title="Tryovate"
              className="w-[42px] md:w-[52px] lg:w-[62px]"
            />
          </Link>

          <Link
            to={"/login"}
            className="hover:bg-grey-700 rounded-md bg-gray-200 px-3 py-1 text-gray-500 transition-all duration-300 ease-linear hover:shadow-md md:px-4 md:py-2 md:font-medium"
            title="Login to Tryovate"
          >
            <FaPowerOff />
          </Link>
        </nav>
      </header>

      <main className="container relative min-h-screen w-full border-2">
        <div className="m-2 flex items-center justify-center gap-x-2">
          <button
            onClick={() => setShowDashboard(true)}
            className="rounded-lg border bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 hover:shadow-md"
          >
            Welcome
          </button>
          <button
            className="rounded-lg border bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 hover:shadow-md"
            onClick={() => setShowDashboard(false)}
          >
            Dashboard
          </button>
        </div>
        {showDashboard ? <Welcome /> : <Dashboard />}
      </main>
    </>
  );
}
