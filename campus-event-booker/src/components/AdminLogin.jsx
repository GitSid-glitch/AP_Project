import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function AdminLogin({ goBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user.role !== "ADMIN") {
            setError("Access Denied: You are not an Administrator.");
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        
        navigate("/admin/dashboard"); 
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err); 
      setError("Server error. Is the backend running on port 3002?");
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="admin@college.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button className="back-btn" onClick={goBack}>← Back</button>
    </div>
  );
}