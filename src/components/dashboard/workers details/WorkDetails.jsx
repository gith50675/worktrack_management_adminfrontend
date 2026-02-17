import React, { useEffect, useState } from 'react'
import "./WorkDetails.css"
import { NavLink, useNavigate } from "react-router-dom"
import api from "../../../api/api"

const WorkDetails = () => {

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await api.get("admin_app/tasks/")

      // convert tasks → users (first assigned user shown)
      const formatted = res.data.tasks.map(t => {
        const assignedUser = t.assigned_to?.length > 0 ? t.assigned_to[0] : null;
        return {
          id: assignedUser?.id || null,
          name: assignedUser
            ? `${assignedUser.first_name} ${assignedUser.last_name}`
            : "Unassigned",
          hour: t.working_hours ? `${t.working_hours}h` : "0h",
          time: "8h",
          fill: t.working_hours
            ? `${Math.min((t.working_hours / 8) * 100, 100)}%`
            : "0%"
        };
      })

      setRows(formatted.slice(0, 3))   // only 3 users like your UI
    } catch (err) {
      console.log("Failed to load work details", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="work-detail-container">
      <div className="detail-head">
        <div className="head-left-side">
          <div className="icon-at">
            <img src="\Group.svg" alt="At work" />
            <p>At Work</p>
          </div>
          <NavLink to="/users">
            <div className="viewall-head">View all</div>
          </NavLink>
        </div>

        <div className="head-right-side">
          <img src="\dates icon.svg" alt="date" />
          <p>Today</p>
        </div>
      </div>

      <div className="user-atwork-head">
        <div className="user-head">User</div>
        <div className="at-work-head">At Work</div>
      </div>

      {rows.map((row, index) => (
        <div className="user-work" key={index}>
          <div className="left-user"
            onClick={() => row.id && navigate(`/employeeproductivity/${row.id}`)}
            style={{ cursor: row.id ? 'pointer' : 'default' }}>
            <div className="user">
              <img src="\user icon.svg" alt={row.name} />
              <p>{row.name}</p>
            </div>
          </div>

          <div className='right-atwork'>
            <div className="time-hour">
              <p>{row.hour}</p>

              <div className="bar-time">
                <div className="bar-container">
                  <div className="bar-box" style={{ width: row.fill }} />
                </div>
                <div className='bar-value'>{row.time}</div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WorkDetails
