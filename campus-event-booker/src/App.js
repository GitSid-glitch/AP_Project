import React, { useState } from "react";
import "./App.css";
import RoleSelectionPage from "./components/RoleSelectionPage";
import StudentLogin from "./components/StudentLogin";
import OrganizerLogin from "./components/OrganizerLogin";
import AdminLogin from "./components/AdminLogin";

export default function App() {
  const [page, setPage] = useState("role");

  const renderPage = () => {
    if (page === "student") return <StudentLogin goBack={() => setPage("role")} />;
    if (page === "organizer") return <OrganizerLogin goBack={() => setPage("role")} />;
    if (page === "admin") return <AdminLogin goBack={() => setPage("role")} />;
    return <RoleSelectionPage navigate={setPage} />;
  };

  return <div className="App">{renderPage()}</div>;
}
