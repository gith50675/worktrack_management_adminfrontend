import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

import "./EmployeesProductivity.css";

const EmployeesProductivity = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("admin_app/employees/productivity/")
      .then((res) => {
        setDatas(res.data.users || []);
      })
      .catch((err) => {
        setDatas([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRowClick = (id) => {
    navigate(`/employeeproductivity/${id}`);
  };

  if (loading) return (
    <div className="table-container animate-fade-in">
      <div className="loading-state">Initializing analytics...</div>
    </div>
  );

  return (
    <div className="table-container animate-fade-in">
      <div className="productivity-header">
        <h2>Team Productivity</h2>
      </div>
      <div className="employees-table-wrapper">
        <table className="employees-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Today</th>
              <th>Efficiency</th>
            </tr>
          </thead>

          <tbody >
            {datas.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              datas.map((emplydata) => (
                <tr
                  className="employee-name-datas"
                  key={emplydata.id}
                  onClick={() => handleRowClick(emplydata.id)}
                >
                  <td className="profile-td">
                    <img src="/employee pic.svg" alt={emplydata.name} />
                    <span className="img-span">{emplydata.name}</span>
                  </td>

                  <td>{emplydata.email}</td>
                  <td>{emplydata.time}</td>

                  <td>
                    <div className="efficiency-cell">
                      <div className="efficiency-bar-track">
                        <div
                          className="efficiency-bar-fill"
                          style={{ width: `${emplydata.percent || 0}%` }}
                        />
                      </div>
                      <span className="efficiency-text">
                        {emplydata.efficiency}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesProductivity;
