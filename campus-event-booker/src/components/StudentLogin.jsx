// src/components/StudentLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function StudentLogin() {
  const navigate = useNavigate();
  // view: "idle" (show two big buttons) | "signin" (show email/password) | "signup" (show signup fields)
  const [view, setView] = useState("idle");
  const [fullname, setFullname] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password) return alert("Please enter email and password.");
    setLoading(true);
    try {
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

      // Security Check
      if (data.user.role !== "STUDENT") {
        alert("Access Denied: You are not a Student.");
        setLoading(false);
        return;
      }

      // Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // success
      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!fullname.trim() || !branch.trim() || !email.trim() || !password) {
      return alert("Please fill all fields to sign up.");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullname.trim(), // Backend expects 'name'
          email: email.trim(),
          password,
          role: "STUDENT", // Explicit role
          // branch is not in User model schema currently, so it might be ignored or I should check if I need to add it. 
          // The prompt didn't ask to update schema for branch, so I'll assume it's just frontend state or ignored for now.
          // Or I can send it if backend handles it (it doesn't seem to based on auth.js).
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Sign up failed");
        setLoading(false);
        return;
      }

      // Auto-Login after signup
      // We can just call the login endpoint immediately
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));
        alert("Account created. Redirecting...");
        navigate("/student/dashboard");
      } else {
        alert("Account created, but auto-login failed. Please sign in.");
        setView("signin");
      }

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
          <h2>Student</h2>
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

          <button className="back-btn" onClick={() => navigate("/")} style={{ marginTop: 12 }}>
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
            onClick={() => {
              setView("idle");
            }}
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
            placeholder="Branch of study (e.g. CSE)"
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
            onClick={() => {
              setView("idle");
            }}
            style={{ marginTop: 8 }}
          >
            ← Back
          </button>
        </>
      )}
    </div>
  );
}
