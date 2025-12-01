// src/components/AdminLogin.jsx
import React, { useState } from "react";
import "../styles/login.css";

export default function AdminLogin({ navigate, goBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      alert("Provide email & password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      }).catch(() => null);

      if (res && !res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Admin login failed");
        setLoading(false);
        return;
      }

      navigate("admin-dashboard");
    } catch (err) {
      console.error(err);
      alert("Network error.");
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
