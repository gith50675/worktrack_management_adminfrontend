import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Employeeproductivity.css"

const Employeeproductivity = () => {
    const employeestatus=[
        {title:"Active Project",count:"30"},
        {title:"Task In Progress",count:"34"},
        {title:"Completed Tasks",count:"17"},
        {title:"Idle Time Today",count:"30"},
    ]
  return (
    <>
    <div className="employee-status-container">
         <div className="employee-name-title">
            <div className="arrow">
            <NavLink to="/productivity"><img src="Backarrow.svg" alt="" /></NavLink>   
            </div>

            <div className="employee-name">
                <div className="name">John</div>
                <div className="designation">Python developer</div>
            </div>
         </div>
         <hr />
         <div className="employee-status-space">
            {employeestatus.map((emplystat,index)=>(
                <div className="employee-status-card" key={index}>
                    <div className="stats_name">{emplystat.title}</div>
                    <div className="numbers">{emplystat.count}</div>
                </div>

            ))}

         </div>
         
         
         
    </div>
   

    </>
  )
}

export default Employeeproductivity
