import React from "react";
import "../styles/eventcard.css";

export default function EventCard({ event, onRegister, onDetails }) {
  return (
    <div className="event-card">

      <h2 className="event-title">{event.title}</h2>
      <p className="event-info">
        📅 {event.date}  
      </p>
      <p className="event-info">
        📍 {event.location}
      </p>

      <p className="event-description">
        {event.description}
      </p>

      <div className="event-buttons">
        {onDetails && (
          <button className="event-btn-outline" onClick={onDetails}>
            Details
          </button>
        )}

        {onRegister && (
          <button className="event-btn-primary" onClick={onRegister}>
            Register
          </button>
        )}
      </div>
      
    </div>
  );
}
