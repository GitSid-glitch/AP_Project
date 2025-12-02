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
 *  - goBack
 *  - userName
 *  - sidebarType: "student" | "admin" (defaults to "student")
 *  - links: optional extra links
 *  - showSidebar: (boolean) default true. If false, the left sidebar will not render.
 *
 * This makes it easy for pages (like Admin) to hide the built-in left sidebar
 * and use their own menu/drawer instead.
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
        <Topbar userName={userName} goBack={goBack} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
