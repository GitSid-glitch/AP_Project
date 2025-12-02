// src/components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Simple client-side guard:
 * If no token in localStorage redirect to landing page.
 * (You can replace token existence with a stronger check if you want
 *  to validate the token with the backend.)
 */
export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
