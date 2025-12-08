// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPage from "../../pages/NavbarPage";
import SidebarPage from "../../pages/SidebarPage";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />

      <aside className={`app-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <SidebarPage />
      </aside>

      <header className="app-navbar">
        <NavbarPage toggleSidebar={toggleSidebar} />
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
