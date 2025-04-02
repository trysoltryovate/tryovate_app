import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LazyLoad from "../components/LazyLoader";

const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/auth/Login"));
const Home = lazy(() => import("../pages/dashboard/Home"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const AddCandidates = lazy(() => import("../pages/dashboard/AddCandidates"));
const Candidates = lazy(() => import("../pages/Candidates"));

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
    path: "/dashboard",
    element: LazyLoad(Dashboard),
    children: [
      {
        path: "/dashboard/home",
        element: LazyLoad(Home),
      },
      {
        path: "/dashboard/candidates",
        element: LazyLoad(Candidates),
      },
      {
        path: "/dashboard/candidates/add-candidate",
        element: LazyLoad(AddCandidates),
      },
    ],
  },
]);
