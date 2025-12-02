// // src/pages/student/StudentDashboard.jsx
// import React, { useState } from "react";
// import DashboardLayout from "../../layout/DashboardLayout";

// import Overview from "./Overview";
// import MyRegistrations from "./MyRegistrations";
// import Explore from "./Explore";
// import StudentSettings from "./StudentSettings";
// import UpcomingEvents from "./UpcomingEvents";

// export default function StudentDashboard({ goBack }) {
//   const [page, setPage] = useState("overview");

//   const pages = {
//     overview: <Overview />,
//     myregistrations: <MyRegistrations />,
//     upcoming: <UpcomingEvents />,
//     explore: <Explore />,
//     settings: <StudentSettings />,
//   };

//   return (
//     <DashboardLayout
//       page={page}
//       setPage={setPage}
//       goBack={goBack}
//       userName="Student"
//       sidebarType="student"
//       showSidebar={false}

//     >
//       {pages[page] || <Overview />}
//     </DashboardLayout>
//   );
// }








// src/pages/student/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

// Minimal placeholder components for non-overview pages (keep your real components if present)
function Explore() {
  return <div style={{ padding: 28, color: "#c9d7e6" }}>Explore events page (placeholder)</div>;
}
function MyRegistrations() {
  return <div style={{ padding: 28, color: "#c9d7e6" }}>My registrations page (placeholder)</div>;
}
function StudentSettings() {
  return <div style={{ padding: 28, color: "#c9d7e6" }}>Settings page (placeholder)</div>;
}

export default function StudentDashboard({ goBack }) {
  const [page, setPage] = useState("overview");
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
    upcomingCount: 5,
    myRegistrationsCount: 2,
    favoriteCategories: ["Tech", "Cultural"],
  };

  const eventsSample = [
    { id: 201, title: "AI Intro Workshop", org: "CS Dept", when: "2026-02-25 09:00", venue: "Lab 2", category: "Tech", seatsLeft: 12, popularity: 420 },
    { id: 202, title: "Photography Walk", org: "Photo Club", when: "2026-03-01 16:00", venue: "Campus Grounds", category: "Hobby", seatsLeft: 30, popularity: 150 },
    { id: 203, title: "Cultural Night", org: "Arts Club", when: "2026-03-12 19:00", venue: "Auditorium A", category: "Cultural", seatsLeft: 5, popularity: 800 },
    { id: 204, title: "Startup Pitch", org: "Entrepreneurship Cell", when: "2026-04-05 14:00", venue: "Conference Hall", category: "Career", seatsLeft: 0, popularity: 290 },
    { id: 205, title: "Design Thinking", org: "Design Club", when: "2026-04-20 11:00", venue: "Studio 1", category: "Workshop", seatsLeft: 18, popularity: 95 },
  ];

  const registrationsSample = [
    { id: 301, eventId: 201, title: "AI Intro Workshop", org: "CS Dept", when: "2026-02-25 09:00", contact: "alice@cs.univ.edu" },
    { id: 302, eventId: 203, title: "Cultural Night", org: "Arts Club", when: "2026-03-12 19:00", contact: "events@arts.univ.edu" },
  ];

  // local UI state
  const [events, setEvents] = useState(eventsSample);
  const [registrations, setRegistrations] = useState(registrationsSample);
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity"); // popularity / date / seats

  // helpers
  function goTo(id) {
    setPage(id);
    setDrawerOpen(false);
  }

  function handleRegister(eventId) {
    const ev = events.find((e) => e.id === eventId);
    if (!ev) return;
    if (ev.seatsLeft === 0) {
      alert("(UI) No seats left — cannot register (demo)");
      return;
    }
    // optimistic UI: reduce seats and add registration
    setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, seatsLeft: Math.max(0, e.seatsLeft - 1) } : e)));
    setRegistrations((prev) => [
      ...prev,
      { id: Date.now(), eventId: ev.id, title: ev.title, org: ev.org, when: ev.when, contact: "organizer@univ.edu" }
    ]);
    alert(`(UI) Registered for "${ev.title}" — contact: organizer@univ.edu`);
  }

  function handleCancelRegistration(regId) {
    const reg = registrations.find((r) => r.id === regId);
    if (!reg) return;
    setRegistrations((prev) => prev.filter((r) => r.id !== regId));
    // return a seat (UI-only)
    setEvents((prev) => prev.map((e) => (e.id === reg.eventId ? { ...e, seatsLeft: e.seatsLeft + 1 } : e)));
    alert("(UI) Registration cancelled (demo)");
  }

  function filteredSortedEvents() {
    let list = events.slice();

    if (filterCategory !== "All") list = list.filter((e) => e.category === filterCategory);
    if (query.trim()) list = list.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()) || e.org.toLowerCase().includes(query.toLowerCase()));

    if (sortBy === "popularity") list.sort((a, b) => b.popularity - a.popularity);
    if (sortBy === "date") list.sort((a, b) => new Date(a.when) - new Date(b.when));
    if (sortBy === "seats") list.sort((a, b) => b.seatsLeft - a.seatsLeft);

    return list;
  }

  // page map for non-overview pages (simple placeholders or existing components)
  const pages = {
    overview: null, // handled inline below
    explore: <Explore />,
    myRegistrations: <MyRegistrations />,
    settings: <StudentSettings />,
  };

  return (
    <DashboardLayout
      page={page}
      setPage={setPage}
      goBack={goBack}
      userName="Student"
      sidebarType="student"
      links={[
        { id: "overview", label: "Overview", emoji: "🏠" },
        { id: "explore", label: "Explore", emoji: "🔎" },
        { id: "myRegistrations", label: "My Registrations", emoji: "🎟️" },
        { id: "settings", label: "Settings", emoji: "⚙️" },
      ]}
      showSidebar={false}
    >
      {/* three-dot toggle */}
      <div className="three-dot-wrap">
        {!drawerOpen && (
          <button className="three-dot-btn" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
            <span className="dot" /><span className="dot" /><span className="dot" />
          </button>
        )}
      </div>

      {/* drawer overlay */}
      <div className={`drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)} />

      {/* drawer */}
      <aside className={`drawer ${drawerOpen ? "open" : ""}`} aria-hidden={!drawerOpen} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
        <div className="drawer-header">
          <div style={{ fontWeight: 800, fontSize: 20, color: "#0b1220" }}>Menu</div>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <nav className="drawer-nav">
          <button className="drawer-item" onClick={() => goTo("overview")}>🏠 Overview</button>
          <button className="drawer-item" onClick={() => goTo("explore")}>🔎 Explore</button>
          <button className="drawer-item" onClick={() => goTo("myRegistrations")}>🎟️ My Registrations</button>
          <button className="drawer-item" onClick={() => goTo("settings")}>⚙️ Settings</button>
        </nav>
      </aside>

      {/* render non-overview pages if selected */}
      {page !== "overview" && pages[page]}

      {/* Overview content */}
      {page === "overview" && (
        <div style={{ padding: 28, minHeight: "auto", background: "linear-gradient(180deg,#07080b 0%, #071018 100%)" }}>
          {/* header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <h1 style={{ margin: 0, color: "#fff", fontSize: 28 }}>Student Overview</h1>
              <div style={{ color: "#94a3b8", marginTop: 6 }}>Welcome! Discover events, register, and manage your signups.</div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="btn-ghost" onClick={() => alert("Notifications (demo)")}>🔔 Notifications</button>
            </div>
          </div>

          {/* stats */}
          <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
            <div style={{ background: "linear-gradient(180deg,#0f1724,#0b1220)", color: "#fff", borderRadius: 12, padding: 18, minWidth: 160 }}>
              <div style={{ fontSize: 13, opacity: 0.85 }}>Upcoming Events</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{statsSample.upcomingCount}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>Next 30 days</div>
            </div>

            <div style={{ background: "linear-gradient(180deg,#0f1724,#0b1220)", color: "#fff", borderRadius: 12, padding: 18, minWidth: 160 }}>
              <div style={{ fontSize: 13, opacity: 0.85 }}>My Registrations</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{registrations.length}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>Active bookings</div>
            </div>

            <div style={{ background: "linear-gradient(180deg,#0f1724,#0b1220)", color: "#fff", borderRadius: 12, padding: 18, minWidth: 160 }}>
              <div style={{ fontSize: 13, opacity: 0.85 }}>Favourite Categories</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>{statsSample.favoriteCategories.join(", ")}</div>
            </div>
          </div>

          {/* search / filters */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18 }}>
            <input
              placeholder="Search events by title or organizer..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ padding: "10px 12px", borderRadius: 10, border: "none", width: 420, outline: "none", background: "#0b0f13", color: "#fff" }}
            />

            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: "10px", borderRadius: 10, border: "none", background: "#0b0f13", color: "#fff" }}>
              <option value="All">All categories</option>
              <option value="Tech">Tech</option>
              <option value="Cultural">Cultural</option>
              <option value="Hobby">Hobby</option>
              <option value="Workshop">Workshop</option>
              <option value="Career">Career</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "10px", borderRadius: 10, border: "none", background: "#0b0f13", color: "#fff" }}>
              <option value="popularity">Sort: Popularity</option>
              <option value="date">Sort: Date</option>
              <option value="seats">Sort: Seats left</option>
            </select>
          </div>

          {/* main grid (uses .grid-two-col from dashboard.css) */}
          <div className="grid-two-col">
            {/* Left: event list */}
            <div>
              <div style={{ color: "#c9d7e6", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Events</div>
              {filteredSortedEvents().map((ev) => (
                <div key={ev.id} className="event-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ maxWidth: "70%" }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{ev.title}</div>
                    <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>{ev.org}</div>
                    <div style={{ fontSize: 12, opacity: 0.65, marginTop: 6 }}>{ev.when} · {ev.venue}</div>
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>Category: {ev.category} • Popularity: {ev.popularity}</div>
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button className="btn-ghost" onClick={() => alert(`(UI) View details for ${ev.title}`)}>Details</button>
                    {ev.seatsLeft > 0 ? (
                      <button className="btn-primary" onClick={() => handleRegister(ev.id)}>Register</button>
                    ) : (
                      <button className="btn-ghost" style={{ opacity: 0.6 }} disabled>Full</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: registrations + quick actions */}
            <div>
              <div style={{ color: "#c9d7e6", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>My Registrations</div>

              <div className="registrations-list">
                {registrations.length === 0 ? (
                  <div className="registration-card">You have no registrations yet.</div>
                ) : (
                  registrations.map((r) => (
                    <div key={r.id} className="registration-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{r.title}</div>
                        <div style={{ fontSize: 12, opacity: 0.8 }}>{r.org} · {r.when}</div>
                        <div style={{ fontSize: 12, opacity: 0.7 }}>Contact: {r.contact}</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn-ghost" onClick={() => alert(`(UI) View event ${r.eventId}`)}>View</button>
                        <button className="btn-primary" onClick={() => handleCancelRegistration(r.id)}>Cancel</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ marginTop: 12 }} className="quick-actions">
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Quick Actions</div>
                <button className="btn-primary" style={{ width: "100%", marginBottom: 8 }} onClick={() => goTo("explore")}>Browse Events</button>
                <button className="btn-ghost" style={{ width: "100%" }} onClick={() => goTo("myRegistrations")}>My Registrations</button>
                <div style={{ marginTop: 10, fontSize: 12, color: "#9fb3c6" }}>
                  Tip: Register early — popular events fill quickly.
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, color: "#7f98ad", fontSize: 12 }}>
            Student demo data — replace with API endpoints to load real events and registrations.
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
