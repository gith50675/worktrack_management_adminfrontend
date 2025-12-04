import React from 'react'
import "./RecentTasks.css"

const RecentTasks = () => {
  const recenttask=[
    {taskName:"Design homepage",taskStatus:"In Progress"},
    {taskName:"Update prod server",taskStatus:"To Do"},
    {taskName:"Prepare Presentation",taskStatus:"In Progress"},
    {taskName:"Test Responsive Layout",taskStatus:"In Progress"}
  ]
  return (
  <>
  <div className="recent-task-container">
    <div className="recent-title">
        <div className="recent-tasks">Recent Tasks</div>
        <div className="tasks-details">Details</div>
    </div>
    <hr />
    <div className="task-and-status">
      {recenttask.map((rectask,index)=>(
         <div className="task-status" key={index}>
            <div className="productivity-task">{rectask.taskName}</div>
            <div className="productivity-task-status">{rectask.taskStatus}</div>
         </div>

      ))}

    </div>
   

  </div>
  
  </>
  )
}

export default RecentTasks
