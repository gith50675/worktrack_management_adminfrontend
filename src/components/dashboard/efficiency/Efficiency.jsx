import React from 'react'
import './Efficiency.css'

const Efficiency = () => {
  const eficbar=[
    {icon:"efficiency icon.svg",name:"Efficiency",percentage:"76%"},
    {icon:"activity icon.svg",name:"Activity",percentage:"96%"},
  ]
  return (
    <>
    <div className="bar">
      {eficbar.map((effic,index)=>(
        <div className="efficiency-activity-bar" key={index}>
          <div className="effici-activ-icon"><img src={effic.icon} alt="" /></div>
          <div className="name-percentage">
            {effic.name} <br />  <span>{effic.percentage}</span>
          </div>
        </div>
        
      ))}
    </div>
    
    </>
  )
}

export default Efficiency
