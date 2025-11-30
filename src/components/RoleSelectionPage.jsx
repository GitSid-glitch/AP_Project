import React from "react";
import "../styles/home.css";

export default function RoleSelectionPage({ navigate }) {
  const roles = [
    { id: "student-login", label: "Student", emoji: "🎓" },
    { id: "organizer-login", label: "Organizer", emoji: "📣" },
    { id: "admin-login", label: "Admin", emoji: "🛠️" },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Choose Your Role</h1>

      <div className="role-grid">
        {roles.map((role) => (
          <div
            key={role.id}
            className="role-card"
            onClick={() => navigate(role.id)}
          >
            <span className="role-emoji">{role.emoji}</span>
            <span className="role-label">{role.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
