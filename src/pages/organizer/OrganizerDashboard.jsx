// src/pages/organizer/OrganizerDashboard.jsx
import React, { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

import OrgOverview from "./OrgOverview";
import CreateEvent from "./CreateEvent";
import ManageEvents from "./ManageEvents";
import OrganizerParticipants from "./OrganizerParticipants";
import OrgSettings from "./OrgSettings";

export default function OrganizerDashboard({ goBack }) {
  const [page, setPage] = useState("overview");

  const pages = {
    overview: <OrgOverview />,
    create: <CreateEvent />,
    manage: <ManageEvents />,
    participants: <OrganizerParticipants />,
    settings: <OrgSettings />,
  };

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
    >
      {pages[page]}
    </DashboardLayout>
  );
}
