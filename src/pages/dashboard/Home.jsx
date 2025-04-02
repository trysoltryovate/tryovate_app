import { useState } from "react";

import Statistics from "./Statistics";
import Welcome from "./Welcome";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(true);
  return (
    <>
      <main className="lg-ctr relative min-h-screen w-full">
        <div className="absolute left-[50%] right-[50%] m-3 mx-auto flex w-max translate-x-[-120px] items-center justify-center gap-x-1 rounded-lg border p-1 md:my-4">
          <button
            onClick={() => setShowDashboard(true)}
            className={`rounded-md border px-4 py-2 font-medium hover:shadow-md ${showDashboard ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            Welcome
          </button>
          <button
            className={`rounded-md border px-4 py-2 font-medium hover:shadow-md ${!showDashboard ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setShowDashboard(false)}
          >
            Dashboard
          </button>
        </div>
        {showDashboard ? <Welcome /> : <Statistics />}
      </main>
    </>
  );
}
