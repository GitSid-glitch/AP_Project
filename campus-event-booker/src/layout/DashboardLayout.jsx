// src/layout/DashboardLayout.jsx
import React from "react";
import "../styles/dashboard.css";
import "../styles/sidebar.css";
import "../styles/topbar.css";

// Use existing Sidebar (generic) and specific student sidebar
import Sidebar from "../components/Sidebar";
import StudentSidebar from "../components/StudentSidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children,
  page,
  setPage,
  goBack,
  userName = "User",
  sidebarType = "student",
  links = null,
}) {
  const SidebarToUse = sidebarType === "student" ? StudentSidebar : Sidebar;

  return (
    <div className="dashboard-root">
      <div className="dashboard-left">
        <SidebarToUse page={page} setPage={setPage} links={links} />
      </div>

      <div className="dashboard-main">
        <Topbar userName={userName} goBack={goBack} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
