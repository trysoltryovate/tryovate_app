import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Welcome User...!</h1>

        <Link to={"/employee/add-employee"}>
          <button className="rounded-lg border bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 hover:shadow-md">
            Add Employee
          </button>
        </Link>
      </div>
    </>
  );
}
