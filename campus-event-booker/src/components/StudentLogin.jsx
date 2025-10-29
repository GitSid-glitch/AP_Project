import React from "react";

export default function StudentLogin({ goBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Student login submitted!");
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Student Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" placeholder="student@college.edu" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <button className="back-btn" onClick={goBack}>← Back</button>
    </div>
  );
}
