import React from 'react'
import ReportCard from '../components/report/reportCard/ReportCard'
import ReportGraph from '../components/report/reportGraph/ReportGraph'
import DetailedReport from '../components/report/detailedReport/DetailedReport'

const ReportPage = () => {
  return (
    <div>
        <ReportCard />
        <ReportGraph />
        <DetailedReport />
    </div>
  )
}

export default ReportPage