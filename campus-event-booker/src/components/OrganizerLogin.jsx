// src/components/OrganizerLogin.jsx
import React, { useState } from "react";
import "../styles/login.css";

export default function OrganizerLogin({ navigate, goBack }) {
  // view: "idle" | "signin" | "signup"
  const [view, setView] = useState("idle");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- SIGN IN LOGIC ---
  const handleSignIn = async () => {
    if (!email.trim() || !password) return alert("Please enter email and password.");
    setLoading(true);

    try {
      // FIX 1: Use the correct shared login URL (Full URL to avoid proxy issues)
      const res = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Sign in failed");
        setLoading(false);
        return;
      }

      // FIX 2: Security Check - Ensure they are an ORGANIZER
      if (data.user.role !== "ORGANIZER") {
        alert("Access Denied: This account is not an Organizer.");
        setLoading(false);
        return;
      }

      // FIX 3: Save Token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // FIX 4: Navigate to correct dashboard path
      navigate("/organizer/dashboard");

    } catch (err) {
      console.error(err);
      alert("Network error. Is Backend running on port 3002?");
    } finally {
      setLoading(false);
    }
  };

  // --- SIGN UP LOGIC ---
  const handleSignUp = async () => {
    if (!company.trim() || !email.trim() || !password) {
      return alert("Please fill all fields.");
    }
    setLoading(true);

    try {
      // FIX 5: Create Account (Auto-Redirect)
      const signupRes = await fetch("http://localhost:3002/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: company.trim(), // Map 'company' to 'name' for the database
          email: email.trim(),
          password,
          role: "ORGANIZER" // Crucial: Set the role!
        }),
      });

      if (!signupRes.ok) {
        const data = await signupRes.json().catch(() => ({}));
        alert(data.message || "Sign up failed");
        setLoading(false);
        return;
      }

      // Account created! Now Auto-Login immediately
      const loginRes = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        alert("Account created! Please sign in manually.");
        setView("signin");
        setLoading(false);
        return;
      }

      // Save Token and Redirect
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));
      navigate("/organizer/dashboard");

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
          <h2>Organizer Portal</h2>
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
            placeholder="Company/Organization Name"
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