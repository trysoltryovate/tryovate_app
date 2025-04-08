import {
  Alert,
  Checkbox,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { coursesList, formatPrice } from "../utils/constants";

const steps = [
  "Personal Details",
  "Educational Qualification",
  "Offering Course",
  "Payment",
];

export default function EditCandForm({ candidate, candidateId }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState(candidate);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  React.useEffect(() => {
    let total = calculateTotalPrice();
    const partial = parseFloat(formData.partialPaidAmount) || 0;
    const remaining = total - partial;

    if (formData.paymentMode === "Online") {
      total = calculateTotalPrice() * 0.18 + total;
    }

    setFormData((prev) => ({
      ...prev,
      totalPayableAmount: total,
      remainingAmount: remaining,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.selectedCourse,
    formData.partialPaidAmount,
    formData.paymentMode,
  ]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const navigate = useNavigate();

  const handlePartialAmtChange = (e) => {
    const partial = parseFloat(e.target.value);

    setFormData((prev) => {
      const remaining = prev.totalPayableAmount - partial;
      return {
        ...prev,
        partialPaidAmount: partial,
        remainingAmount: remaining,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_UPDATE_CANDIDATE_API_URL}/${candidateId}`,
        formData,
      );

      if (response?.status === 200) {
        setTimeout(() => {
          navigate("/dashboard/candidates");
        }, 800);
        setSnackbar({
          open: true,
          message: "Candidate updated successfully!",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setSnackbar({
        open: true,
        message: error?.message,
        severity: "error",
      });
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const calculateTotalPrice = () => {
    const selectedCourses = formData.selectedCourse;
    let total = 0;

    selectedCourses &&
      selectedCourses.forEach((courseName) => {
        const course = coursesList.find(
          (course) => course.courseName === courseName,
        );
        if (course) {
          total += course.coursePrice;
        }
      });

    return total;
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prev) => {
      const selected = prev.selectedCourse || [];
      const updatedSelected = checked
        ? [...selected, value]
        : selected.filter((item) => item !== value);

      const newTotal = updatedSelected.reduce((acc, courseName) => {
        const course = coursesList.find((c) => c.courseName === courseName);
        return acc + (course?.coursePrice || 0);
      }, 0);

      const partial = parseFloat(prev.partialPaidAmount) || 0;
      const remaining = newTotal - partial;

      return {
        ...prev,
        selectedCourse: updatedSelected,
        totalPayableAmount: newTotal,
        remainingAmount: remaining > 0 ? remaining : 0,
      };
    });
  };

  const renderFormFields = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              margin="dense"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl margin="dense">
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Current Address"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Permanent Address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Mother Name"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Father Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Alternative Number"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Aadhar Card"
              name="aadharCard"
              value={formData.aadharCard}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Pan Card"
              name="panCard"
              value={formData.panCard}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              margin="dense"
            />
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
            <TextField
              label="Highest Degree"
              name="highestDegree"
              value={formData.highestDegree}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="University/College Name"
              name="universityCollegeName"
              value={formData.universityCollegeName}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Year of Passing"
              name="yearOfPassing"
              type="number"
              value={formData.yearOfPassing}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Specialization/Major"
              name="specializationMajor"
              value={formData.specializationMajor}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Percentage/CGPA"
              name="percentageCgpa"
              type="number"
              value={formData.percentageCgpa}
              onChange={handleChange}
              margin="dense"
            />
          </div>
        );
      case 2:
        return (
          <div className="grid w-full grid-cols-1 gap-3 md:gap-5 lg:grid-cols-2">
            <div className="flex w-full flex-col items-start justify-start gap-3 rounded-xl border border-gray-300 p-3 md:gap-4">
              <FormControl margin="normal" className="w-full">
                <FormLabel sx={{ marginBottom: "10px", color: "black" }}>
                  Offering Course:
                </FormLabel>

                <section className="w-full">
                  <TableContainer
                    component={Paper}
                    sx={{ borderRadius: "8px", width: "100%" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow className="bg-gray-100">
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: "bold",
                              border: "1px solid #ddd",
                            }}
                          >
                            Select Course
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: "bold",
                              border: "1px solid #ddd",
                            }}
                          >
                            Course Name
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: "bold",
                              border: "1px solid #ddd",
                            }}
                          >
                            Course Price
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {coursesList.map((course, index) => (
                          <TableRow
                            key={course.id}
                            sx={{
                              backgroundColor:
                                index % 2 === 0 ? "#f9f9f9" : "#fff",
                              "&:hover": {
                                backgroundColor: "#e3f2fd",
                              },
                            }}
                          >
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "1px solid #ddd",
                              }}
                            >
                              <FormControlLabel
                                key={course?.id}
                                control={
                                  <Checkbox
                                    value={course?.courseName}
                                    checked={formData.selectedCourse?.includes(
                                      course?.courseName,
                                    )}
                                    onChange={handleCheckboxChange}
                                  />
                                }
                              />
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "1px solid #ddd",
                              }}
                            >
                              {course?.courseName}
                            </TableCell>
                            <TableCell align="center">
                              Rs. {formatPrice(course?.coursePrice)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </section>
              </FormControl>

              {formData?.selectedCourse?.length > 0 && (
                <div className="flex flex-col gap-y-1">
                  <FormControl margin="dense">
                    <FormLabel>Payment Structure</FormLabel>
                    <RadioGroup
                      row
                      name="paymentType"
                      value={formData.paymentType}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Full Payment"
                        control={<Radio />}
                        label="Full Payment"
                      />
                      <FormControlLabel
                        value="Partial Payment"
                        control={<Radio />}
                        label="Partial Payment"
                      />
                    </RadioGroup>
                  </FormControl>

                  {formData?.paymentType === "Partial Payment" && (
                    <TextField
                      label="Partial Amount To Be Paid"
                      name="partialPaidAmount"
                      type="number"
                      value={formData?.partialPaidAmount}
                      onChange={(e) => handlePartialAmtChange(e)}
                      margin="dense"
                    />
                  )}

                  {formData?.paymentType && (
                    <FormControl margin="dense">
                      <FormLabel>Payment Mode</FormLabel>
                      <RadioGroup
                        row
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="Online"
                          control={<Radio />}
                          label="Online"
                        />
                        <FormControlLabel
                          value="Cash"
                          control={<Radio />}
                          label="Cash"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                </div>
              )}
            </div>
            {/* Checkout Details */}
            <div className="h-auto w-full rounded-xl border border-gray-300 bg-gray-100 p-3 md:p-4 lg:p-5">
              <h5 className="text-lg font-semibold md:text-xl">Summary</h5>

              <div className="mt-3 flex w-full flex-col items-start justify-center gap-y-2 md:mt-5">
                <span className="inline-flex w-full items-center justify-between">
                  <small className="font-medium opacity-75">
                    Courses Selected:
                  </small>
                  <p className="text-sm">{formData?.selectedCourse?.length}</p>
                </span>
                <span className="inline-flex w-full items-center justify-between">
                  <small className="font-medium opacity-75">
                    Payment Structure:
                  </small>
                  <p className="text-sm">
                    {formData?.paymentType ? formData?.paymentType : "-/-"}
                  </p>
                </span>
                <span className="inline-flex w-full items-center justify-between">
                  <small className="font-medium opacity-75">
                    Mode of payment:
                  </small>
                  <p className="text-sm">
                    {formData?.paymentMode ? formData?.paymentMode : "-/-"}
                  </p>
                </span>
                <span className="inline-flex w-full items-center justify-between">
                  <small className="font-medium opacity-75">GST:</small>
                  <p className="text-sm">
                    {formData?.paymentMode === "Online" ? "18%" : "NA"}
                  </p>
                </span>

                <div className="inline-flex w-full items-center justify-between">
                  <p className="text-md font-semibold">Price:</p>

                  <strong>Rs. {formatPrice(calculateTotalPrice())}</strong>
                </div>

                <div className="inline-flex w-full items-center justify-between">
                  <p className="text-md font-semibold">Remaining Amount:</p>

                  <strong
                    className={`${formData.paymentType === "Partial Payment" ? "text-red-500" : "text-gray-500"}`}
                  >
                    {formData.paymentType === "Partial Payment"
                      ? `Rs. ${formatPrice(formData?.remainingAmount)}`
                      : "NA"}
                  </strong>
                </div>

                <div className="h-[2px] w-full bg-gray-500" aria-hidden></div>

                <div className="mt-2 inline-flex w-full items-center justify-between">
                  <p className="text-xl font-semibold md:text-3xl lg:text-4xl">
                    Subtotal:
                  </p>

                  <strong className="text-2xl md:text-3xl">
                    <small>Rs.</small>{" "}
                    {formData?.paymentMode === "Online"
                      ? formatPrice(
                          calculateTotalPrice() * 0.18 + calculateTotalPrice(),
                        )
                      : formatPrice(calculateTotalPrice())}
                  </strong>
                </div>

                <div
                  onClick={handleNext}
                  className="mt-3 flex w-full cursor-pointer items-center justify-between rounded-lg bg-blue-600 p-3 py-10 text-white shadow-lg transition-colors duration-200 ease-in hover:bg-blue-500 md:px-4"
                >
                  <p className="text-lg font-semibold md:text-xl">
                    Proceed to Payment
                  </p>

                  <span className="block w-max rounded-full bg-white p-2 text-xl text-black">
                    <IoMdArrowRoundForward />
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex w-full items-center justify-center p-2 md:p-4 lg:p-6">
            <button
              className="rounded-lg border border-green-500 bg-green-200 px-4 py-2 text-green-800"
              onClick={handleNext}
            >
              Update Candidate
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full p-3 md:p-3 lg:p-4">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} sx={{ marginBottom: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderFormFields()}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            sx={{ display: activeStep === 2 ? "none" : "block" }}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>

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
      </Box>
    </section>
  );
}
