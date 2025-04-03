import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  "Personal Details",
  "Educational Qualification",
  "Offering Course",
  "Payment Structure",
];

export default function EditCandForm({ candidate }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState(candidate);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_UPDATE_EMPLOYEE_API_URL}/${candidate?.id}`,
        formData,
      );

      if (response?.status === 200) {
        navigate("/dashboard/candidates");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
          <FormControl margin="normal">
            <FormLabel sx={{ marginBottom: "10px" }}>
              Offering Course:
            </FormLabel>
            <Select
              name="selectedCourse"
              value={formData.selectedCourse}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select a course
              </MenuItem>
              <MenuItem value="Java Backend">Java Backend</MenuItem>
              <MenuItem value="JAVA FS">JAVA FS</MenuItem>
              <MenuItem value="ReactJS">ReactJS</MenuItem>
              <MenuItem value=".Net with Angular (FS)">
                .Net with Angular (FS)
              </MenuItem>
              <MenuItem value="Data Analytics">Data Analytics</MenuItem>
              <MenuItem value="Data Engineer">Data Engineer</MenuItem>
            </Select>
          </FormControl>
        );
      case 3:
        return (
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
        );
      default:
        return null;
    }
  };

  return (
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
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        <Button onClick={handleNext} variant="contained">
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
