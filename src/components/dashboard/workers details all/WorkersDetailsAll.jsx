import React from "react";
import "./WorkersDetailsAll.css";

const rows = [
  {
    img:"photo icon male.svg",
    userName: "John",
    taskName: "Design Landing Page",
    dueDate: "Jul 17",
    status: "In Progress",
    workingHours: "6h 48m",
    priority: "High",
  },
  {
    img:"photo icon female.svg",
    userName: "Jessica",
    taskName: "Prepare Docs",
    dueDate: "Jul 14",
    status: "Pending",
    workingHours: "6h 40m",
    priority: "Medium",
  },
  {
    img:"photo icon male.svg",
    userName: "David",
    taskName: "Fix login bug",
    dueDate: "Jul 18",
    status: "To Do",
    workingHours: "6h 11m",
    priority: "Low",
  },
  {
    img:"photo icon male.svg",
    userName: "John",
    taskName: "Report Chart",
    dueDate: "Jul 15",
    status: "Task Done",
    workingHours: "6h 48m",
    priority: "High",
  },
  {
    img:"photo icon female.svg",
    userName: "Jessica",
    taskName: "Design Landing Page",
    dueDate: "Jul 14",
    status: "Pending",
    workingHours: "6h 40m",
    priority: "Medium",
  },
  {
    img:"photo icon male.svg",
    userName: "David",
    taskName: "Prepare Docs",
    dueDate: "Jul 18",
    status: "To Do",
    workingHours: "6h 11m",
    priority: "Low",
  },
  {
    img:"photo icon male.svg",
    userName: "John",
    taskName: "Fix login bug",
    dueDate: "Jul 15",
    status: "Task Done",
    workingHours: "6h 48m",
    priority: "High",
  },
];

const WorkersDetailsAll = () => {
  return (
    <>
      <div className="workers-details-all-container">
        <div className="wokers-details-all-title-box">
          <div className="workers-detail-left">
            <div className="working-details">Dashboard</div>
            <div className="date-and-status">/ Working Details</div>
          </div>
          <div className="workers-details-right">
            <div className="worker-detail-status">Status</div>
            <div className="date-icon">
              <img src="/Vector (5).svg" alt="calendar" />
            </div>
            <div className="worker-detail-dates">Today</div>
          </div>
        </div>

        <div className="workers-details-tables">
          <table className="dashboard-table">
            <thead>
              <tr className="dashboard-header-row">
                <th className="dashboard-th">User Name</th>
                <th className="dashboard-th">Task Name</th>
                <th className="dashboard-th">Due Date</th>
                <th className="dashboard-th">Status</th>
                <th className="dashboard-th">Working Hours</th>
                <th className="dashboard-th">Priority</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row,index) => (
                <tr key={index} className="dashboard-tr">
                  <td className="dashboard-td user-cell">
                    <div className="avatar">
                      <img src={row.img} alt="" />
                    </div>
                    <div className="user-name">{row.userName}</div>
                  </td>

                  <td className="dashboard-td task-cell">{row.taskName}</td>
                  <td className="dashboard-td">{row.dueDate}</td>

                  <td className="dashboard-td">
                    <span
                      className={`status-pill ${row.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="dashboard-td">{row.workingHours}</td>

                  <td className="dashboard-td">
                    <span
                      className={`priority-pill ${row.priority.toLowerCase()}`}
                    >
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WorkersDetailsAll;
