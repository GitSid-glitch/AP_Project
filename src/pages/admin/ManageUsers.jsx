import React from "react";

export default function ManageUsers() {
  const users = [
    { id: 1, name: "Vansh Jain", role: "Student" },
    { id: 2, name: "Rahul", role: "Organizer" },
  ];

  return (
    <div style={{ color: "white" }}>
      <h1>🧑‍💼 Manage Users</h1>
      {users.map((u) => (
        <div key={u.id} style={{ marginTop: "15px" }}>
          <strong>{u.name}</strong>
          <p>Role: {u.role}</p>
        </div>
      ))}
    </div>
  );
}
