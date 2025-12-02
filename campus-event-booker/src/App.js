import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"; 
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
  const navigate = useNavigate();
  const goBack = () => navigate("/");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RoleSelectionPage navigate={navigate} />} />
        
        <Route path="/student-login" element={<StudentLogin navigate={navigate} goBack={goBack} />} />
        <Route path="/organizer-login" element={<OrganizerLogin navigate={navigate} goBack={goBack} />} />
        <Route path="/admin-login" element={<AdminLogin goBack={goBack} />} />

        <Route path="/admin/dashboard" element={<AdminDashboard goBack={goBack} />} />
        <Route path="/student/dashboard" element={<StudentDashboard goBack={goBack} />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashboard goBack={goBack} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}