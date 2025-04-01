import { Button } from "@mui/material";

export default function AddEmployee() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-y-3">
        <h1 className="text-3xl font-bold">Add Employee...!</h1>

        <Button variant="contained">Click Me</Button>
      </div>
    </>
  );
}
