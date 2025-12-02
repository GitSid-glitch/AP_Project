// // src/pages/admin/AdminDashboard.jsx
// import React, { useState } from "react";
// import DashboardLayout from "../../layout/DashboardLayout";

// export default function AdminDashboard({ goBack }) {
//   const [page, setPage] = useState("overview");

//   return (
//     <DashboardLayout
//       page={page}
//       setPage={setPage}
//       goBack={goBack}
//       userName="Admin"
//       sidebarType="admin"
//     >
//       <div style={{ padding: 24 }}>
//         <h2>Admin Dashboard</h2>
//         <p>Manage approvals, users and reports.</p>
//       </div>
//     </DashboardLayout>
//   );
// }




// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

/*
  AdminDashboard (complete)
  - three-dot toggle in top-right (hidden while drawer open)
  - slide-over drawer + overlay that closes on outside click or Escape
  - stopPropagation for clicks inside drawer
  - mock data UI for Pending Approvals (Approve/Reject UI-only)
*/

const statCardStyle = {
  background: "linear-gradient(180deg,#0f1724 0%, #0b1220 100%)",
  color: "#fff",
  borderRadius: 12,
  padding: 18,
  boxShadow: "0 8px 24px rgba(2,6,23,0.6)",
  minWidth: 180,
};

const neutralCard = {
  background: "#0e1318",
  color: "#d7e3ee",
  borderRadius: 12,
  padding: 18,
  boxShadow: "0 8px 28px rgba(2,6,23,0.55)",
};

function StatCard({ title, value, hint }) {
  return (
    <div style={statCardStyle}>
      <div style={{ fontSize: 13, opacity: 0.85 }}>{title}</div>
      <div style={{ fontSize: 30, fontWeight: 700, marginTop: 8 }}>{value}</div>
      {hint && <div style={{ fontSize: 12, marginTop: 8, opacity: 0.75 }}>{hint}</div>}
    </div>
  );
}

function PendingCard({ item, onApprove, onReject }) {
  return (
    <div
      style={{
        ...neutralCard,
        marginBottom: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "65%" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#ffffff" }}>{item.title}</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>{item.organizer}</div>
        <div style={{ fontSize: 12, opacity: 0.65, marginTop: 6 }}>{item.startAt} · {item.venue}</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => onApprove(item.id)}
          className="btn-approve"
          title="Approve event"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(item.id)}
          className="btn-reject"
          title="Reject event"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard({ goBack }) {
  const [page, setPage] = useState("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // close drawer on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && drawerOpen) setDrawerOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  // --- API State ---
  const [events, setEvents] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Derived state
  const pending = events.filter(e => !e.isApproved);
  const published = events.filter(e => e.isApproved);

  const stats = {
    totalEvents: events.length,
    pending: pending.length,
    published: published.length,
    totalUsers: usersCount,
  };

  // Fetch Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { "Authorization": `Bearer ${token}` };

      const [eventsRes, usersRes] = await Promise.all([
        fetch("/api/admin/events", { headers }),
        fetch("/api/admin/users", { headers })
      ]);

      if (eventsRes.ok && usersRes.ok) {
        const eventsData = await eventsRes.json();
        const usersData = await usersRes.json();

        // Map events to UI format
        const mappedEvents = eventsData.map(e => ({
          id: e.id,
          title: e.title,
          organizer: e.organizer?.name || "Unknown",
          startAt: `${new Date(e.date).toLocaleDateString()} ${e.time}`,
          venue: e.venue,
          isApproved: e.isApproved
        }));

        setEvents(mappedEvents);
        setUsersCount(usersData.length);
      } else {
        console.error("Failed to fetch admin data");
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  async function handleApprove(id) {
    if (!window.confirm("Approve this event?")) return;
    await updateStatus(id, true);
  }

  async function handleReject(id) {
    if (!window.confirm("Reject (unpublish) this event?")) return;
    await updateStatus(id, false);
  }

  async function updateStatus(id, isApproved) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/admin/events/${id}/status`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isApproved })
      });

      if (res.ok) {
        alert(`Event ${isApproved ? "approved" : "rejected"} successfully.`);
        fetchData(); // Refresh list
      } else {
        const data = await res.json();
        alert(data.message || "Operation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  }

  return (
    <DashboardLayout
      page={page}
      setPage={setPage}
      goBack={goBack}
      userName="Admin"
      sidebarType="admin"
      showSidebar={false}
    >
      {/* Three-dot toggle (top-right). Hidden while drawer is open */}
      <div className="three-dot-wrap">
        {!drawerOpen && (
          <button
            className="three-dot-btn"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </button>
        )}
      </div>

      {/* overlay - clicking it closes drawer */}
      <div
        className={`drawer-overlay ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        role="button"
        aria-hidden={!drawerOpen}
      />

      {/* drawer - stop clicks inside from closing overlay; Escape is handled globally */}
      <aside
        className={`drawer ${drawerOpen ? "open" : ""}`}
        aria-hidden={!drawerOpen}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="drawer-header">
          <div style={{ fontWeight: 800, fontSize: 20, color: "#0b1220" }}>Menu</div>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <nav className="drawer-nav" onClick={(e) => e.stopPropagation()}>
          <button className="drawer-item" onClick={() => { setPage("overview"); setDrawerOpen(false); }}>🏠 Overview</button>
          <button className="drawer-item" onClick={() => { setPage("all-events"); setDrawerOpen(false); }}>📋 All Events</button>
          <button className="drawer-item" onClick={() => { setPage("settings"); setDrawerOpen(false); }}>⚙️ Settings</button>
        </nav>
      </aside>

      {/* Main content */}
      <div style={{ padding: 28, minHeight: 600, background: "linear-gradient(180deg,#07080b 0%, #071018 100%)", borderRadius: 8 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <h1 style={{ margin: 0, color: "#fff", fontSize: 28 }}>Welcome, Admin</h1>
            <div style={{ color: "#94a3b8", marginTop: 6 }}>Overview of site activity and approvals</div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn-ghost" onClick={() => alert("Open notifications (demo)")}>🔔 Notifications</button>
            <button className="btn-primary" onClick={() => alert("Export reports (demo)")}>Export Reports</button>
          </div>
        </div>

        {/* Grid: stats + pending + calendar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20 }}>
          <div style={{ gridColumn: "span 8", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <StatCard title="Total Events" value={stats.totalEvents} hint="All time" />
            <StatCard title="Pending Approvals" value={stats.pending} hint="Requires review" />
            <StatCard title="Published Events" value={stats.published} hint="Visible to students" />
          </div>

          <div style={{ gridColumn: "span 4" }}>
            <div style={{ ...neutralCard, minHeight: 120 }}>
              <div style={{ fontSize: 14, opacity: 0.9 }}>Quick Actions</div>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => alert("Create Event (demo)")}>Create Event</button>
                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => alert("Manage Organizers (demo)")}>Manage Organizers</button>
              </div>
              <div style={{ marginTop: 12, color: "#9fb3c6", fontSize: 12 }}>Tip: Approve events to make them visible to students.</div>
            </div>
          </div>

          {/* Pending approvals list */}
          <div style={{ gridColumn: "span 7" }}>
            <div style={{ marginBottom: 12, color: "#c9d7e6", fontWeight: 700, fontSize: 18 }}>Pending Approvals</div>
            <div>
              {pending.length === 0 ? (
                <div style={{ ...neutralCard }}>No pending events — all clear 🎉</div>
              ) : (
                pending.map((p) => (
                  <PendingCard key={p.id} item={p} onApprove={handleApprove} onReject={handleReject} />
                ))
              )}
            </div>
          </div>

          {/* Calendar / site overview */}
          <div style={{ gridColumn: "span 5" }}>
            <div style={{ ...neutralCard, minHeight: 300 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#e6eef8" }}>Site Calendar (Preview)</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>Monthly</div>
              </div>

              <div style={{ marginTop: 12, width: "100%", height: 220, borderRadius: 10, background: "linear-gradient(180deg,#07101a,#07121c)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7fb0c6", fontSize: 14 }}>
                Calendar UI (plug a calendar lib here)
              </div>

              <div style={{ marginTop: 12, fontSize: 12, color: "#9fb3c6" }}>
                Click events to adjust capacity or close registrations (admin actions).
              </div>
            </div>
          </div>
        </div>

        {/* Footer small */}
        <div style={{ marginTop: 20, color: "#7f98ad", fontSize: 12 }}>
          Admin tools are in demo mode. Connect real APIs to make Approve / Reject work.
        </div>
      </div>
    </DashboardLayout>
  );
}
