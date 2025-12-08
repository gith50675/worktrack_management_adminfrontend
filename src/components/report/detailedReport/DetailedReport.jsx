import React from 'react'
import "./DetailedReport.css"

const DetailedReport = () => {
  return (
    <>
    <div className='detailed-report-title'>
            <div className='detailed-report-head'>Detailed Report</div>
            <div className="report-details-box">
            <button className='detailed-report-btn'> <img src="Group 151.svg" alt="" /> <p>Project</p></button>
            <button className='detailed-report-btn'> <img src="Vector (1).svg" alt="" /><p>Team Member</p></button>
            <button className='detailed-report-btn'> <img src="Vector (2).svg" alt="" /><p>Date</p></button>
            <button className='detailed-report-btn'> <img src="Vector (3).svg" alt="" /><p>Status</p></button>
            </div>
            <div className="report-details-box">
                <button className='detailed-report-btn'><img src="Vector (4).svg" alt="" />Export</button>
            </div>
            
      </div>

                     <table >
          <tr>
            <th>Project Name</th>
            <th>Task Count</th>
            <th>Dead Line</th>
            <th>Status</th>
            <th>Completed</th>
          </tr>

       </table>
      

    </>
  )
}

export default DetailedReport