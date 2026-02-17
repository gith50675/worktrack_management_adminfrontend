import React, { useEffect, useState } from "react";
import "./TaskSummary.css";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { FiMoreVertical, FiFilter, FiChevronDown, FiClock } from "react-icons/fi";

const TaskSummary = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTasks(search);
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchTasks = async (query = "") => {
    try {
      const response = await api.get(
        `admin_app/tasks/${query ? `?search=${query}` : ""}`
      );
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="task-summary-container">
      <div className="task-summary-card-wrapper">
        <div className="table-top-bar">
          <h3>Task Summary</h3>
          <div className="top-bar-actions">
            <button className="filter-button">
              <FiFilter /> Filter
            </button>
            <div className="current-day-badge">
              <FiClock /> Today <FiChevronDown />
            </div>
          </div>
        </div>

        <div className="task-table-scroll">
          <table className="task-ref-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Assigned By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="task-name-col">{task.task_name}</td>
                    <td>
                      <span className={`prio-badge ${task.priority?.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td>{formatDate(task.due_date)}</td>
                    <td className={`status-text ${task.status?.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </td>
                    <td>Project Lead</td>
                    <td className="actions-cell">
                      <div className="action-menu-container">
                        <button className="more-btn" onClick={(e) => toggleMenu(e, task.id)}>
                          <FiMoreVertical />
                        </button>
                        {openMenuId === task.id && (
                          <div className="dropdown-menu">
                            <div className="menu-item" onClick={() => navigate(`/taskdetails/${task.id}`)}>View</div>
                            <div className="menu-item" onClick={() => navigate(`/taskdetails/${task.id}`)}>Edit</div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
