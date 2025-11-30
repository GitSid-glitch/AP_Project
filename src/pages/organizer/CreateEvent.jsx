import React, { useState } from "react";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");

  const handleSubmit = () => {
    alert(`Event Created: ${eventName}`);
  };

  return (
    <div style={{ color: "white" }}>
      <h1>➕ Create Event</h1>

      <div style={{ marginTop: "20px" }}>
        <label>Event Name</label>
        <input
          style={{ width: "300px", padding: "8px" }}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <br /><br />

        <label>Description</label>
        <textarea
          style={{ width: "300px", padding: "8px" }}
          value={eventDesc}
          onChange={(e) => setEventDesc(e.target.value)}
        />

        <br /><br />
        <button onClick={handleSubmit}>Create Event</button>
      </div>
    </div>
  );
}
