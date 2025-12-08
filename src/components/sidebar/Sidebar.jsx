import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

// logo path you uploaded (project-local path from your environment)
const logoUrl = "/mnt/data/Screenshot 2025-11-24 103401.png";

import { IoDocumentOutline, IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FaCrown } from "react-icons/fa6";
import { RiPieChart2Fill } from "react-icons/ri";
import { HiClock } from "react-icons/hi2";
import { MdOutlineWarning } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { AiOutlineBranches } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { PiKanban } from "react-icons/pi";
import { GoFileDirectory } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";

export default function Sidebar() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // pull role from localStorage (your auth flow may be different)
    const role = localStorage.getItem("user_role");
    setUserRole(role);
  }, []);

  const isAdmin = userRole === "admin" || userRole === "super_admin";

  const logout = () => {
    // basic logout behaviour (replace with your API call if needed)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    // optional: clear cookie if you set one
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/", { replace: true });
  };

  return (
    <aside className="sidebar-container" aria-label="Main sidebar">
      <div className="sidebar-logo">
        <img src={logoUrl} alt="Logo" />
      </div>

      <div className="sidebar-menus">
        <NavLink to="/dashboard" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
          {/* <IoHomeOutline className="menu-icon" /> */}
          <img className="menu-icon" src="Vector.svg" alt="" />
          <span className="menu-text">Dashboard</span>
        </NavLink>

        <NavLink to="/tasks" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
          {/* <FaRegUser className="menu-icon" /> */}
          <IoDocumentOutline className="menu-icon" />
          <span className="menu-text">Tasks</span>
        </NavLink>

        <NavLink to="/kanbanBoard" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
          {/* <LuUsers className="menu-icon" /> */}
          <PiKanban className="menu-icon" />
          <span className="menu-text">Kanban Board</span>
        </NavLink>

        <NavLink to="/projects" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
          {/* <FaCrown className="menu-icon" /> */}
          <GoFileDirectory className="menu-icon" />
          <span className="menu-text">Projects</span>
        </NavLink>

        
          <NavLink to="/productivity" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
            {/* <AiOutlineBranches className="menu-icon" /> */}
            <img className="menu-icon" src="Group (1).svg" alt="" />
            <span className="menu-text">Productivity</span>
          </NavLink>
        

        <NavLink to="/report" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
          {/* <RiPieChart2Fill className="menu-icon" /> */}
          <HiOutlineDocumentReport className="menu-icon" />
          <span className="menu-text">Reports</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
          {/* <HiClock className="menu-icon" /> */}
          <IoSettingsOutline className="menu-icon"/>
          <span className="menu-text">Settings</span>
        </NavLink>

        {/* <NavLink to="/expired" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
          <MdOutlineWarning className="menu-icon" />
          <span className="menu-text">Expired</span>
        </NavLink>

        {isAdmin && (
          <NavLink to="/add/branch/admin" className={({ isActive }) => `menu-box ${isActive ? "active" : ""}`}>
            <IoMdSettings className="menu-icon" />
            <span className="menu-text">Branch Admin</span>
          </NavLink>
        )} */}
      </div>

      <div className="sidebar-logout" onClick={logout} role="button" tabIndex={0}>
        <div className="menu-box logout">
          <TbLogout className="menu-icon" />
          <span className="menu-text">Log out</span>
        </div>
      </div>
    </aside>
  );
}
