// // src/pages/organizer/OrganizerDashboard.jsx
// import React, { useState } from "react";
// import DashboardLayout from "../../layout/DashboardLayout";

// import OrgOverview from "./OrgOverview";
// import CreateEvent from "./CreateEvent";
// import ManageEvents from "./ManageEvents";
// import OrganizerParticipants from "./OrganizerParticipants";
// import OrgSettings from "./OrgSettings";

// export default function OrganizerDashboard({ goBack }) {
//   const [page, setPage] = useState("overview");

//   const pages = {
//     overview: <OrgOverview />,
//     create: <CreateEvent />,
//     manage: <ManageEvents />,
//     participants: <OrganizerParticipants />,
//     settings: <OrgSettings />,
//   };

//   return (
//     <DashboardLayout
//       page={page}
//       setPage={setPage}
//       goBack={goBack}
//       userName="Organizer"
//       sidebarType="organizer"
//       links={[
//         { id: "overview", label: "Overview", emoji: "📊" },
//         { id: "create", label: "Create Event", emoji: "➕" },
//         { id: "manage", label: "Manage Events", emoji: "🛠️" },
//         { id: "participants", label: "Participants", emoji: "👥" },
//         { id: "settings", label: "Settings", emoji: "⚙️" },
//       ]}
//     >
//       {pages[page]}
//     </DashboardLayout>
//   );
// }







// src/pages/organizer/OrganizerDashboard.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

import OrgOverview from "./OrgOverview";
import CreateEvent from "./CreateEvent";
import ManageEvents from "./ManageEvents";
import OrganizerParticipants from "./OrganizerParticipants";
import OrgSettings from "./OrgSettings";

export default function OrganizerDashboard({ goBack }) {
  const [page, setPage] = useState("overview");

  // drawer state (three-dot slide-over)
  const [drawerOpen, setDrawerOpen] = useState(false);

  // close drawer with Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && drawerOpen) setDrawerOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  // --- Hardcoded sample data (replace with API later) ---
  const statsSample = {
    eventsCreated: 12,
    upcoming: 3,
    totalAttendees: 842,
  };

  const upcomingEventsSample = [
    { id: 1, title: "Campus Career Fair", date: "2026-05-10 10:00", venue: "Conference Hall", status: "Published" },
    { id: 2, title: "Hackathon 2026", date: "2026-06-20 09:00", venue: "Lab 1", status: "Pending Approval" },
    { id: 3, title: "Design Workshop", date: "2026-07-02 14:00", venue: "Studio 3", status: "Draft" },
  ];

  const myEventsSample = [
    { id: 11, title: "Campus Career Fair", date: "2026-05-10 10:00", venue: "Conference Hall", status: "Published", attendees: 320 },
    { id: 12, title: "Hackathon 2026", date: "2026-06-20 09:00", venue: "Lab 1", status: "Pending Approval", attendees: 0 },
    { id: 13, title: "Design Workshop", date: "2026-07-02 14:00", venue: "Studio 3", status: "Draft", attendees: 0 },
  ];

  // local UI state using sample data
  const [upcoming, setUpcoming] = useState(upcomingEventsSample);
  const [myEvents, setMyEvents] = useState(myEventsSample);

  // --- page map (non-overview pages render their components) ---
  const pages = {
    overview: null, // overview handled inline below
    create: <CreateEvent />,
    manage: <ManageEvents />,
    participants: <OrganizerParticipants />,
    settings: <OrgSettings />,
  };

  // helper to navigate and close drawer
  function goTo(id) {
    setPage(id);
    setDrawerOpen(false);
  }

  // UI handlers (demo-only)
  function handleCreate() {
    setPage("create");
  }

  function handleEdit(id) {
    // UI-only: jump to manage and highlight edit later
    alert(`(UI) Edit event ${id} — open Create/Edit screen`);
    setPage("manage");
  }

  function handleSubmitForApproval(id) {
    setMyEvents((prev) => prev.map(e => e.id === id ? { ...e, status: "Pending Approval" } : e));
    alert(`(UI) Submitted event ${id} for admin approval`);
  }

  function handleExportReport() {
    alert("(UI) Export reports (demo) — implement CSV / PDF endpoint later");
  }

  // --- Layout return ---
  return (
    <DashboardLayout
      page={page}
      setPage={setPage}
      goBack={goBack}
      userName="Organizer"
      sidebarType="organizer"
      links={[
        { id: "overview", label: "Overview", emoji: "📊" },
        { id: "create", label: "Create Event", emoji: "➕" },
        { id: "manage", label: "Manage Events", emoji: "🛠️" },
        { id: "participants", label: "Participants", emoji: "👥" },
        { id: "settings", label: "Settings", emoji: "⚙️" },
      ]}
      showSidebar={false}
    >
      {/* three-dot toggle (top-right) */}
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

      {/* overlay: click to close */}
      <div
        className={`drawer-overlay ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* slide-over drawer */}
      <aside
        className={`drawer ${drawerOpen ? "open" : ""}`}
        aria-hidden={!drawerOpen}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="drawer-header">
          <div style={{ fontWeight: 800, fontSize: 20, color: "#0b1220" }}>
            Menu
          </div>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="drawer-nav" onClick={(e) => e.stopPropagation()}>
          <button className="drawer-item" onClick={() => goTo("overview")}>
            📊 Overview
          </button>
          <button className="drawer-item" onClick={() => goTo("create")}>
            ➕ Create Event
          </button>
          <button className="drawer-item" onClick={() => goTo("manage")}>
            🛠️ Manage Events
          </button>
          <button className="drawer-item" onClick={() => goTo("participants")}>
            👥 Participants
          </button>
          <button className="drawer-item" onClick={() => goTo("settings")}>
            ⚙️ Settings
          </button>
        </nav>
      </aside>

      {/* --- If not on overview, render the chosen page component --- */}
      {page !== "overview" && pages[page]}

      {/* --- Overview page content (inline) --- */}
      {page === "overview" && (
        <div style={{ padding: 28, minHeight: "100vh", background: "linear-gradient(180deg,#07080b 0%, #071018 100%)", borderRadius: 8 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <h1 style={{ margin: 0, color: "#fff", fontSize: 28 }}>Organizer Overview</h1>
              <div style={{ color: "#94a3b8", marginTop: 6 }}>Welcome! Manage events, participants, and settings.</div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="btn-ghost" onClick={() => alert("Open notifications (demo)")}>🔔 Notifications</button>
              <button className="btn-primary" onClick={handleExportReport}>Export Reports</button>
            </div>
          </div>

          {/* Stats and actions */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
            {/* Left: stats + upcoming + my events */}
            <div>
              <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                <div style={{ background: "linear-gradient(180deg,#0f1724 0%, #0b1220 100%)", color: "#fff", borderRadius: 12, padding: 18, minWidth: 160 }}>
                  <div style={{fontSize:13, opacity:0.85}}>Events Created</div>
                  <div style={{fontSize:28, fontWeight:700, marginTop:8}}>{statsSample.eventsCreated}</div>
                  <div style={{fontSize:12, opacity:0.7, marginTop:8}}>All time</div>
                </div>

                <div style={{ background: "linear-gradient(180deg,#0f1724 0%, #0b1220 100%)", color: "#fff", borderRadius: 12, padding: 18, minWidth: 160 }}>
                  <div style={{fontSize:13, opacity:0.85}}>Upcoming</div>
                  <div style={{fontSize:28, fontWeight:700, marginTop:8}}>{statsSample.upcoming}</div>
                  <div style={{fontSize:12, opacity:0.7, marginTop:8}}>Next 90 days</div>
                </div>

                <div style={{ background: "linear-gradient(180deg,#0f1724 0%, #0b1220 100%)", color: "#fff", borderRadius: 12, padding: 18, minWidth: 160 }}>
                  <div style={{fontSize:13, opacity:0.85}}>Total Attendees</div>
                  <div style={{fontSize:28, fontWeight:700, marginTop:8}}>{statsSample.totalAttendees}</div>
                  <div style={{fontSize:12, opacity:0.7, marginTop:8}}>All time</div>
                </div>
              </div>

              {/* Upcoming events */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ color: "#c9d7e6", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Upcoming Events</div>
                {upcoming.map(ev => (
                  <div key={ev.id} style={{ background: "#0e1318", color: "#e6eef8", borderRadius: 12, padding: 14, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{ev.title}</div>
                      <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>{ev.date} · {ev.venue}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-ghost" onClick={() => handleEdit(ev.id)}>Edit</button>
                      <button className="btn-primary" onClick={() => handleSubmitForApproval(ev.id)}>Submit</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* My events */}
              <div>
                <div style={{ color: "#c9d7e6", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>My Events</div>
                {myEvents.map(ev => (
                  <div key={ev.id} style={{ background: "#0e1318", color: "#e6eef8", borderRadius: 12, padding: 14, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{ev.title}</div>
                      <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>{ev.date} · {ev.venue}</div>
                      <div style={{ fontSize: 12, opacity: 0.65, marginTop: 6 }}>Status: {ev.status} • Attendees: {ev.attendees}</div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-ghost" onClick={() => handleEdit(ev.id)}>Edit</button>
                      <button className="btn-primary" onClick={() => alert(`(UI) View participants for ${ev.id}`)}>Participants</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick actions + tips + calendar placeholder */}
            <div>
              <div style={{ background: "#0e1318", color: "#e6eef8", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Quick Actions</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-primary" style={{ flex: 1 }} onClick={handleCreate}>Create Event</button>
                  <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setPage("manage")}>Manage Events</button>
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: "#9fb3c6" }}>
                  Tip: Submit events for admin approval to make them visible to students.
                </div>
              </div>

              <div style={{ background: "#0e1318", color: "#e6eef8", borderRadius: 12, padding: 16, minHeight: 220 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Site Calendar (Preview)</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>Monthly</div>
                </div>

                <div style={{ marginTop: 12, width: "100%", height: 140, borderRadius: 10, background: "linear-gradient(180deg,#07101a,#07121c)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7fb0c6", fontSize: 14 }}>
                  Calendar UI (plug a calendar lib here)
                </div>

                <div style={{ marginTop: 12, fontSize: 12, color: "#9fb3c6" }}>
                  Click events to adjust capacity, close registrations, or view participants.
                </div>
              </div>
            </div>
          </div>

          {/* footer */}
          <div style={{ marginTop: 20, color: "#7f98ad", fontSize: 12 }}>
            Organizer demo data — replace with API calls to persist changes and load real events.
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
