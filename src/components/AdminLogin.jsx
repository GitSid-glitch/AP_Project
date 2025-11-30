import React, { useState } from "react";
import "../styles/login.css";

export default function AdminLogin({ navigate, goBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Provide email & password");
      return;
    }
    navigate("admin-dashboard");
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>

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
