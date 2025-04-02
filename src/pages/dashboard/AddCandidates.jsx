import { Alert } from "@mui/material";

import AddCandForm from "../../components/AddCandForm";

export default function AddCandidates() {
  return (
    <>
      <main className="lg-ctr relative min-h-screen w-full p-2 md:p-3 lg:p-4">
        <section className="mb-4">
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
