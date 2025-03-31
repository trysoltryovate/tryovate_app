import SecondaryNavbar from "../../components/SecondNavbar";

export default function AddEmployee() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <SecondaryNavbar />

      <main className="relative mx-auto mb-10 min-h-screen max-w-[1910px] py-10 lg:px-2">
        <h1 className="my-3 text-xl font-bold">Main Form (Add Employee)</h1>

        <hr />

        <form action="#" method="post" onSubmit={(e) => handleSubmit(e)}>
          <fieldset className="rounded-md border border-black p-5">
            <legend>Personal Details</legend>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                className="w-max rounded-md border-2 p-2"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="dateOfBirth">Date of birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="w-max rounded-md border-2 p-2"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label>Gender:</label>

              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="w-max rounded-md border-2 p-2"
                />
                <label htmlFor="male">Male</label>
              </div>

              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="w-max rounded-md border-2 p-2"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="number"
                id="contactNumber"
                name="contactNumber"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter phone number"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="emailId">Email:</label>
              <input
                type="email"
                id="emailId"
                name="emailID"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter email id"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="currAddress">CurrentAddress:</label>
              <input
                type="text"
                id="currAddress"
                name="currAddress"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter curr address details"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="permAddress">Permanent Address:</label>
              <input
                type="text"
                id="permAddress"
                name="permAddress"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter permanent address details"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="motherName">Mother Name:</label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter mother name"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="fatherName">Father Name:</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter father name"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="althernateNumber">Alternate Ph. Number:</label>
              <input
                type="number"
                id="althernateNumber"
                name="althernateNumber"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter alternate phone number"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="aadharNumber">Aadhar Number:</label>
              <input
                type="number"
                id="aadharNumber"
                name="aadharNumber"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter aadhar number"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="panNum">Pancard Number:</label>
              <input
                type="text"
                id="panNum"
                name="panNum"
                className="w-max rounded-md border-2 p-2"
                placeholder="Enter pan number"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="panNum">Reference Number:</label>
              <select
                name="reference"
                id="reference"
                placeholder="select reference"
                className="w-max border p-2"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          </fieldset>

          <fieldset className="rounded-md border border-black p-5">
            <legend>Educational Qualification</legend>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="highestDegree">Highest Degree Obtained:</label>
              <input
                type="text"
                id="highestDegree"
                name="highestDegree"
                placeholder="Enter degree"
                className="w-max rounded-md border-2 p-2"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="univOrCollege">University/College Name:</label>
              <input
                type="text"
                id="univOrCollege"
                name="univOrCollege"
                placeholder="Enter university name"
                className="w-max rounded-md border-2 p-2"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="yearOfPassing">Year of passing:</label>
              <input
                type="text"
                id="yearOfPassing"
                name="yearOfPassing"
                placeholder="Enter YOP"
                className="w-max rounded-md border-2 p-2"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="specializationMajor">Specialization/Major:</label>
              <input
                type="text"
                id="specializationMajor"
                name="specializationMajor"
                placeholder="Enter specializationMajor"
                className="w-max rounded-md border-2 p-2"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="specializationMajor">
                Percentage or CGPA/Major:
              </label>
              <input
                type="number"
                id="percentageOrCGPA"
                name="percentageOrCGPA"
                placeholder="Enter percentageOrCGPA"
                className="w-max rounded-md border-2 p-2"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="longMemo">Long Memo:</label>
              <input
                type="text"
                id="longMemo"
                name="longMemo"
                placeholder="Enter long memo"
                className="w-max rounded-md border-2 p-2"
              />
            </div>
          </fieldset>

          <fieldset className="rounded-md border border-black p-5">
            <legend>Offering Course</legend>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="course">Course Type:</label>
              <select
                name="course"
                id="course"
                placeholder="select course"
                className="w-max border p-2"
              >
                <option value="react">React</option>
                <option value="java">Java</option>
              </select>
            </div>
          </fieldset>

          <fieldset className="rounded-md border border-black p-5">
            <legend>Payment Structure</legend>

            <div className="mb-4 flex flex-col gap-y-1">
              <label>Payment Type:</label>

              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="full"
                  name="payment"
                  className="w-max rounded-md border-2 p-2"
                />
                <label htmlFor="full">Full</label>
              </div>

              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="partial"
                  name="payment"
                  className="w-max rounded-md border-2 p-2"
                />
                <label htmlFor="partial">Partial</label>
              </div>
            </div>
          </fieldset>

          <button className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 hover:shadow-md">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}

import axios from "axios";
import { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    currentAddress: "",
    permanentAddress: "",
    motherName: "",
    fatherName: "",
    alternateNumber: "",
    aadharCard: "",
    panCard: "",
    reference: "",
    highestDegree: "",
    universityCollegeName: "",
    yearOfPassing: "",
    specializationMajor: "",
    percentageCgpa: "",
    longMemo: "",
    selectedCourse: "",
    paymentType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_ADD_EMPLOYEE_API_URL,
        formData,
      );
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">User Details Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="currentAddress"
          placeholder="Current Address"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="permanentAddress"
          placeholder="Permanent Address"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="motherName"
          placeholder="Mother Name"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="fatherName"
          placeholder="Father Name"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="alternateNumber"
          placeholder="Alternate Number"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="aadharCard"
          placeholder="Aadhar Card"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="panCard"
          placeholder="Pan Card"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="reference"
          placeholder="Reference Name"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="highestDegree"
          placeholder="Highest Degree"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="universityCollegeName"
          placeholder="University/College Name"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          type="number"
          name="yearOfPassing"
          placeholder="Year of Passing"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="specializationMajor"
          placeholder="Specialization/Major"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          type="number"
          step="0.01"
          name="percentageCgpa"
          placeholder="Percentage/CGPA"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="longMemo"
          placeholder="Long Memo"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="selectedCourse"
          placeholder="Selected Course"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <input
          name="paymentType"
          placeholder="Payment Type"
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// export default FormComponent;
