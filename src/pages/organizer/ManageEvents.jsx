import React from "react";

export default function ManageEvents() {
  const events = [
    { id: 1, title: "Tech Fest 2025" },
    { id: 2, title: "Cultural Night" },
  ];

  return (
    <div style={{ color: "white" }}>
      <h1>🛠️ Manage Events</h1>

      {events.map((e) => (
        <div key={e.id} style={{ marginTop: "15px" }}>
          <strong>{e.title}</strong>
          <button style={{ marginLeft: "15px" }}>Edit</button>
          <button style={{ marginLeft: "5px" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
