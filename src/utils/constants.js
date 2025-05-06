export function gapFromGraduationYear(graduationYear) {
  const currentYear = new Date().getFullYear();
  const gap = currentYear - graduationYear;
  return `${gap}`;
}

// Example usage
// const gap = gapFromGraduationYear(2018);
// console.log(gap); // Output (in 2025): "7 years"

// Format price to Indian Rupee...
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Candidates List Table Fields...
export const tableFields = [
  "Select Candidate",
  "Candidate Id",
  "Candidate Name",
  "Date Of Birth",
  "Phone No",
  "Email",
  "Graduation",
  "Year Of Passing",
  "Post Graduation",
  "Year Of Passing",
  "Course",
  "Batch Id",
  "Year Gap",
  "Edit",
  "Delete",
];

// Offering Courses List...
export const coursesListWithFullPayment = [
  {
    id: "1",
    courseName: "Advanced Generative AI Program",
    coursePrice: 99000,
  },
  {
    id: "2",
    courseName: "Data Science (Data Analytics + AI / ML / DL)",
    coursePrice: 80000,
  },
  {
    id: "3",
    courseName: "Data Analytics (Python + SQL + Power BI + Excel)",
    coursePrice: 50000,
  },
  {
    id: "4",
    courseName: "Data Engineer (Azure/GCP/AWS/DevOps)",
    coursePrice: 60000,
  },
  {
    id: "5",
    courseName: ".Net (Backend) with Angular (FS)",
    coursePrice: 60000,
  },
  {
    id: "6",
    courseName: "React JS - Front End",
    coursePrice: 40000,
  },
  {
    id: "7",
    courseName: "JAVA FS (Java Backend + React JS + AWS)",
    coursePrice: 60000,
  },
  {
    id: "8",
    courseName: "Java Backend",
    coursePrice: 40000,
  },
];

export const singlePaymentList = [
  { id: "1", courseName: "Java Backend", amount: 35000 },
  {
    id: "2",
    courseName: "JAVA FS (Java Backend + React Js + AWS)",
    amount: 50000,
  },
  { id: "3", courseName: "React JS - Front End", amount: 35000 },
  { id: "4", courseName: ".Net (Backend) with Angular (FS)", amount: 50000 },
  {
    id: "5",
    courseName: "Data Engineer – (Azure/GCP/AWS/DevOps)",
    amount: 45000,
  },
  {
    id: "6",
    courseName: "Data Analytics (Python + SQL + Power BI + Excel)",
    amount: 45000,
  },
  {
    id: "7",
    courseName: "Data Science (Data Analytics + AI / ML / DL)",
    amount: 65000,
  },
  { id: "8", courseName: "Advanced Generative AI Program", amount: 85000 },
];

export const twoTermsPaymentList = [
  { id: "1", courseName: "Java Backend", amount: 45000 },
  {
    id: "2",
    courseName: "JAVA FS (Java Backend + React Js + AWS)",
    amount: 60000,
  },
  { id: "3", courseName: "React JS - Front End", amount: 45000 },
  { id: "4", courseName: ".Net (Backend) with Angular (FS)", amount: 60000 },
  {
    id: "5",
    courseName: "Data Engineer – (Azure/GCP/AWS/DevOps)",
    amount: 55000,
  },
  {
    id: "6",
    courseName: "Data Analytics (Python + SQL + Power BI + Excel)",
    amount: 55000,
  },
  {
    id: "7",
    courseName: "Data Science (Data Analytics + AI / ML / DL)",
    amount: 75000,
  },
  { id: "8", courseName: "Advanced Generative AI Program", amount: 95000 },
];
