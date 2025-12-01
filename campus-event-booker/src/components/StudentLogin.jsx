// src/components/StudentLogin.jsx
import React, { useState } from "react";
import "../styles/login.css";

export default function StudentLogin({ navigate, goBack }) {
  // view: "idle" | "signin" | "signup"
  const [view, setView] = useState("idle");
  const [fullname, setFullname] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- SIGN IN LOGIC ---
  const handleSignIn = async () => {
    if (!email.trim() || !password) return alert("Please enter email and password.");
    setLoading(true);

    try {
      // FIX 1: Use correct URL
      const res = await fetch("/api/auth/login", {
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

      if (data.user.role !== "STUDENT") {
        alert("Access Denied: This account is not a Student.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/student/dashboard");

    } catch (err) {
      console.error(err);
      alert("Network error. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!fullname.trim() || !email.trim() || !password) {
      return alert("Please fill all fields to sign up.");
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullname.trim(),
          email: email.trim(),
          password,
          role: "STUDENT" 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Sign up failed");
        setLoading(false);
        return;
      }

      alert("Account created successfully! Please Sign In.");
      setView("signin"); 
      
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Idle: only Sign In / Sign Up buttons */}
      {view === "idle" && (
        <>
          <h2>Student Portal</h2>
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
                setFullname("");
                setBranch("");
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

      {/* Sign In form */}
      {view === "signin" && (
        <>
          <h2>Student Sign In</h2>

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

          <button
            className="back-btn"
            onClick={() => setView("idle")}
            style={{ marginTop: 8 }}
          >
            ← Back
          </button>
        </>
      )}

      {/* Sign Up form */}
      {view === "signup" && (
        <>
          <h2>Student Sign Up</h2>

          <input
            type="text"
            placeholder="Full name"
            className="login-input"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <input
            type="text"
            placeholder="Branch (Optional)"
            className="login-input"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
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

          <button
            className="back-btn"
            onClick={() => setView("idle")}
            style={{ marginTop: 8 }}
          >
            ← Back
          </button>
        </>
      )}
    </div>
  );
}