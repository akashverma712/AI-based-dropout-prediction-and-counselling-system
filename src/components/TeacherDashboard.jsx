import { useState } from "react";
import TeacherProfile from "./TeacherProfile";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TeacherDashboard() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const sectionOptions = [
    { value: "A", label: "Section A" },
    { value: "B", label: "Section B" },
    { value: "C", label: "Section C" },
  ];

  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
  ];

  const students = [
    { regNo: "2025A01", name: "Rimisha Kumari", section: "A", year: "2", attendance: 92, assessment: 88 },
    { regNo: "2025A02", name: "Divya Raj", section: "A", year: "2", attendance: 75, assessment: 70 },
    { regNo: "2025A03", name: "Niraj Prajapati", section: "A", year: "2", attendance: 55, assessment: 50 },
    { regNo: "2025A04", name: "Akash Verma", section: "A", year: "2", attendance: 82, assessment: 77 },
    { regNo: "2025A05", name: "Praveen Chaurasiya", section: "A", year: "2", attendance: 65, assessment: 58 },
    { regNo: "2025A06", name: "Prince Kumar", section: "A", year: "2", attendance: 95, assessment: 90 },
  ];

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    if (student.attendance < 60 && student.assessment < 60) {
      toast.warn("⚠️ Mentor session recommended for " + student.name, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.success("✅ Student selected: " + student.name, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Teacher Profile */}
      <TeacherProfile />

      {/* Dropdown Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          options={sectionOptions}
          placeholder="Select Section"
          onChange={(val) => setSelectedSection(val)}
          className="shadow"
        />
        <Select
          options={yearOptions}
          placeholder="Select Year"
          onChange={(val) => setSelectedYear(val)}
          className="shadow"
        />
      </div>

      {/* Student List */}
      <StudentList students={students} onSelect={handleStudentClick} />

      {/* Student Details */}
      {selectedStudent && <StudentDetails student={selectedStudent} />}

      <ToastContainer />
    </div>
  );
}
