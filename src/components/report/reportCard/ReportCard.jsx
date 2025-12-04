import React from 'react'
import "./ReportCard.css"

const ReportCard = () => {
    const report=[
        { title: "Total Projects", count: 10},
        { title: "Active Tasks", count: 30},
        { title: "Completed Tasks", count: 25},
        { title: "Active Team", count: 15}
    ];

  return (
    <div className='report-title-container'>
        <div className='report-title'>
            <p className='report-text'>Report</p>
        </div>

        <div className='report-list'>
            {report.map((report, index) =>(
             <div className='reportCard-container' key={index}>
                <div className='reportCard-title'>{report.title}</div>
                <div className='reportCard-count'>{report.count}</div>
             </div>
            ))}

        </div>

    </div>
  )
}

export default ReportCard