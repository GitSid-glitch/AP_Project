import React, { useState, useEffect } from "react";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/organizer/events", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/organizer/events/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        alert("Event deleted");
        setEvents(events.filter(e => e.id !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  if (loading) return <div style={{ color: "white" }}>Loading events...</div>;

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>🛠️ Manage Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((e) => (
          <div key={e.id} style={{
            marginTop: "15px",
            background: "#1e293b",
            padding: "15px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <strong style={{ fontSize: "1.1em" }}>{e.title}</strong>
              <div style={{ fontSize: "0.9em", color: "#94a3b8" }}>
                {new Date(e.date).toLocaleDateString()} at {e.venue}
              </div>
              <div style={{ fontSize: "0.8em", color: e.isApproved ? "#4ade80" : "#fbbf24" }}>
                {e.isApproved ? "Published" : "Pending Approval"}
              </div>
            </div>
            <div>
              {/* Edit button could link to an edit page, for now just a placeholder or alert */}
              <button
                onClick={() => alert("Edit feature coming soon!")}
                style={{
                  marginRight: "10px",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#3b82f6",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(e.id)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
