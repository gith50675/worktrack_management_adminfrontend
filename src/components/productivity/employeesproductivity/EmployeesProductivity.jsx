import React from 'react'
import { NavLink } from 'react-router-dom'
import "./EmployeesProductivity.css"

const EmployeesProductivity = () => {
  const datas=[
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"},
    {image:"/employee pic.svg",name:"John",email:"john@gmail.com",time:"6hr 54m",efficiency:"8hr"}
    
  ]
  return (
    <>
    <div className="table-container">
      <table className='employees-table'>
      <tr className='productivity-table-heading'>
        <th className='employees-th'>User</th>
        <th className='employees-th'>Email</th>
        <th className='employees-th'>Today</th>
        <th className='employees-th'>Efficiency</th>
      </tr>
    
        {datas.map((emplydata,index)=>(
          <tr className='employee-name-datas' key={index}>
            <NavLink to="/employeeproductivity">
            <td className='profile-td'><img src={emplydata.image} alt="" /><span className='img-span'>{emplydata.name}</span></td>
            </NavLink>
            <td>{emplydata.email}</td>
            <td>{emplydata.time}</td>
            <td>{emplydata.efficiency}</td>
          </tr>

        ))}


      
    </table>

    </div>
    
    </>
  )
}

export default EmployeesProductivity
