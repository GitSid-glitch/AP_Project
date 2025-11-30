import React from "react";

export default function RoleSelectionPage({ navigate }) {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="app-title">🎓 Campus Event Booker</h1>
        <p className="tagline">Plan. Book. Manage. Celebrate.</p>
      </div>

      <div className="roles-grid">
        <div className="role-card student" onClick={() => navigate("student")}>
          <div className="icon">👩‍🎓</div>
          <h3>Student</h3>
          <p>Discover and join amazing campus events!</p>
        </div>

        <div className="role-card organizer" onClick={() => navigate("organizer")}>
          <div className="icon">🎤</div>
          <h3>Organizer</h3>
          <p>Host, plan, and promote your events effortlessly.</p>
        </div>

        <div className="role-card admin" onClick={() => navigate("admin")}>
          <div className="icon">🛡️</div>
          <h3>Admin</h3>
          <p>Manage all events and user activities securely.</p>
        </div>
      </div>

      <footer>
        <p>© 2025 Campus Event Booker. All rights reserved.</p>
      </footer>
    </div>
  );
}
