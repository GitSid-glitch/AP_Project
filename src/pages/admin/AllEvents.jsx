import React from "react";

export default function AllEvents() {
  const events = [
    { id: 1, title: "Tech Fest 2025" },
    { id: 2, title: "Music Night" },
  ];

  return (
    <div style={{ color: "white" }}>
      <h1>📅 All Events</h1>

      {events.map((e) => (
        <div key={e.id} style={{ marginTop: "15px" }}>
          <strong>{e.title}</strong>
        </div>
      ))}
    </div>
  );
}
