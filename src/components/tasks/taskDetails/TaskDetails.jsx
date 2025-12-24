import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskDetails.css";
import api from "../../../api/api";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const response = await api.get(`admin_app/view_tasks`);
      const foundTask = response.data.tasks.find(
        (t) => t.id === Number(id)
      );
      setTask(foundTask);
    } catch (error) {
      console.error("Failed to load task", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div className="taskdetails-page">
      <div className="taskdetails-titlebox">
        <p className="taskdetails-text">Task Details</p>
      </div>

      <div className="taskdetails-grid">
        <div className="task-left">
          <div className="section">
            <label className="label">Task Name</label>
            <input
              className="taskname-input"
              value={task.task_name}
              disabled
            />
          </div>

          <div className="section">
            <label className="label">Description</label>
            <textarea
              className="textarea"
              rows="6"
              value={task.description || ""}
              disabled
            />
          </div>
        </div>

        <aside className="task-right">
          <div className="right-block">
            <div className="mini-label">Assigned to</div>
            <div className="right-value">{task.assigned_by}</div>
          </div>

          <div className="two-col">
            <div>
              <div className="mini-label">Priority</div>
              <div className={`priority-badge ${task.priority.toLowerCase()}`}>
                {task.priority}
              </div>
            </div>

            <div>
              <div className="mini-label">Due Date</div>
              <div className="right-value">{task.due_date}</div>
            </div>
          </div>

          <div className="two-col">
            <div>
              <div className="mini-label">Status</div>
              <div className="right-value">{task.status}</div>
            </div>

            <div>
              <div className="mini-label">Effort Hours</div>
              <div className="right-value">
                {task.working_hours || "—"}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="action-row">
        <button className="btn cancel" onClick={() => navigate("/tasks")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
