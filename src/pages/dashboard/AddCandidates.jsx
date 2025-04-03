import { Alert, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import AddCandForm from "../../components/AddCandForm";

export default function AddCandidates() {
  return (
    <>
      <main className="lg-ctr relative min-h-screen w-full p-2 md:p-3 lg:p-4">
        <section className="p-2 md:p-3 lg:p-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              className="hover:text-blue-500 hover:underline"
              color="inherit"
              to="/dashboard/home"
            >
              Dashboard
            </Link>
            <Typography sx={{ color: "text.primary" }}>
              Add New Candidate
            </Typography>
          </Breadcrumbs>
        </section>

        <section className="mb-4 px-2 md:px-3">
          <Alert severity="info">
            The <strong>Add Candidate</strong> wizard guides you through the
            process of adding a new candidate. You have the flexibility to enter
            comprehensive information about a new candidate as soon as the
            person joins or first add salient details and update the remaining
            details later.
          </Alert>
        </section>

        <section className="mt-8 md:mt-12 lg:mt-16">
          <AddCandForm />
        </section>
      </main>
    </>
  );
}
