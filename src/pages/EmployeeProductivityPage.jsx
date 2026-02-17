import React from 'react'
import EmployeeProductivity from "../components/productivity/employeeproductivity/EmployeeProductivity"
import RecentTasks from "../components/productivity/recent tasks/RecentTasks"
import ProductivityPieChart from "../components/productivity/productivity piechart/ProductivityPieChart"
import ProductivityAllTasks from "../components/productivity/productivityalltasks/ProductivityAllTasks"
import "./EmployeeProductivityPage.css"
import { useParams } from "react-router-dom";
import api from "../api/api";

const EmployeeProductivityPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    api.get(`admin_app/employees/${id}/productivity/`)
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => {
        const msg = err.response?.data?.error || err.message;
        setError(msg);
      })
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
