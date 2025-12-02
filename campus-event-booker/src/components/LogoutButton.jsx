// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Simple logout button:
 * - removes token + user from localStorage
 * - navigates to landing ("/") with replace so back doesn't return to dashboard
 */
export default function LogoutButton({ className, children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // If you also use cookies/sessions, you may want to call your backend logout endpoint here.
      // e.g. await fetch("/api/auth/logout", { method: "POST", credentials: "include" });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Navigate back to role selection landing page and replace history
      navigate("/", { replace: true });
      // Optional: force reload to clear any in-memory state
      // window.location.reload();
    }
  };

  return (
    <button className={className || "btn-logout"} onClick={handleLogout}>
      {children || "Logout"}
    </button>
  );
}
