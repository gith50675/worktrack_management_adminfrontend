import React from 'react'
import EmployeeProductivity from "../components/productivity/employeeproductivity/EmployeeProductivity"
import RecentTasks from "../components/productivity/recent tasks/RecentTasks"
import ProductivityPieChart from "../components/productivity/productivity piechart/ProductivityPieChart"
import ProductivityAllTasks from "../components/productivity/productivityalltasks/ProductivityAllTasks"
import "./EmployeeProductivityPage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EmployeeProductivityPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/admin_app/employee_productivity/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load employee data");
        return res.json();
      })
      .then(setUserData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading employee productivity...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>No data found</p>;
// jalal
  return (
    <div className="employee-productivity-page">
      <EmployeeProductivity user={userData.user} />

      <div className="employee-productivity-main">
        <div className="employee-productivity-left">
<RecentTasks tasks={userData?.user?.recent_tasks || []} />
        </div>

        <div className="employee-productivity-right">
          <ProductivityPieChart
            data={[
              userData.productivity?.productive ?? 0,
              userData.productivity?.neutral ?? 0,
              userData.productivity?.unproductive ?? 0,
            ]}
            labels={["Productive", "Neutral", "Unproductive"]}
          />
        </div>
      </div>

      <ProductivityAllTasks tasks={userData.tasks || []} />
    </div>
  );
};

export default EmployeeProductivityPage
