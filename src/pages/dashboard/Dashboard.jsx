import { Outlet } from "react-router-dom";

import SecondaryNavbar from "../../components/SecondNavbar";

export default function Dashboard() {
  return (
    <>
      <SecondaryNavbar />
      <Outlet />
    </>
  );
}
