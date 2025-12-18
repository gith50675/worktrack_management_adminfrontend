import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeesProductivity.css";

const EmployeesProductivity = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin_app/employees_productivity", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDatas(data.users || []);
      })
      .catch((err) => {
        console.error("Failed to load employees", err);
      });
  }, []);

  const handleRowClick = (id) => {
    navigate(`/employeeproductivity/${id}`);
  };

  return (
    <div className="table-container">
      <table className="employees-table">
        <thead>
          <tr className="productivity-table-heading">
            <th className="employees-th">User</th>
            <th className="employees-th">Email</th>
            <th className="employees-th">Today</th>
            <th className="employees-th">Efficiency</th>
          </tr>
        </thead>

        <tbody>
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
                        style={{ width: `${emplydata.percent}%` }}
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
  );
};

export default EmployeesProductivity;
