import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-3">
        <h1 className="md:texxt-4xl text-3xl font-bold text-gray-400 lg:text-8xl">
          404
        </h1>

        <p className="text-lg text-red-400 md:text-xl">No results found...!</p>

        <Button
          variant="text"
          sx={{ textTransform: "capitalize" }}
          onClick={() => navigate("/dashboard/home")}
        >
          Go to Dashboard
        </Button>
      </main>
    </>
  );
}
