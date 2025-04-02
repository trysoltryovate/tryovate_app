import {
  Alert,
  Breadcrumbs,
  CircularProgress,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

import Loader from "../components/Loader";
import NotFound from "../components/Not-Found";
import { tableFields } from "../utils/constants";

export default function Candidates() {
  const [candidatesData, setCandidatesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          import.meta.env.VITE_GET_ALL_EMPLOYEES_API_URL,
        );
        const dta = res.data;

        setCandidatesData(dta);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);

    try {
      await axios.delete(
        `${import.meta.env.VITE_DELETE_EMPLOYEE_API_URL}/${id}`,
      );
      setTimeout(() => {
        setCandidatesData((prev) =>
          prev.filter((candidate) => candidate.id !== id),
        );
        setDeletingId(null);
      }, 700);
    } catch (error) {
      console.error("Error deleting candidate:", error);
      setIsError(true);
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <main className="lg-ctr relative min-h-screen w-full">
        <section className="p-2 md:p-3 lg:p-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              className="hover:text-blue-500 hover:underline"
              color="inherit"
              href="/dashboard/home"
            >
              Dashboard
            </Link>
            <Typography sx={{ color: "text.primary" }}>Candidates</Typography>
          </Breadcrumbs>
        </section>

        <Alert icon={<FaCircleInfo fontSize="inherit" />} severity="info">
          The candidates directory lists all candidates in the organization.
        </Alert>

        <Divider
          orientation="horizontal"
          sx={{ margin: "16px 16px" }}
          flexItem
        />

        <section className="p-2 md:p-3 lg:p-4">
          <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  {tableFields &&
                    tableFields.map((field, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        sx={{ fontWeight: "bold", border: "1px solid #ddd" }}
                      >
                        {field}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {candidatesData &&
                  candidatesData.map((candidate, index) => (
                    <TableRow
                      key={candidate.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                        "&:hover": {
                          backgroundColor: "#e3f2fd",
                        },
                      }}
                    >
                      <TableCell align="center" className="border-l">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{candidate.fullName}</TableCell>
                      <TableCell align="center">{candidate.dob}</TableCell>
                      <TableCell align="center">
                        {candidate.contactNumber}
                      </TableCell>
                      <TableCell align="center">{candidate.email}</TableCell>
                      <TableCell align="center">
                        {candidate.highestDegree}
                      </TableCell>
                      <TableCell align="center">
                        {candidate.yearOfPassing}
                      </TableCell>
                      <TableCell align="center">
                        {candidate.selectedCourse}
                      </TableCell>
                      <TableCell align="center">
                        <button className="rounded-md border border-orange-200 bg-orange-100 p-2 text-orange-900 hover:bg-orange-200 hover:shadow-lg">
                          <MdEdit />
                        </button>
                      </TableCell>
                      <TableCell align="center">
                        <button
                          onClick={() => handleDelete(candidate.id)}
                          className="inline-flex items-center justify-center rounded-md border border-red-200 bg-red-100 p-2 font-bold text-red-900 hover:bg-red-200 hover:shadow-lg"
                          disabled={deletingId === candidate.id}
                        >
                          {deletingId === candidate.id ? (
                            <CircularProgress size={15} color="inherit" />
                          ) : (
                            <RiDeleteBin5Line />
                          )}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </main>
    </>
  );
}
