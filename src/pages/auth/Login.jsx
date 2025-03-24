import { IoMdInformationCircle } from "react-icons/io";

import Logo from "../../assets/logo.jpg";

export default function Login() {
  return (
    <>
      <main className="container flex min-h-screen items-center justify-center">
        <section className="h-auto w-[90dvw] max-w-[450px] p-3 md:p-4">
          <div className="h-full w-full rounded-md border-2 p-3 shadow-xl md:p-5 lg:py-8">
            <div className="mb-3 flex flex-col items-center justify-center gap-y-1 md:mb-5">
              <div className="h-8 w-8 overflow-hidden md:h-16 md:w-16">
                <img
                  src={Logo}
                  alt="Logo"
                  className="block h-full w-full object-cover object-center"
                />
              </div>

              <p className="text-lg font-bold">Welcome back</p>
              <p className="text-sm font-medium opacity-70">
                Please enter your details to login.
              </p>
            </div>

            <div className="">
              <form action="#" className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-1">
                  <label
                    htmlFor="loginId"
                    className="ml-1 text-sm font-semibold opacity-80"
                  >
                    Login ID
                  </label>
                  <input
                    type="text"
                    id="loginId"
                    className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring my-1 flex h-9 w-full rounded-md border px-3 py-2 text-base font-medium opacity-90 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Enter user id"
                  />
                  <p className="inline-flex items-center gap-x-1 text-[12px] font-semibold text-red-500">
                    <IoMdInformationCircle /> Field is required!
                  </p>
                </div>

                <div className="flex flex-col gap-y-1">
                  <label
                    htmlFor="password"
                    className="ml-1 text-sm font-semibold opacity-80"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring my-1 flex h-9 w-full rounded-md border px-3 py-2 text-base font-medium opacity-90 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Password"
                  />
                  <p className="inline-flex items-center gap-x-1 text-[12px] font-semibold text-red-500">
                    <IoMdInformationCircle /> Field is required!
                  </p>
                </div>

                <button className="mt-2 h-10 w-full rounded-md bg-blue-500 font-medium text-white transition-colors duration-200 ease-in hover:bg-blue-600 hover:shadow-xl">
                  Login
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
