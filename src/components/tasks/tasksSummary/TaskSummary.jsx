import React, { useEffect, useRef, useState } from "react";
import "./TaskSummary.css";
import api from "../../../api/api";

const TaskSummary = () => {
  const [tasks, setTasks] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("admin_app/view_tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="container">
      <div className="task-summary-titlebox">
        <p className="tasksummary-title">Task Summary</p>
      </div>

      <table>
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
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.task_name}</td>

              <td>
                <span className={`priority-pill ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </td>

              <td>{task.due_date}</td>

              <td
                className={`status ${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {task.status}
              </td>

              <td>{task.assigned_by}</td>

              {/* ACTION MENU */}
              <td className="actions" ref={menuRef}>
                <button
                  className="action-menu"
                  onClick={() => toggleMenu(index)}
                >
                  ⋮
                </button>

                {openMenuIndex === index && (
                  <div className="dropdown">
                    <button>View</button>
                    <button>Edit</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskSummary;
