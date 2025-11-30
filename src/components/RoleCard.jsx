import React from "react";

export default function RoleCard({ title, emoji, onClick }) {
  return (
    <div className="role-card" onClick={onClick}>
      <div className="role-emoji">{emoji}</div>
      <h2 className="role-name">{title}</h2>
    </div>
  );
}
