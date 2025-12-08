import React from 'react'
import "./WorkDetails.css"
import {NavLink} from "react-router-dom"

const WorkDetails = () => {
  const workdetail=[
    {icon:"dates icon.svg",name:"john",hour:"6hr 56m",time:"8hr"},
    {icon:"dates icon.svg",name:"john",hour:"6hr 56m",time:"8hr"},
    {icon:"dates icon.svg",name:"john",hour:"6hr 56m",time:"8hr"}
  ]
  return (
    <>
    <div className="work-detail-container">
      <div className="detail-head">
        <div className="head-left-side">
          <div className="icon-at">
            <img src="\Group.svg" alt="" /> 
            <p>At Work</p> 
          </div>
          <NavLink to="/workersdetail">
          <div className="viewall-head">view all</div>
          </NavLink>
                  
        </div>
        
        <div className="head-right-side">
          <img src="\dates icon.svg" alt="" />
          <p>Today</p>
        </div>
      </div>
      <div className="user-atwork-head">
        <div className="user-head">User</div>
        <div className="at-work-head">At Work</div>
      </div>
      {workdetail.map((Wrkdtl,index)=>(
           <div className="user-work">
        <div className="left-user">
          <div className="user">
            <img src="\user icon.svg" alt="" />
            <p>John</p>
          </div>
        </div>
        <div className='right-atwork'>
          <div className="time-hour">
            <p>6hr 8m</p>
            <div className="bar-time">
              <div className="bar-container">
                <div className="bar-box" style={{ width: "100%" }}></div>
              </div>
              <div className='bar-value'>8hr</div>
            </div>
            
          </div>

        </div>
      </div>

      ))}
   
    </div>
    </>
  )
}

export default WorkDetails
