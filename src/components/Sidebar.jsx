// src/components/Sidebar.jsx
import React from "react";

export default function Sidebar({ page, setPage, links }) {
  const defaultLinks = [
    { id: "overview", label: "Overview", emoji: "🏠" },
    { id: "all", label: "All Events", emoji: "📋" },
    { id: "settings", label: "Settings", emoji: "⚙️" },
  ];

  const nav = links || defaultLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <nav>
        {nav.map((l) => (
          <button
            key={l.id}
            className={`sidebar-link ${page === l.id ? "active" : ""}`}
            onClick={() => setPage && setPage(l.id)}
          >
            <span>{l.emoji}</span> <span>{l.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
