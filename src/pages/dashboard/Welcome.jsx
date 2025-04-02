import { FiDatabase } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      <div className="">
        <section className="welcome-bg flex min-h-[40vh] w-full flex-col justify-center gap-y-3 bg-gray-100 p-6 md:gap-y-4 md:p-8 lg:p-10">
          <p className="text-2xl md:text-3xl lg:text-4xl">Hi there, Welcome</p>

          <p className="text-lg opacity-70">
            Let's do great things together. 🚀 🌟
          </p>
        </section>

        <section className="bg-[#EEEDEF] p-3 md:p-6 lg:p-8">
          <h5 className="text-xl font-semibold md:text-2xl">My Favourites</h5>
          <div className="flex h-auto w-full flex-wrap items-center gap-3 py-5 md:gap-4">
            <Link to={"/candidates/add-candidate"}>
              <div className={`favCard`}>
                <span className="rounded-lg bg-blue-300 p-1 text-lg md:p-2">
                  <IoPersonOutline />
                </span>
                <h4 className="text-base">Add Employee</h4>
              </div>
            </Link>
            <Link to={"/candidates/add-candidate"}>
              <div className={`favCard`}>
                <span className="rounded-lg bg-blue-300 p-1 text-lg md:p-2">
                  <IoPersonOutline />
                </span>
                <h4 className="text-base">Update Employee Data</h4>
              </div>
            </Link>
            <Link to={"/candidates/add-candidate"}>
              <div
                className={`favCard border-orange-300 bg-orange-100 hover:bg-orange-100`}
              >
                <span className="rounded-lg bg-orange-200 p-1 text-lg md:p-2">
                  <FiDatabase />
                </span>
                <h4 className="text-base">Update Payroll Data</h4>
              </div>
            </Link>
            <Link to={"/candidates/add-candidate"}>
              <div
                className={`favCard border-orange-300 bg-orange-100 hover:bg-orange-100`}
              >
                <span className="rounded-lg bg-orange-200 p-1 text-lg md:p-2">
                  <FiDatabase />
                </span>
                <h4 className="text-base">Salary statement for a month</h4>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
