import React from "react";
import "../../styles/sidebar.css";

export default function StudentSidebar({ setPage }) {
  return (
    <div className="role-sidebar">

      <h2 className="sidebar-heading">Student Menu</h2>

      <div className="sidebar-links">
        <button className="sidebar-btn" onClick={() => setPage("overview")}>
          🏠 Overview
        </button>

        <button className="sidebar-btn" onClick={() => setPage("explore")}>
          🔍 Explore Events
        </button>

        <button className="sidebar-btn" onClick={() => setPage("myregistrations")}>
          📝 My Registrations
        </button>

        <button className="sidebar-btn" onClick={() => setPage("upcoming")}>
          📅 Upcoming Events
        </button>

        <button className="sidebar-btn" onClick={() => setPage("settings")}>
          ⚙️ Settings
        </button>
      </div>

    </div>
  );
}
