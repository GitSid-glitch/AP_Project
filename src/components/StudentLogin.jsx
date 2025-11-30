import React, { useState } from "react";
import "../styles/login.css";

export default function StudentLogin({ navigate, goBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    navigate("student-dashboard");
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>

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
