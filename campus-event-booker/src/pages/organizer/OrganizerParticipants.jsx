import React from "react";

export default function OrganizerParticipants() {
  const participants = [
    { id: 1, name: "Vansh Jain", event: "Tech Fest" },
    { id: 2, name: "Sumit", event: "Music Night" },
  ];

  return (
    <div style={{ color: "white" }}>
      <h1>👥 Participants</h1>

      {participants.map((p) => (
        <div key={p.id} style={{ marginTop: "15px" }}>
          <strong>{p.name}</strong>
          <p>Event: {p.event}</p>
        </div>
      ))}
    </div>
  );
}
