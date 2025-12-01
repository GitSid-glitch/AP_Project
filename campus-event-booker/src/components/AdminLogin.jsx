// src/components/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function AdminLogin({ goBack }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
    // 1. Basic Validation
    if (!email.trim() || !password) {
      alert("Provide email & password");
      return;
    }
    setLoading(true);

    try {
      console.log("Attempting login to /api/auth/login..."); 

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      console.log("Response received:", res.status); 

      const data = await res.json();
      console.log("Data received:", data); 

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data.user.role !== "ADMIN") {
        alert("Access Denied: You are not an Admin");
        setLoading(false);
        return;
      }
      console.log("Login Success! Redirecting..."); 
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Login Error:", err);
      alert("Network Request Failed. Check Console (F12) for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleLogin} disabled={loading}>
        {loading ? "Please wait..." : "Login"}
      </button>

      <button className="back-btn" onClick={goBack} style={{ marginTop: 8 }}>
        Back
      </button>
    </div>
  );
}
