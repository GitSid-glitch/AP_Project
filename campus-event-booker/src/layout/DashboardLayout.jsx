// // src/layout/DashboardLayout.jsx
// import React from "react";
// import "../styles/dashboard.css";
// import "../styles/sidebar.css";
// import "../styles/topbar.css";

// // Use existing Sidebar (generic) and specific student sidebar
// import Sidebar from "../components/Sidebar";
// import StudentSidebar from "../components/StudentSidebar";
// import Topbar from "../components/Topbar";

// export default function DashboardLayout({
//   children,
//   page,
//   setPage,
//   goBack,
//   userName = "User",
//   sidebarType = "student",
//   links = null,
// }) {
//   const SidebarToUse = sidebarType === "student" ? StudentSidebar : Sidebar;

//   return (
//     <div className="dashboard-root">
//       <div className="dashboard-left">
//         <SidebarToUse page={page} setPage={setPage} links={links} />
//       </div>

//       <div className="dashboard-main">
//         <Topbar userName={userName} goBack={goBack} />
//         <main className="dashboard-content">{children}</main>
//       </div>
//     </div>
//   );
// }





// src/layout/DashboardLayout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/sidebar.css";
import "../styles/topbar.css";

// Use existing Sidebar (generic) and specific student sidebar
import Sidebar from "../components/Sidebar";
import StudentSidebar from "../components/StudentSidebar";
import Topbar from "../components/Topbar";

/**
 * DashboardLayout
 *
 * Props:
 *  - children
 *  - page, setPage
 *  - goBack          // optional
 *  - userName
 *  - sidebarType: "student" | "admin" (defaults to "student")
 *  - links: optional extra links
 *  - showSidebar: (boolean) default true
 *
 * Back button behavior:
 *  - If a custom goBack is passed, use that.
 *  - Else, if page !== "overview" and setPage exists => setPage("overview")
 *  - Else, fall back to router history: navigate(-1) or "/" if no history.
 */
export default function DashboardLayout({
  children,
  page,
  setPage,
  goBack,
  userName = "User",
  sidebarType = "student",
  links = null,
  showSidebar = true,
}) {
  const SidebarToUse = sidebarType === "student" ? StudentSidebar : Sidebar;
  const navigate = useNavigate();

  const handleGoBack = React.useCallback(() => {
    // 1) If parent provided a custom goBack, use it.
    if (typeof goBack === "function") {
      try {
        goBack();
      } catch (err) {
        console.error("goBack prop threw an error, falling back:", err);
      }
      return;
    }

    // 2) If we're on a sub-page inside the dashboard, go back to overview.
    if (page && page !== "overview" && typeof setPage === "function") {
      setPage("overview");
      return;
    }

    // 3) Otherwise, use normal router history (leave dashboard).
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // no history to go back to (e.g., opened directly in a new tab)
      navigate("/", { replace: true });
    }
  }, [goBack, page, setPage, navigate]);

  return (
    <div className="dashboard-root">
      {/* Only render left sidebar if showSidebar is true */}
      {showSidebar && (
        <div className="dashboard-left">
          <SidebarToUse page={page} setPage={setPage} links={links} />
        </div>
      )}

      <div
        className="dashboard-main"
        style={{
          // when sidebar is hidden, allow main to take full width
          marginLeft: showSidebar ? undefined : 0,
        }}
      >
        {/* Back button now uses the smarter handler */}
        <Topbar userName={userName} goBack={handleGoBack} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
