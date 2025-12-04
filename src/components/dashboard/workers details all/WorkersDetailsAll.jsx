import React from 'react'
import "./WorkersDetailsAll.css"

const WorkersDetailsAll = () => {
  return (
    <>
    <div className="workers-details-all-container">
      <div className="wokers-details-all-title-box">
        <div className="workers-detail-left">
          <div className="working-details">Dashboard</div>
          <div className="date-and-status">/Working Details</div>
        </div>
        <div className="workers-details-right">
          <div className="worker-detail-status">status</div>
          <div className="date-icon"><img src="/Vector (5).svg" alt="" /></div>
          <div className="worker-detail-dates">Today</div>
        </div>
      </div>
      <div className="workers-details-tables">
        <table className='dahboard-table' >
          <tr>
            <th className='dashboard-th'>User Name</th>
            <th className='dashboard-th'>Task Name</th>
            <th className='dashboard-th'>Due Date</th>
            <th className='dashboard-th'>Status</th>
            <th className='dashboard-th'>Working Hours</th>
            <th className='dashboard-th'>Prority</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>

       </table>
      
      </div>
    </div>
    </>
  )
}

export default WorkersDetailsAll

