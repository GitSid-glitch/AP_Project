// src/components/Topbar.jsx
import React from "react";
import "../styles/topbar.css";
import LogoutButton from "./LogoutButton";

export default function Topbar({ goBack, userName = "User" }) {
  return (
    <div className="topbar">
      {/* Back Button */}
      <button className="back-btn" onClick={goBack}>
        ⬅ Back
      </button>

      {/* Center Title */}
      <h2 className="topbar-title">Welcome, {userName}</h2>

      {/* Right Section */}
      <div className="topbar-right">
        {/* Notifications */}
        <div className="notif-icon" title="Notifications">🔔</div>

        {/* Profile Circle */}
        <div className="profile-circle" title={userName}>
          {userName.charAt(0).toUpperCase()}
        </div>

        {/* Logout - placed to the right of profile */}
        <LogoutButton className="topbar-logout-btn" />
      </div>
    </div>
  );
}
