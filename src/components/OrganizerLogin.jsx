import React, { useState } from "react";
import "../styles/login.css";

export default function OrganizerLogin({ navigate, goBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter both email and password");
      return;
    }
    navigate("organizer-dashboard");
  };

  return (
    <div className="login-container">
      <h2>Organizer Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="login-input"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="login-input"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>

      <button className="back-btn" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
