import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LazyLoad from "../components/LazyLoader";

const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/auth/Login"));
const Home = lazy(() => import("../pages/dashboard/Home"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const AddCandidates = lazy(() => import("../pages/dashboard/AddCandidates"));
const EditCandInfo = lazy(() => import("../pages/EditCandInfo"));
const Candidates = lazy(() => import("../pages/Candidates"));
const NotFound = lazy(() => import("../components/Not-Found"));

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
        errorElement: LazyLoad(NotFound),
      },
      {
        path: "/dashboard/candidates/add-candidate",
        element: LazyLoad(AddCandidates),
      },
      {
        path: "/dashboard/candidates/edit-candidate/:candidateId",
        element: LazyLoad(EditCandInfo),
      },
    ],
  },
]);
