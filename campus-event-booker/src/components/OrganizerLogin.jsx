// src/components/OrganizerLogin.jsx
import React, { useState } from "react";
import "../styles/login.css";

export default function OrganizerLogin({ navigate, goBack }) {
  const [view, setView] = useState("idle"); // idle | signin | signup
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password) return alert("Please enter email and password.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/organizer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      }).catch(() => null);

      if (res && !res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Sign in failed");
        setLoading(false);
        return;
      }

      navigate("organizer-dashboard");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!company.trim() || !email.trim() || !password) return alert("Please fill all fields.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/organizer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: company.trim(), email: email.trim(), password }),
      }).catch(() => null);

      if (res && !res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Sign up failed");
        setLoading(false);
        return;
      }

      alert("Account created. Redirecting...");
      navigate("organizer-dashboard");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {view === "idle" && (
        <>
          <h2>Organizer</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              className="login-btn"
              onClick={() => {
                setEmail("");
                setPassword("");
                setView("signin");
              }}
            >
              Sign In
            </button>

            <button
              className="login-btn"
              onClick={() => {
                setCompany("");
                setEmail("");
                setPassword("");
                setView("signup");
              }}
            >
              Sign Up
            </button>
          </div>

          <button className="back-btn" onClick={goBack} style={{ marginTop: 12 }}>
            Back
          </button>
        </>
      )}

      {view === "signin" && (
        <>
          <h2>Organizer Sign In</h2>

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

          <button className="login-btn" onClick={handleSignIn} disabled={loading}>
            {loading ? "Please wait..." : "Sign In"}
          </button>

          <button className="back-btn" onClick={() => setView("idle")} style={{ marginTop: 8 }}>
            ← Back
          </button>
        </>
      )}

      {view === "signup" && (
        <>
          <h2>Organizer Sign Up</h2>

          <input
            type="text"
            placeholder="Company name"
            className="login-input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

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

          <button className="login-btn" onClick={handleSignUp} disabled={loading}>
            {loading ? "Please wait..." : "Create account"}
          </button>

          <button className="back-btn" onClick={() => setView("idle")} style={{ marginTop: 8 }}>
            ← Back
          </button>
        </>
      )}
    </div>
  );
}
