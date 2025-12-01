// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

export default function AdminDashboard({ goBack }) {
  const [page, setPage] = useState("overview");

  return (
    <DashboardLayout
      page={page}
      setPage={setPage}
      goBack={goBack}
      userName="Admin"
      sidebarType="admin"
    >
      <div style={{ padding: 24 }}>
        <h2>Admin Dashboard</h2>
        <p>Manage approvals, users and reports.</p>
      </div>
    </DashboardLayout>
  );
}
