import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import api from "../../../api/api";
import "./EmployeeProductivity.css";

const Employeeproductivity = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`admin_app/employees/${id}/productivity/`)
      .then((res) => {
        setEmp(res.data.user);
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

      <div className="employee-status-space animate-slide-up">
        {[
          { label: "Active Projects", val: emp.active_projects, icon: "📊", color: "#b279c5" },
          { label: "Tasks In Progress", val: emp.in_progress, icon: "⚡", color: "#9333ea" },
          { label: "Completed Tasks", val: emp.completed, icon: "✅", color: "#10b981" },
          { label: "Idle Time Today", val: emp.idle_today, icon: "⏳", color: "#f59e0b" }
        ].map((card, idx) => (
          <div className="employee-status-card" key={idx} style={{ borderLeft: `4px solid ${card.color}` }}>
            <div className="card-header">
              <span className="card-icon">{card.icon}</span>
              <div className="stats_name">{card.label}</div>
            </div>
            <div className="numbers">{card.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employeeproductivity;
