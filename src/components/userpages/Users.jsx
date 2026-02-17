import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Users.css";

import SignupModal from "../signup/SignupModal";

const Users = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/admin_app/users/");
      setRows(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ DELETE HANDLER
  const handleDeleteUser = async (Id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/admin_app/users/${Id}/delete/`);
      toast.success("User deleted successfully");

      setRows((rows) => rows.filter((row) => row.user_id !== Id));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <p className="table-loading">Loading...</p>;
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>Users</h2>

        <button
          className="add-user-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Add User
        </button>
      </div>

      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
      />

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Task Name</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Working Hours</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.user_id}>
                <td className="user-cell"
                  onClick={() => navigate(`/employeeproductivity/${row.user_id}`)}
                  style={{ cursor: 'pointer' }}>
                  <img
                    src={row.avatar || "/default-avatar.png"}
                    alt={row.user_name}
                    className="avatar"
                  />
                  <span>{row.user_name}</span>
                </td>

                <td>{row.task_name}</td>
                <td>{row.due_date}</td>

                <td>
                  <span
                    className={`status ${row.status
                      .replace(" ", "-")
                      .toLowerCase()}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td>{row.working_hours}</td>

                <td>
                  <span className={`priority ${row.priority.toLowerCase()}`}>
                    {row.priority}
                  </span>
                </td>

                <td className="action-delete">
                  <img
                    src="/delete.svg"
                    alt="delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteUser(row.user_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
