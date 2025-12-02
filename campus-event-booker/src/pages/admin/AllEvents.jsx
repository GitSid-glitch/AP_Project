import React, { useState, useEffect } from "react";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/events", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div style={{ color: "white" }}>Loading...</div>;

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>📅 All Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((e) => (
          <div key={e.id} style={{
            marginTop: "15px",
            background: "#1e293b",
            padding: "15px",
            borderRadius: "8px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ fontSize: "1.1em" }}>{e.title}</strong>
              <span style={{
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "0.8em",
                background: e.isApproved ? "#059669" : "#d97706",
                color: "white"
              }}>
                {e.isApproved ? "Published" : "Pending"}
              </span>
            </div>
            <div style={{ fontSize: "0.9em", color: "#94a3b8", marginTop: "5px" }}>
              By: {e.organizer?.name || "Unknown"} | {new Date(e.date).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
