import React from 'react'
import Navbar from "../components/navbar/Navbar"

const NavbarPage = ({ toggleSidebar }) => {
  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
    </div>
  )
}

export default NavbarPage