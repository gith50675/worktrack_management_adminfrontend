import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import "./EmployeeProductivity.css";

const Employeeproductivity = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/admin_app/employee_productivity/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmp(data.user);
      })
      .catch((err) => console.log("Failed to load employee", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!emp) return <p>No Data Found</p>;

  return (
    <div className="employee-status-container">
      <div className="employee-name-title">
        <div className="arrow">
          <NavLink to="/productivity">
            <img src="\backarrow 2.svg" alt="back" />
          </NavLink>
        </div>

        <div className="employee-name">
          <div className="name">{emp.name}</div>
          <div className="designation">{emp.email}</div>
        </div>
      </div>

      <hr className="employee-divider" />

      <div className="employee-status-space">
        <div className="employee-status-card">
          <div className="stats_name">Active Project</div>
          <div className="numbers">{emp.active_projects}</div>
        </div>

        <div className="employee-status-card">
          <div className="stats_name">Task In Progress</div>
          <div className="numbers">{emp.in_progress}</div>
        </div>

        <div className="employee-status-card">
          <div className="stats_name">Completed Tasks</div>
          <div className="numbers">{emp.completed}</div>
        </div>

        <div className="employee-status-card">
          <div className="stats_name">Idle Time Today</div>
          <div className="numbers">{emp.idle_today}</div>
        </div>
      </div>
    </div>
  );
};

export default Employeeproductivity;
