import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "Tech",
    capacity: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create an event.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/organizer/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event created successfully!");
        navigate("/organizer/dashboard"); // Go back to dashboard to see the event
      } else {
        alert(data.message || "Failed to create event");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white", maxWidth: "600px" }}>
      <h1>➕ Create Event</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Event Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Venue</label>
          <input
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}
            >
              <option value="Tech">Tech</option>
              <option value="Cultural">Cultural</option>
              <option value="Workshop">Workshop</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              min="1"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "12px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
