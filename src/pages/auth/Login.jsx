import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdEyeOff, IoMdInformationCircle } from "react-icons/io";
import { IoEye } from "react-icons/io5";

import Logo from "../../assets/logo.jpg";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginIdError, setLoginIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isPassVisible, setIsPassVisible] = useState(false);

  const validateLoginId = (e) => {
    setLoginId(e.target.value);
    setLoginIdError(
      e.target.value
        ? e.target.value.length < 4
          ? `At least 4 characters needed`
          : "Login ID is correct."
        : "Login ID is required!",
    );
  };

  const validatePassword = (value) => {
    const minLength = value.length >= 8;
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!value)
      return {
        message: "Password is required!",
        isError: true,
        isSuccess: false,
      };
    if (!minLength)
      return {
        message: "Password must be at least 8 characters long.",
        isError: true,
        isSuccess: false,
      };
    if (!hasNumber)
      return {
        message: "Password must contain at least one number 0 - 9.",
        isError: true,
        isSuccess: false,
      };
    if (!hasSymbol)
      return {
        message: "Password must contain at least one symbol eg. !@#$%.",
        isError: true,
        isSuccess: false,
      };

    return {
      message: "Your password meets requirements.",
      isError: false,
      isSuccess: true,
    };
  };

  return (
    <main className="container flex min-h-screen items-center justify-center">
      <section className="h-auto w-[90dvw] max-w-[450px] p-3 md:p-4">
        <div className="form-shadow h-full w-full rounded-lg p-3 md:p-5 lg:py-8">
          {/* Logo & Heading */}
          <div className="mb-3 flex flex-col items-center justify-center gap-y-1 md:mb-5">
            <div className="h-8 w-8 overflow-hidden md:h-16 md:w-16">
              <img
                src={Logo}
                alt="Company Logo"
                className="block h-full w-full object-cover object-center"
              />
            </div>
            <p className="text-lg font-bold">Welcome back</p>
            <p className="text-sm font-medium opacity-70">
              Please enter your details to login.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-y-3">
            {/* Login ID */}
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
                value={loginId}
                onChange={(e) => validateLoginId(e)}
                className={`border ${
                  loginId.length < 4
                    ? "border-gray-400"
                    : loginIdError.includes("correct")
                      ? "border-green-500 focus-visible:ring-green-100"
                      : "border-red-500 focus-visible:ring-red-100"
                } bg-background ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                placeholder="Enter user ID"
              />
              {
                <p
                  className={`inline-flex items-center gap-x-1 text-[12px] font-semibold ${
                    loginId
                      ? loginId.length >= 4
                        ? "text-green-600"
                        : "text-red-500"
                      : "text-green-500"
                  } ${loginIdError ? "opacity-100" : "opacity-0"}`}
                >
                  {isSuccess ? <FaCircleCheck /> : <IoMdInformationCircle />}{" "}
                  {loginIdError}
                </p>
              }
            </div>

            {/* Password */}
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="password"
                className="ml-1 text-sm font-semibold opacity-80"
              >
                Password
              </label>
              {/* Password */}
              <div className="relative">
                <input
                  type={isPassVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    const validation = validatePassword(e.target.value);
                    setPasswordError(validation.message);
                    setIsError(validation.isError);
                    setIsSuccess(validation.isSuccess);
                  }}
                  className={`border ${
                    password.length === 0
                      ? "border-gray-400"
                      : isSuccess
                        ? "border-green-500 focus-visible:ring-green-100"
                        : "border-red-500 focus-visible:ring-red-100"
                  } bg-background ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-md border border-transparent px-2 py-1 text-gray-400 outline-1 hover:cursor-pointer hover:border-gray-100 hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                >
                  {isPassVisible ? <IoEye /> : <IoMdEyeOff />}
                </button>
              </div>
              {
                <p
                  className={`inline-flex items-center gap-x-1 text-[12px] font-semibold ${
                    isSuccess ? "text-green-600" : "text-red-500"
                  } ${passwordError ? "opacity-100" : "opacity-0"} `}
                >
                  {isSuccess ? <FaCircleCheck /> : <IoMdInformationCircle />}{" "}
                  {passwordError}
                </p>
              }
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 h-10 w-full rounded-md bg-blue-500 font-medium text-white transition-colors duration-200 ease-in hover:bg-blue-600 hover:shadow-xl disabled:bg-blue-300"
              disabled={!loginId || isError}
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
