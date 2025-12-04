import React from 'react'
import EmployeeProductivity from "../components/productivity/employeeproductivity/EmployeeProductivity"
import RecentTasks from "../components/productivity/recent tasks/RecentTasks"
import ProductivityPieChart from "../components/productivity/productivity piechart/ProductivityPieChart"
import ProductivityAllTasks from "../components/productivity/productivityalltasks/ProductivityAllTasks"
const EmployeeProductivityPage = () => {
  return (
    <div>
      <EmployeeProductivity/>
       <div style={{ display: "flex" ,justifyContent:"space-between"}}>
              <div style={{ flex: "0 0 auto" }}>
                <RecentTasks/>
              </div>
              <div style={{  }}>
                <ProductivityPieChart/>
              </div>
        </div>
        <ProductivityAllTasks/>


      
      
    </div>
  )
}

export default EmployeeProductivityPage
