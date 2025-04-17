import {
  Alert,
  Breadcrumbs,
  Checkbox,
  CircularProgress,
  Divider,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import { FaSort } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import ConfirmDeleteDialog from "../components/ConfirmDelete";
import Loader from "../components/Loader";
import NotFound from "../components/Not-Found";
import { tableFields } from "../utils/constants";
import { gapFromGraduationYear } from "../utils/constants";

export default function Candidates() {
  const [candidatesData, setCandidatesData] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          import.meta.env.VITE_GET_ALL_CANDIDATE_API_URL,
        );
        const dta = res.data;

        // Sort the candidates after fetching
        const sortedData = dta.sort((a, b) => Number(a.id) - Number(b.id));
        setCandidatesData(sortedData);
        setFilteredCandidates(sortedData); // Also set filtered candidates to the sorted data
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortCandidates = () => {
    const candidatesToSort = searchQuery ? filteredCandidates : candidatesData;

    const sortedCandidates = [...candidatesToSort].sort((a, b) => {
      return sortOrder === "asc"
        ? Number(b.id) - Number(a.id)
        : Number(a.id) - Number(b.id);
    });

    if (searchQuery) {
      setFilteredCandidates(sortedCandidates);
    } else {
      setCandidatesData(sortedCandidates);
    }

    // Toggle the sort order
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleExport = () => {
    const candidatesToExport = candidatesData.filter((candidate) =>
      selectedCandidates.includes(candidate.id),
    );

    const formattedData = candidatesToExport.map((candidate) => {
      const allDetails = { ...candidate };

      // Convert arrays and objects to strings for Excel compatibility
      Object.keys(allDetails).forEach((key) => {
        if (Array.isArray(allDetails[key])) {
          allDetails[key] = allDetails[key].join(", ");
        } else if (
          typeof allDetails[key] === "object" &&
          allDetails[key] !== null
        ) {
          allDetails[key] = JSON.stringify(allDetails[key]);
        }
      });

      return allDetails;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

    XLSX.writeFile(workbook, "Selected_Candidates.xlsx");
  };

  //console.log(candidatesData);
  const handleClickOpen = (id) => {
    setDeletingId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleClose = () => {
    setIsConfirmDialogOpen(false);
    setDeletingId(null);
  };

  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredCandidates(candidatesData);
    } else {
      const filtered = candidatesData.filter((candidate) => {
        const idMatch = candidate.id.toString().includes(query);
        const nameMatch = candidate.fullName?.toLowerCase().includes(query);
        const courseMatch = Array.isArray(candidate.selectedCourse)
          ? candidate.selectedCourse.some((each) =>
              each?.toLowerCase().includes(query),
            )
          : false;

        return idMatch || nameMatch || courseMatch;
      });

      //console.log("Filtered Results:", filtered);
      setFilteredCandidates(filtered);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);

    try {
      await axios.delete(
        `${import.meta.env.VITE_DELETE_CANDIDATE_API_URL}/${id}`,
      );
      setTimeout(() => {
        setCandidatesData((prev) =>
          prev.filter((candidate) => candidate.id !== id),
        );
        setFilteredCandidates((prev) =>
          prev.filter((candidate) => candidate.id !== id),
        );
        setDeletingId(null);

        setSnackbar({
          open: true,
          message: `Successfully deleted user: ${id}`,
          severity: "success",
        });
      }, 700);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setDeletingId(null);
      setSnackbar({
        open: true,
        message: "Something went wrong, try later!",
        severity: "error",
      });
    } finally {
      setIsConfirmDialogOpen(false);
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
              to="/dashboard/home"
            >
              Dashboard
            </Link>
            <Typography sx={{ color: "text.primary" }}>Candidates</Typography>
          </Breadcrumbs>
        </section>

        <section className="mb-4 px-2 md:px-3">
          <Alert icon={<FaCircleInfo fontSize="inherit" />} severity="info">
            The candidates directory lists all candidates in the organization.
          </Alert>
        </section>

        <Divider
          orientation="horizontal"
          sx={{ margin: "16px 16px" }}
          flexItem
        />

        <section className="flex w-full flex-wrap items-center justify-between gap-2 px-2 md:justify-between md:px-3">
          <TextField
            label="Search by ID or Name or Course"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full md:w-[260px]"
          />
          <div className="flex w-full items-center justify-between md:w-max md:justify-center">
            <button
              className="inline-flex items-center justify-center gap-x-1 rounded-lg bg-blue-200 p-2 px-4 text-blue-800 transition-colors duration-200 hover:bg-blue-300 hover:text-blue-900 hover:shadow-lg"
              onClick={() => navigate("/dashboard/candidates/add-candidate")}
            >
              <HiPlus size={20} /> Add Candidate
            </button>

            <button
              className="ml-2 inline-flex items-center justify-center gap-x-1 rounded-lg bg-green-200 p-2 px-4 text-green-800 transition-colors duration-200 hover:cursor-pointer hover:bg-green-300 hover:text-green-900 hover:shadow-lg"
              onClick={handleExport}
              disabled={selectedCandidates.length === 0}
            >
              <MdOutlineFileDownload size={20} />
              Download
            </button>
          </div>
        </section>

        <section className="p-2 md:p-3 lg:p-4">
          <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
            <Table>
              <TableHead>
                <TableRow className="bg-blue-800">
                  {tableFields.map((field, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        border: "1px solid #ddd",
                        color: "#ffffff",
                      }}
                      className={index === 0 ? "border-l" : ""}
                    >
                      {index === 0 ? (
                        <Checkbox
                          sx={{
                            color: "#ffffff",
                            "&.Mui-checked": {
                              color: "#ffffff",
                            },
                          }}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const data = searchQuery
                              ? filteredCandidates
                              : candidatesData;
                            if (isChecked) {
                              const allIds = data.map((c) => c.id);
                              setSelectedCandidates(allIds);
                            } else {
                              setSelectedCandidates([]);
                            }
                          }}
                          checked={
                            (searchQuery ? filteredCandidates : candidatesData)
                              .length > 0 &&
                            selectedCandidates.length ===
                              (searchQuery
                                ? filteredCandidates
                                : candidatesData
                              ).length
                          }
                          indeterminate={
                            selectedCandidates.length > 0 &&
                            selectedCandidates.length <
                              (searchQuery
                                ? filteredCandidates
                                : candidatesData
                              ).length
                          }
                        />
                      ) : index === 1 ? (
                        <>
                          <div
                            className="flex h-12 items-center justify-between hover:cursor-pointer"
                            onClick={sortCandidates}
                          >
                            {field}

                            <FaSort size={16} />
                          </div>
                        </>
                      ) : (
                        <span>{field}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {(searchQuery ? filteredCandidates : candidatesData).map(
                  (candidate, index) => (
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
                        <Checkbox
                          checked={selectedCandidates.includes(candidate.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedCandidates((prev) =>
                              checked
                                ? [...prev, candidate.id]
                                : prev.filter((id) => id !== candidate.id),
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" className="border-l">
                        {candidate?.id}
                      </TableCell>
                      <TableCell align="center">{candidate.fullName}</TableCell>
                      <TableCell align="center">{candidate.dob}</TableCell>
                      <TableCell align="center">
                        {candidate.contactNumber}
                      </TableCell>
                      <TableCell align="center">{candidate.email}</TableCell>
                      <TableCell align="center">{candidate.degree}</TableCell>
                      <TableCell align="center">
                        {candidate.yearOfPassing}
                      </TableCell>
                      <TableCell align="center">
                        {candidate.highestDegree}
                      </TableCell>
                      <TableCell align="center">
                        {candidate.pgYearOfPassing}
                      </TableCell>

                      <TableCell align="center">
                        <ul>
                          {candidate.selectedCourse &&
                            candidate.selectedCourse.map((course, i) => {
                              return <li key={i}>{course}</li>;
                            })}
                        </ul>
                      </TableCell>
                      <TableCell align="center">{candidate.batchId}</TableCell>
                      <TableCell align="center">
                        {gapFromGraduationYear(candidate.yearOfPassing)}
                      </TableCell>
                      <TableCell align="center">
                        <button
                          className="rounded-md border border-orange-200 bg-orange-100 p-2 text-orange-900 hover:bg-orange-200 hover:shadow-lg"
                          onClick={() =>
                            navigate(
                              `/dashboard/candidates/edit-candidate/${candidate?.id}`,
                            )
                          }
                        >
                          <MdEdit />
                        </button>
                      </TableCell>
                      <TableCell align="center">
                        <button
                          onClick={() => handleClickOpen(candidate?.id)}
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
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <ConfirmDeleteDialog
            isConfirmDialogOpen={isConfirmDialogOpen}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            deletingId={deletingId}
            handleDelete={handleDelete}
          />

          {/* Snackbar for success and error messages */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </section>
      </main>
    </>
  );
}
