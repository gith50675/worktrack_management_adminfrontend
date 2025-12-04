import React from 'react'
import "./Settings.css"

const Settings = () => {
  return (
    <>
    <div className="settings-container">
        <div className="settings-title">Settings</div>
        <button className='account-btn'>Account</button>
        <div className="profile-title">
            <div className="profile">Profile</div>
            <div className="set-details">Set your account details</div>
        </div>
        <div className="settings-form">
            <form action="">
                <div className="form">
                     <div className="settings-left-form">
                        <label className='settings-form-label' htmlFor="">First Name</label> <br />
                        <input className='settings-input' type="text" placeholder='john' />
                        <label className='settings-form-label' htmlFor="">Email</label> <br />
                        <input className='settings-input' type="text"  placeholder='john@gmail.com'/>
                    </div>
                    <div className="settings-right-form">
                        <label className='settings-form-label' htmlFor="">Last Name</label> <br />
                        <input className='settings-input' type="text" placeholder='christopher' />
                        <label className='settings-form-label' htmlFor="">Mobile Number</label> <br />
                        <input className='settings-input' type="text" placeholder='+91 6223232467' />
                    </div>
                    <div className="profile-pic">
                        <div className="pic">
                            <img src="profile.png" alt="" />
                        </div>
                        <div className="pic-add-delete">
                            <img className='edit-btn' src="edit-3-svgrepo-com.svg" alt="" />
                            <img className='edit-btn'  src="delete-3-svgrepo-com.svg" alt="" />
                        </div>
                    </div>
                </div>
                
                <button className='settings-save'>Save</button>
               
                 
            </form>

        </div>
    </div>
    </>
  
  )
}

export default Settings
