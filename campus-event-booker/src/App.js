import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<RoleSelectionPage />} />

          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/organizer/login" element={<OrganizerLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  );
}
