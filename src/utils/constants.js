// Format price to Indian Rupee...
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Candidates List Table Fields...
export const tableFields = [
  "Candidate Id",
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

// Offering Courses List...
export const coursesList = [
  {
    id: "1",
    courseName: "Full Stack Web Development",
    coursePrice: 45000,
  },
  {
    id: "2",
    courseName: "Data Science & ML",
    coursePrice: 55000,
  },
  {
    id: "3",
    courseName: "Frontend with React",
    coursePrice: 30000,
  },
  {
    id: "4",
    courseName: "Backend with Node.js",
    coursePrice: 35000,
  },
  {
    id: "5",
    courseName: "Java Backend",
    coursePrice: 40000,
  },
];
