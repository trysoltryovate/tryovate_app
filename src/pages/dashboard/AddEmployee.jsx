import { Alert } from "@mui/material";

import AddEmplyForm from "../../components/AddEmplyForm";
import SecondaryNavbar from "../../components/SecondNavbar";

export default function AddEmployee() {
  return (
    <>
      <SecondaryNavbar />

      <main className="lg-ctr relative min-h-screen w-full p-2 md:p-3 lg:p-4">
        <section className="mb-4">
          <Alert severity="info">
            The <strong>Add Employee</strong> wizard guides you through the
            process of adding a new employee. You have the flexibility to enter
            comprehensive information about a new employee as soon as the person
            joins or first add salient details and update the remaining details
            later.
          </Alert>
        </section>

        <section className="mt-8 md:mt-12 lg:mt-16">
          <AddEmplyForm />
        </section>
      </main>
    </>
  );
}
