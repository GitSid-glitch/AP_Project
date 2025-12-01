// src/pages/student/StudentDashboard.jsx
import React, { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

import Overview from "./Overview";
import MyRegistrations from "./MyRegistrations";
import Explore from "./Explore";
import StudentSettings from "./StudentSettings";
import UpcomingEvents from "./UpcomingEvents";

export default function StudentDashboard({ goBack }) {
  const [page, setPage] = useState("overview");

  const pages = {
    overview: <Overview />,
    myregistrations: <MyRegistrations />,
    upcoming: <UpcomingEvents />,
    explore: <Explore />,
    settings: <StudentSettings />,
  };

  return (
    <DashboardLayout
      page={page}
      setPage={setPage}
      goBack={goBack}
      userName="Student"
      sidebarType="student"
    >
      {pages[page] || <Overview />}
    </DashboardLayout>
  );
}
