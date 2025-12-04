import React, { useState } from 'react'
import "./Navbar.css"
import { CiSearch } from 'react-icons/ci'
import { IoMdNotificationsOutline } from 'react-icons/io'


const Navbar = () => {
    const [open, setOpen] = useState(false);
  return (
    <nav>
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
                <IoMdNotificationsOutline className='notification-icon' />
                <p className='notification-text'>notifications</p>
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
            <div className="hell">hello hai how are you</div>

            

     </nav>
  )
}

export default Navbar