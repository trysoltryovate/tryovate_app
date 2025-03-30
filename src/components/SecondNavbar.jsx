import { FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

export default function SecondaryNavbar() {
  return (
    <>
      <header className="h-14 w-full border-b py-2">
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
            title="Login to of Tryovate"
          >
            <FaPowerOff />
          </Link>
        </nav>
      </header>
    </>
  );
}
