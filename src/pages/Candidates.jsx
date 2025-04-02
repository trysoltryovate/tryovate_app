import {
  Alert,
  Breadcrumbs,
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
import { FaCircleInfo } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

import { dummyData } from "../utils/placeholders";

export default function Candidates() {
  const tableFields = [
    "Id",
    "Candidate Name",
    "Date Of Birth",
    "Phone No",
    "Email",
    "Qualification",
    "Year Of Passing",
    "Course",
    "Edit",
    "Delete",
  ];

  return (
    <>
      <main className="lg-ctr relative min-h-screen w-full">
        <section className="p-2 md:p-3 lg:p-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/dashboard/home">
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
                <TableRow className="bg-green-100">
                  {tableFields.map((field, index) => (
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
                {dummyData.map((candidate, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                      "&:hover": {
                        backgroundColor: "#e3f2fd",
                      },
                    }}
                  >
                    <TableCell align="center" className="border-x">
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
                      <button className="rounded-md border border-red-200 bg-red-100 p-2 text-red-900 hover:bg-red-200 hover:shadow-lg">
                        <RiDeleteBin5Line />
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
