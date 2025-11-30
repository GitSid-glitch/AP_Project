import React from "react";

export default function PendingApprovals() {
  const pending = [
    { id: 1, title: "Tech Fest", by: "Organizer 1" },
    { id: 2, title: "Music Night", by: "Organizer 2" },
  ];

  return (
    <div style={{ color: "white" }}>
      <h1>⏳ Pending Approvals</h1>
      {pending.map((p) => (
        <div key={p.id} style={{ marginTop: "15px" }}>
          <strong>{p.title}</strong>
          <p>Submitted by: {p.by}</p>
          <button style={{ marginRight: "10px" }}>Approve</button>
          <button>Reject</button>
        </div>
      ))}
    </div>
  );
}
