import React from "react";
import "../styles/topbar.css";

export default function Topbar({ goBack, userName }) {
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
        <div className="notif-icon">🔔</div>

        {/* Profile Circle */}
        <div className="profile-circle">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
