// import React, { useState } from "react";
// import "./App.css";

// // Login Screens
// import RoleSelectionPage from "./components/RoleSelectionPage";
// import StudentLogin from "./components/StudentLogin";
// import OrganizerLogin from "./components/OrganizerLogin";
// import AdminLogin from "./components/AdminLogin";

// // Dashboards
// import StudentDashboard from './pages/student/StudentDashboard';
// import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';

// export default function App() {
//   const [page, setPage] = useState("role");

//   const navigate = (target) => setPage(target);
//   const goBack = () => setPage("role");

//   return (
//     <div className="App">
//       {page === "role" && <RoleSelectionPage navigate={navigate} />}

//       {page === "student-login" && (
//         <StudentLogin navigate={navigate} goBack={goBack} />
//       )}

//       {page === "organizer-login" && (
//         <OrganizerLogin navigate={navigate} goBack={goBack} />
//       )}

//       {page === "admin-login" && (
//         <AdminLogin navigate={navigate} goBack={goBack} />
//       )}

//       {page === "student-dashboard" && <StudentDashboard goBack={goBack} />}

//       {page === "organizer-dashboard" && <OrganizerDashboard goBack={goBack} />}

//       {page === "admin-dashboard" && <AdminDashboard goBack={goBack} />}
//     </div>
//   );
// }
import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"; // Change 1: Import Router tools
import "./App.css";

// Login Screens
import RoleSelectionPage from "./components/RoleSelectionPage";
import StudentLogin from "./components/StudentLogin";
import OrganizerLogin from "./components/OrganizerLogin";
import AdminLogin from "./components/AdminLogin";

// Dashboards
import StudentDashboard from './pages/student/StudentDashboard';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  // Change 2: Instead of 'page' state, we use the Router's hook
  const navigate = useNavigate();

  // Helper function to simulate the old "goBack" behavior
  const goBack = () => navigate("/");

  return (
    <div className="App">
      <Routes>
        {/* 1. The Home Page (Role Selection) */}
        {/* We pass 'navigate' so your old buttons still work */}
        <Route path="/" element={<RoleSelectionPage navigate={navigate} />} />

        {/* 2. Login Routes */}
        {/* Note: AdminLogin doesn't need 'navigate' prop anymore, it has its own */}
        <Route path="/student-login" element={<StudentLogin navigate={navigate} goBack={goBack} />} />
        <Route path="/organizer-login" element={<OrganizerLogin navigate={navigate} goBack={goBack} />} />
        <Route path="/admin-login" element={<AdminLogin goBack={goBack} />} />

        {/* 3. Dashboard Routes */}
        {/* These URLs match exactly what you wrote in AdminLogin.jsx */}
        <Route path="/admin/dashboard" element={<AdminDashboard goBack={goBack} />} />
        <Route path="/student/dashboard" element={<StudentDashboard goBack={goBack} />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashboard goBack={goBack} />} />

        {/* 4. Fallback: If URL is random, go to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}