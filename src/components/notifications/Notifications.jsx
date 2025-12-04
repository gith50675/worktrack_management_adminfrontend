import React from 'react'
import "./Notifications.css"

const Notifications = () => {
     const notification=[
        {first_letter:"R",notific:"Ravi assigned you a task 'webdevelop'",time:"10m ago"},
        {first_letter:"R",notific:"Ravi assigned you a task 'webdevelop'",time:"10m ago"},
        {first_letter:"R",notific:"Ravi assigned you a task 'webdevelop'",time:"10m ago"},
        {first_letter:"R",notific:"Ravi assigned you a task 'webdevelop'",time:"10m ago"},
        {first_letter:"R",notific:"Ravi assigned you a task 'webdevelop'",time:"10m ago"},
        {first_letter:"R",notific:"Ravi assigned you a task 'webdevelop'",time:"10m ago"},
        {first_letter:"R",notific:"Ravi assigned you a task 'webdevelop'",time:"10m ago"}
    ]
  return (
   
    <>
    <div className="notifiation-container">
        <div className="notification-title">
            <div className="notification">Notifications</div>
            <div className="all-mark">
                <div className="all">All</div>
                <div className="mark">Mark All as Read</div>
            </div>
        </div>
        <div className="notification-table-space">
            {notification.map((notif,index)=>(
                <div className="notification-table" key={index}>
                    <div className="firstlet-notif">
                        <div className="first-letter">{notif.first_letter}</div>
                        <div className="notif">{notif.notific}</div>
                    </div>
                    <div className="notification-time">{notif.time}</div>
                </div>

            ))}
        </div>
        
    </div>
    </>
  )
}

export default Notifications
