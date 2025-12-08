import React from 'react'
import "./Status.css"

const Status = () => {
  const statuscard=[
    {title:"Total Projects",icon:"total project icon.svg",count:"45"},
    {title:"Active Tasks",icon:"active task icon.svg",count:"45"},
    {title:"Completed Tasks",icon:"completedtask icon.svg",count:"45"},
    {title:"Active Members",icon:"Group 21.svg",count:"45"}
  ]
  return (
    <>
    <div className="dasboard-title-status-container">
      <div className="dashboard-title">
        <div className="dashboard">Dasboard</div>
        <div className="calender"></div>
      </div>
      
      <div className="card-space">
        {statuscard.map((card,index)=>(
          <div className="status-div" key={index}>
              <div className="status-name">{card.title}</div>
              <div className="status-icon-count">
                <div className="status-icon"><img src={card.icon} alt="" /></div>
                <div className="status-count">{card.count}</div>
              </div>
          </div>
      ))}
      </div>
      
    </div>
    </>
  )
}

export default Status
