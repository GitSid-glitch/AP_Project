// src/components/StudentSidebar.jsx
import React from "react";

export default function StudentSidebar({ page, setPage, links }) {
  // Default links if none passed
  const defaultLinks = [
    { id: "overview", label: "Overview", emoji: "🏠" },
    { id: "explore", label: "Explore Events", emoji: "🔍" },
    { id: "myregistrations", label: "My Registrations", emoji: "📝" },
    { id: "upcoming", label: "Upcoming Events", emoji: "📅" },
    { id: "settings", label: "Settings", emoji: "⚙️" },
  ];

  const nav = links || defaultLinks;

  return (
    <aside className="student-sidebar">
      <div className="student-sidebar-header">
        <h3>Student Menu</h3>
      </div>

      <nav className="student-links">
        {nav.map((l) => (
          <button
            key={l.id}
            className={`student-link ${page === l.id ? "active" : ""}`}
            onClick={() => setPage(l.id)}
          >
            <span className="emoji">{l.emoji}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
