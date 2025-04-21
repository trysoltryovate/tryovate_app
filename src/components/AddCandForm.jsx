import "jspdf-autotable";

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { jsPDF } from "jspdf";
import * as React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/tryovate_logo_darkMode2.png";
import { coursesList, formatPrice } from "../utils/constants";

const steps = [
  "Personal Details",
  "Educational Qualification",
  "Offering Course",
  "Payment",
];

export default function AddCandForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [hasPostGraduation, setHasPostGraduation] = React.useState("");
  const [formData, setFormData] = React.useState({
    fullName: "krunal",
    dob: "1998-01-03",
    gender: "Male",
    contactNumber: "1364567890",
    email: "krunal@example.com",
    currentAddress: "123 Main St, City",
    permanentAddress: "456 Elm St, Hometown",
    motherName: "Jane Doe",
    fatherName: "Richard Doe",
    alternateNumber: "0987654321",
    aadharCard: "123456789101",
    panCard: "ABCDE1234F",
    reference: "Friend",
    degree: "Degree",
    universityCollegeName: "SVIT",
    yearOfPassing: 2020,
    specializationMajor: "BSC",
    percentageCgpa: 6.8,
    highestDegree: "PG",
    pgUniversityCollegeName: "JNTU",
    pgYearOfPassing: 2022,
    pgSpecializationMajor: "Computer",
    pgPercentageCgpa: 6.8,
    longMemo: "Available",
    selectedCourse: [],
    batchId: "",
    paymentType: "",
    paymentMode: "",
    partialPaidAmount: 0,
    totalPayableAmount: 0,
    remainingAmount: "",
  });

  const [errors, setErrors] = React.useState({
    contactNumber: "",
    alternateNumber: "",
    email: "",
    aadharCard: "",
    panCard: "",
  });

  const handleBatchId = (event) => {
    setFormData((prev) => {
      return { ...prev, batchId: event.target.value };
    });
  };

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  //console.log(formData);

  React.useEffect(() => {
    let total = calculateTotalPrice();
    const partial = parseFloat(formData.partialPaidAmount) || 0;

    // Add GST if payment mode is Online
    if (formData.paymentMode === "Online") {
      total += total * 0.18; // Correctly add GST to the total
    }

    // Set remaining amount based on payment type
    const remaining =
      formData.paymentType === "Full Payment" ? 0 : total - partial;

    setFormData((prev) => ({
      ...prev,
      totalPayableAmount: total,
      remainingAmount: remaining,
    }));
  }, [
    formData.selectedCourse,
    formData.partialPaidAmount,
    formData.paymentMode,
    formData.paymentType, // Ensure this is included
  ]);

  const downloadSummaryAsPDF = () => {
    const doc = new jsPDF();
    const startX = 20;
    let startY = 20;
    const lineHeight = 10;
    const logoWidth = 50; // Adjust as needed
    const logoHeight = 40; // Adjust as needed

    // Add blue background
    doc.setFillColor(6, 34, 110); // Blue Color
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F"); // Background Rectangle

    // Add Logo
    doc.addImage(
      Logo,
      "PNG",
      (doc.internal.pageSize.getWidth() - logoWidth) / 2,
      -5,
      logoWidth,
      logoHeight,
    ); // Centered Logo

    const selectedCourses =
      formData.selectedCourse.length > 0
        ? formData.selectedCourse.join(", ")
        : "None";

    const price = calculateTotalPrice();
    const gstIncluded = formData.paymentMode === "Online";
    const subtotal = gstIncluded ? price + price * 0.18 : price;

    const isPartial = formData.paymentType === "Partial Payment";

    const data = [
      ["Courses Selected", selectedCourses],
      ["Payment Structure", formData.paymentType],
      ["Mode of Payment", formData.paymentMode || "-/-"],
      ["GST", gstIncluded ? "18%" : "NA"],
      ["Price", `Rs. ${formatPrice(price)}`],
    ];

    if (isPartial) {
      data.push([
        "Paid Amount",
        `Rs. ${formatPrice(formData.partialPaidAmount || 0)}`,
      ]);
      data.push([
        "Remaining Amount",
        `Rs. ${formatPrice(formData.remainingAmount || 0)}`,
      ]);
    }

    data.push(["Subtotal", `Rs. ${formatPrice(subtotal)}`]);

    // Header
    startY += 30; // Move down after the logo and background
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Description", startX, startY);
    doc.text("Details", startX + 90, startY);
    doc.setFont("helvetica", "normal");

    startY += 5;
    doc.line(startX, startY, startX + 170, startY);
    startY += 8;

    data.forEach(([desc, detail]) => {
      if (desc === "Subtotal") {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
      } else if (desc === "Remaining Amount") {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(255, 0, 0); // Red
      } else {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
      }

      const detailLines = doc.splitTextToSize(detail.toString(), 90);
      doc.text(desc.toString(), startX, startY);
      doc.text(detailLines, startX + 90, startY);
      startY += detailLines.length * lineHeight;
    });
    startY += -2;
    doc.line(startX, startY, startX + 170, startY);
    startY += 2;
    // Add Contact Information
    startY += 8; // Add some space before the contact info
    doc.setFont("helvetica", "bold");
    doc.text("Our Address", startX, startY);
    startY += lineHeight; // Move down after the header
    doc.setFont("helvetica", "normal");
    const address =
      "6th floor, 2-48/5/6, Vaishnavi's Cynosure, Gachibowli Rd, Opp. RTTC, Telecom Nagar Extension, Gachibowli, Hyderabad, Telangana 500032";
    const email = "E-mail: info@tryovate.com";
    const mobile = "Mobile: +91 99083 87005";
    const phone = "Phone: +91 8247430735";
    const hours = "Hours of Operation: Monday - Friday: 09.00 - 18.00";

    const contactInfo = [address, email, mobile, phone, hours];
    contactInfo.forEach((line) => {
      const contactLines = doc.splitTextToSize(line, 170);
      doc.text(contactLines, startX, startY);
      startY += contactLines.length * lineHeight;
    });

    doc.save("summary.pdf");
  };

  //====================validation===========================

  const validateFields = (formData) => {
    const newErrors = {};

    // Contact Number - must be 10 digits and start with 6-9
    if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) {
      newErrors.contactNumber =
        "Contact number must start with 6-9 and be 10 digits";
    }

    // Alternate Number - optional, must also start with 6-9 and be 10 digits
    if (
      formData.alternateNumber &&
      !/^[6-9]\d{9}$/.test(formData.alternateNumber)
    ) {
      newErrors.alternateNumber =
        "Alternate number must start with 6-9 and be 10 digits";
    }

    // Email - basic regex check
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Aadhar Card - must be exactly 12 digits
    if (!/^\d{12}$/.test(formData.aadharCard)) {
      newErrors.aadharCard = "Aadhar card must be 12 digits";
    }

    // PAN Card - must match format: 5 letters, 4 digits, 1 letter
    const pan = formData.panCard?.toUpperCase() || "";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
      newErrors.panCard = "Invalid PAN card format (e.g., ABCDE1234F)";
    }

    // Update formData with uppercase PAN
    setFormData((prev) => ({
      ...prev,
      panCard: pan,
    }));

    // Set error messages
    setErrors({
      contactNumber: newErrors.contactNumber || "",
      alternateNumber: newErrors.alternateNumber || "",
      email: newErrors.email || "",
      aadharCard: newErrors.aadharCard || "",
      panCard: newErrors.panCard || "",
    });

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Final validation before submit
    const isValid = validateFields(formData);

    if (!isValid) return; // Prevent submission if any field is invalid
    try {
      // Calculate the total amount based on selected courses
      let totalAmount = calculateTotalPrice();

      // If payment mode is Online, add GST
      if (formData.paymentMode === "Online") {
        totalAmount += totalAmount * 0.18; // Adding 18% GST
      }

      // Prepare the data to submit
      const dataToSubmit = {
        ...formData,
        totalPayableAmount: totalAmount, // Ensure totalPayableAmount includes GST
        remainingAmount:
          formData.paymentType === "Full Payment"
            ? 0
            : totalAmount - (formData.partialPaidAmount || 0), // Calculate remaining amount
      };

      const response = await axios.post(
        import.meta.env.VITE_ADD_CANDIDATE_API_URL,
        dataToSubmit,
      );

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/dashboard/candidates");
        }, 800);
        setSnackbar({
          open: true,
          message: "Candidate Added Successfully!",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        //message: "Something went wrong!",
        message: error.response.data.statusMsg,
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const navigate = useNavigate();

  const handlePartialAmtChange = (e) => {
    const partial = parseFloat(e.target.value);

    setFormData((prev) => {
      let total = calculateTotalPrice();

      // Add GST if payment mode is Online
      if (prev.paymentMode === "Online") {
        total += total * 0.18; // Correctly add GST to the total
      }

      const remaining = total - partial;

      return {
        ...prev,
        partialPaidAmount: partial,
        remainingAmount: remaining,
      };
    });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Validate Contact Number and Alternate Number (only numbers, max length 10)
    if (name === "contactNumber" || name === "alternateNumber") {
      updatedValue = updatedValue.replace(/\D/g, ""); // Remove non-numeric characters
      if (updatedValue.length > 10) return; // Prevent more than 10 digits
    }

    // Convert to uppercase for PAN card
    if (name === "panCard") {
      updatedValue = updatedValue.toUpperCase();
    }

    // Update formData with the new value
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    // Validate fields after updating
    validateFields({
      ...formData,
      [name]: updatedValue,
    });
  };

  const calculateTotalPrice = () => {
    const selectedCourses = formData.selectedCourse;
    let total = 0;

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

      const partial = parseFloat(prev.partialPaidAmount);
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
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="dense"
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.alternateNumber}
              helperText={errors.alternateNumber}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              label="Aadhar Card"
              name="aadharCard"
              value={formData.aadharCard}
              onChange={handleChange}
              margin="dense"
              error={!!errors.aadharCard}
              helperText={errors.aadharCard}
              inputProps={{ maxLength: 12 }}
            />
            <TextField
              label="Pan Card"
              name="panCard"
              value={formData.panCard}
              onChange={handleChange}
              margin="dense"
              error={!!errors.panCard}
              helperText={errors.panCard}
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
          <div>
            <h1 className="text-2xl font-semibold">Graduation</h1>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
              <TextField
                label=" Degree"
                name="degree"
                value={formData.degree}
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
            <h1 className="mt-4 text-xl font-semibold">Post Graduation</h1>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
              <TextField
                label="Highest Degree"
                name="highestDegree"
                value={formData.highestDegree}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                label=" PG University/College Name"
                name="pgUniversityCollegeName"
                value={formData.pgUniversityCollegeName}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                label=" PG Year of Passing"
                name="pgYearOfPassing"
                type="number"
                value={formData.pgYearOfPassing}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                label=" PG Specialization/Major"
                name="pgSpecializationMajor"
                value={formData.pgSpecializationMajor}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                label="PG Percentage/CGPA"
                name="pgPercentageCgpa"
                type="number"
                value={formData.pgPercentageCgpa}
                onChange={handleChange}
                margin="dense"
              />
            </div>
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
                                    checked={formData.selectedCourse.includes(
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

              {formData?.selectedCourse.length > 0 && (
                <div className="flex flex-col gap-y-1">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Batch Id
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.batchId}
                        label="Batch Id"
                        onChange={handleBatchId}
                      >
                        <MenuItem value="A1">A1</MenuItem>
                        <MenuItem value="B1">B1</MenuItem>
                        <MenuItem value="C1">C1</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
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
                      onWheel={(e) => e.target.blur()}
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
              {/* Header Row with Flexbox */}
              <div className="mb-2 flex items-center justify-between">
                <h5 className="text-lg font-semibold md:text-xl">Summary</h5>
                <Button
                  onClick={downloadSummaryAsPDF}
                  variant="contained"
                  color="primary"
                >
                  Print Summary
                </Button>
              </div>

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
                    className={`${
                      formData.paymentType === "Partial Payment"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {formData.paymentType === "Full Payment"
                      ? "Rs. 0"
                      : `Rs. ${formatPrice(formData.remainingAmount)}`}
                  </strong>
                </div>

                <div className="h-[2px] w-full bg-gray-500" aria-hidden></div>

                <div className="mt-2 inline-flex w-full items-center justify-between">
                  <p className="text-xl font-semibold md:text-3xl lg:text-4xl">
                    Subtotal:
                  </p>
                  <strong className="text-2xl md:text-3xl">
                    <small>Rs.</small>{" "}
                    {formatPrice(
                      formData?.paymentMode === "Online"
                        ? calculateTotalPrice() + calculateTotalPrice() * 0.18
                        : calculateTotalPrice(),
                    )}
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
              Add Candidate
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
