import React, { useState } from 'react'
import "./Navbar.css"
import { CiSearch } from 'react-icons/ci'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ toggleSidebar }) => {
    const [open, setOpen] = useState(false);
    return (
        <nav className="navbar">
            <div className='logo-box'>
                <RxHamburgerMenu className="hamburger-icon" onClick={toggleSidebar} />
                {/* <img className='tron-logo' src="/tron-sidebar-logo.png" alt="Logo" /> */}
                <img className='tron-logo2' src="/tron-logo-navbar.png" alt="Logo" />
            </div>
            <div className='search-box'>
                <CiSearch className='search-icon' />
                <form action="">
                    <input className='search-input' type="text" placeholder='search' />
                </form>
            </div>
            <div className='notification-box'>
                <NavLink to="/notifications" className={({ isActive }) => `notification-link ${isActive ? "active" : ""}`}>
                    <IoMdNotificationsOutline className='notification-icon' />
                    <p className='notification-text'>notifications</p>
                </NavLink>

                <div className="profile-container">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="profile-icon"
                        onClick={() => setOpen(!open)}
                    />

                    {open && (
                        <div className="dropdown-box">
                            <p>Profile</p>
                            <p>Settings</p>
                            <p className="logout">Logout</p>
                        </div>
                    )}
                </div>
            </div>




        </nav>
    )
}

export default Navbar
