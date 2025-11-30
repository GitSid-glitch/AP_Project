import React from "react";

export default function OrganizerLogin({ goBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Organizer login submitted!");
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Organizer Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" placeholder="organizer@college.edu" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <button className="back-btn" onClick={goBack}>← Back</button>
    </div>
  );
}
