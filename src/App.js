import React, { useState } from "react";
import "./App.css";

// Login Screens
import RoleSelectionPage from "./components/RoleSelectionPage";
import StudentLogin from "./components/StudentLogin";
import OrganizerLogin from "./components/OrganizerLogin";
import AdminLogin from "./components/AdminLogin";

// Dashboards
import StudentDashboard from "./pages/student/StudentDashboard";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  const [page, setPage] = useState("role");

  const navigate = (target) => setPage(target);
  const goBack = () => setPage("role");

  return (
    <div className="App">

      {page === "role" && <RoleSelectionPage navigate={navigate} />}

      {page === "student-login" && (
        <StudentLogin navigate={navigate} goBack={goBack} />
      )}

      {page === "organizer-login" && (
        <OrganizerLogin navigate={navigate} goBack={goBack} />
      )}

      {page === "admin-login" && (
        <AdminLogin navigate={navigate} goBack={goBack} />
      )}

      {page === "student-dashboard" && <StudentDashboard goBack={goBack} />}

      {page === "organizer-dashboard" && <OrganizerDashboard goBack={goBack} />}

      {page === "admin-dashboard" && <AdminDashboard goBack={goBack} />}
    </div>
  );
}
