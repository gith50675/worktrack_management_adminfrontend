import React, { useState } from 'react'
import "./Navbar.css"
import { CiSearch } from 'react-icons/ci'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className='logo-box'>
        <img className='tron-logo' src="tron...-02.png" alt="" />
        <img className='tron-logo2' src="tron...-01.png" alt="" />
      </div>

      <div className='search-box'>    
        <CiSearch className='search-icon' />
        <form action="">
          <input className='search-input' type="text" placeholder='search' />
        </form>
      </div>

      <div className='notification-box'>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `notification-link ${isActive ? "active" : ""}`
          }
        >
          <IoMdNotificationsOutline className='notification-icon' /> 
          <p className='notification-text'>Notifications</p>
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
