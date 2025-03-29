import { useState } from "react";

import SecondaryNavbar from "../../components/SecondNavbar";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(true);
  return (
    <>
      <SecondaryNavbar />

      <main className="container relative min-h-screen w-full border-2">
        <div className="m-2 flex items-center justify-center gap-x-2">
          <button
            onClick={() => setShowDashboard(true)}
            className="rounded-lg border bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 hover:shadow-md"
          >
            Welcome
          </button>
          <button
            className="rounded-lg border bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 hover:shadow-md"
            onClick={() => setShowDashboard(false)}
          >
            Dashboard
          </button>
        </div>
        {showDashboard ? <Welcome /> : <Dashboard />}
      </main>
    </>
  );
}
