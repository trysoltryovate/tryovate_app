import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LazyLoad from "../components/LazyLoader";

const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/auth/Login"));
const Home = lazy(() => import("../pages/dashboard/Home"));
const AddCandidates = lazy(() => import("../pages/dashboard/AddCandidates"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: LazyLoad(Landing),
  },
  {
    path: "/login",
    element: LazyLoad(Login),
  },
  {
    path: "/home",
    element: LazyLoad(Home),
  },
  {
    path: "/candidates/add-candidate",
    element: LazyLoad(AddCandidates),
  },
]);
