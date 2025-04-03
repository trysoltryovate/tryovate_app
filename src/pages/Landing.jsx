import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";

export default function Landing() {
  return (
    <>
      <header className="h-16 w-full bg-[#0b0b0e] text-white">
        <nav className="container flex h-full w-full items-center justify-between">
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
            className="rounded-md bg-blue-500 px-4 py-1 text-white transition-all duration-300 ease-linear hover:bg-blue-700 hover:shadow-md md:px-6 md:py-2 md:font-medium"
            title="Login to Tryovate"
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="bg-[#0b0b0e]">
        <section className="container flex min-h-[85vh] w-full flex-col items-center justify-center gap-y-2 overflow-hidden text-white md:gap-y-3">
          <span className="blob absolute left-0 top-20 -z-0 size-1/2 blur-[100px]" />
          <h3 className="z-10 overflow-hidden text-center text-3xl font-bold sm:text-5xl md:text-6xl xl:w-[70%] 2xl:w-[60%]">
            Streamline Your Workforce Management Effortlessly
          </h3>
          <p className="z-20 mx-auto flex w-10/12 flex-wrap justify-center gap-2 py-4 text-center opacity-70 md:w-2/3 md:text-xl xl:w-[50%]">
            A centralized portal for managing candidates, attendance, payroll,
            and more - built to streamline HR operations within our company.
          </p>
          <Link
            to={"/login"}
            className="rounded-lg border px-4 py-2 font-medium hover:bg-white hover:text-black hover:shadow-lg"
          >
            Get started
          </Link>
        </section>
      </main>
      <footer className="h-20 w-full bg-[#0b0b0e] text-white">
        <div className="container flex h-full flex-col items-center justify-center border-t border-gray-600 px-4 md:flex-row md:justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Tryovate. All rights reserved.
          </p>

          <p className="mt-2 text-sm text-gray-400">
            For support, contact{" "}
            <a
              href="mailto:hr-external@trysol.com"
              className="text-blue-400 hover:underline"
            >
              hr-external@trysol.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
