import React from 'react'
import "./TaskSummary.css"

const TaskSummary = () => {
  return (
    <div className='container'>
        <div className='task-summary-titlebox'>
            <p className='tasksummary-title'>Task Summary</p>
        </div>
        <div className="workers-details-tables">
        <table >
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Assigned By</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>

       </table>
      
      </div>
      <h1>JALAL</h1>
    </div>

  )
}

export default TaskSummary