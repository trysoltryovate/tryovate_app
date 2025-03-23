export default function Navbar() {
  return (
    <>
      <header className="container h-16 w-full">
        <nav className="flex h-full w-full items-center justify-between">
          <h4 className="font-bold italic">Tryovate</h4>

          <button className="rounded-md bg-blue-500 px-4 py-1 text-white transition-all duration-300 ease-linear hover:bg-blue-700 hover:shadow-md md:px-6 md:py-2 md:font-medium">
            Login
          </button>
        </nav>
      </header>
    </>
  );
}
