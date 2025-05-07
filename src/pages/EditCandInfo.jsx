import { Alert, Breadcrumbs, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import EditCandForm from "../components/EditCandForm";
import Loader from "../components/Loader";
import NotFound from "../components/Not-Found";
import { emptyFormFields } from "../utils/placeholders";

export default function EditCandInfo() {
  const { candidateId } = useParams();
  //console.log(candidateId);

  const [candidate, setCandidate] = useState(emptyFormFields);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
      setIsLoading(true);

      try {
        console.log(
          `${import.meta.env.VITE_GET_CANDIDATE_BY_ID_API_URL}/${candidateId}`,
        );

        const res = await axios.get(
          `${import.meta.env.VITE_GET_CANDIDATE_BY_ID_API_URL}/${candidateId}`,
        );
        const dta = res.data;
        console.log(dta);
        setCandidate(dta);
      } catch (error) {
        console.log(error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <main className="lg-ctr relative min-h-screen w-full">
        <section className="px-2 pt-2 md:px-3 md:pt-3 lg:px-4 lg:pt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              className="hover:text-blue-500 hover:underline"
              color="inherit"
              to="/dashboard/home"
            >
              Dashboard
            </Link>
            <Link
              className="hover:text-blue-500 hover:underline"
              color="inherit"
              to="/dashboard/candidates"
            >
              Candidates
            </Link>
            <Typography sx={{ color: "text.primary" }}>
              Edit Candidate
            </Typography>
          </Breadcrumbs>
        </section>

        <section className="m-2 md:m-3 lg:m-4">
          <Alert severity="info">
            This page allows you to edit the profile details of an candidate.
            The page helps you to keep the candidate information up to date.
          </Alert>
        </section>

        <Divider
          orientation="horizontal"
          sx={{ margin: "16px 16px" }}
          flexItem
        />

        <EditCandForm candidate={candidate} candidateId={candidateId} />
      </main>
    </>
  );
}
