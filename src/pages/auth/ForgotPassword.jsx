import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/logo.png";

export default function ResetPassword() {
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_FORGOT_PASSWORD_API_URL,
        { username: userName, newPassword, confirmPassword },
      );

      if (res.status === 200) {
        setSnackbar({
          open: true,
          message: "Password reset successfully!",
          severity: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error resetting password. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <main className="container flex min-h-screen items-center justify-center">
      <section className="h-auto w-[90dvw] max-w-[450px] p-3 md:p-4">
        <div className="form-shadow h-full w-full rounded-lg bg-white p-3 shadow-md md:p-5 lg:py-8">
          <div className="mb-3 flex flex-col items-center justify-center gap-y-1 md:mb-5">
            <div className="mb-5 h-16 w-16 overflow-hidden md:h-[84px] md:w-[84px]">
              <img
                src={Logo}
                alt="Company Logo"
                className="block h-full w-full object-cover object-center"
              />
            </div>
            <p className="text-lg font-bold">Reset Password</p>
            <p className="text-sm font-medium opacity-70">
              Please enter your details to reset your password.
            </p>
          </div>

          <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="username"
                className="ml-1 w-max text-sm font-semibold opacity-80"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-background my-1 flex h-9 w-full rounded-md border border-gray-400 px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none"
                placeholder="Enter your username"
              />
            </div>

            {/* New Password Field */}
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="newPassword"
                className="ml-1 w-max text-sm font-semibold opacity-80"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-background my-1 flex h-9 w-full rounded-md border border-gray-400 px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-md border border-transparent px-2 py-1 text-gray-400 hover:cursor-pointer hover:border-gray-100 hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <IoMdEyeOff /> : <IoEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="confirmPassword"
                className="ml-1 w-max text-sm font-semibold opacity-80"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setConfirmPassword(value);
                    if (value && newPassword) {
                      if (value !== newPassword) {
                        setPasswordError("Passwords do not match.");
                      } else {
                        setPasswordError("Passwords meet requirements.");
                      }
                    } else {
                      setPasswordError("");
                    }
                  }}
                  className={`bg-background my-1 flex h-9 w-full rounded-md border px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none ${
                    passwordError === "Passwords do not match."
                      ? "border-red-500"
                      : passwordError === "Passwords meet requirements."
                        ? "border-green-500"
                        : "border-gray-400"
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-md border border-transparent px-2 py-1 text-gray-400 outline-1 hover:cursor-pointer hover:border-gray-100 hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoMdEyeOff /> : <IoEye />}
                </button>
              </div>
              {passwordError && (
                <p
                  className={`ml-1 mt-1 text-sm ${
                    passwordError === "Passwords meet requirements."
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 h-10 w-full rounded-md bg-blue-500 font-medium text-white transition-colors duration-200 ease-in hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </section>
    </main>
  );
}
