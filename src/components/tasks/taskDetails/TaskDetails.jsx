import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskDetails.css";
import api from "../../../api/api";
import { toast } from "react-hot-toast";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [form, setForm] = useState(null);
  const [users, setUsers] = useState([]);       // ⬅ all users
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskDetails();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (task) setForm(task);
  }, [task]);

  // -------- GET SINGLE TASK --------
  const fetchTaskDetails = async () => {
    try {
      const response = await api.get(`admin_app/tasks/${id}/update/`);
      setTask(response.data);
    } catch (error) {
      console.error("Failed to load task", error);
    } finally {
      setLoading(false);
    }
  };

  // -------- GET ALL USERS (for assign select) --------
  const fetchUsers = async () => {
    try {
      const res = await api.get("admin_app/users/");
      // your api must return: [{id:1, name:"John"}, ...]
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  // -------- SAVE --------
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("task-name", form.task_name);
      formData.append("priority", form.priority);
      formData.append("due-date", form.due_date);
      formData.append("status", form.status);
      formData.append("description", form.description);
      formData.append("working-hours", form.working_hours);

      form.assigned_to.forEach(u =>
        formData.append("assigned-by[]", u.id)
      );

      await api.post(`admin_app/tasks/${id}/update/`, formData);
      alert("Task Updated Successfully");
      navigate("/tasks");

    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  if (loading || !form) return <p>Loading...</p>;

  return (
    <div className="taskdetails-page">

      <nav className="header-strip">
        Task Details
      </nav>

      <div className="task-main-container">

        {/* LEFT SIDE */}
        <div className="task-left">

          <div className="field-block">
            <label>Task Name</label>
            <input
              value={form.task_name}
              onChange={(e) => setForm({ ...form, task_name: e.target.value })}
            />
          </div>

          <div className="field-block">
            <label>Description</label>
            <textarea
              value={form.description || ""}
              rows="5"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="discussion-block">
            <label>Discussion</label>
            <div className="discussion-card">
              <div className="avatar">D</div>
              <textarea
                placeholder="Add a comment"
                className="comment-box"
                value={form.discussion || ""}
                onChange={(e) => setForm({ ...form, discussion: e.target.value })}
              />
            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="task-right">

          {/* ASSIGNED USERS */}
          <div className="right-row">
            <p className="label">Assigned To</p>

            <select
              className="value"
              value={form.assigned_to[0]?.id || ""}
              onChange={(e) => {
                const selectedUser = users.find(u => u.id === Number(e.target.value));
                setForm({
                  ...form,
                  assigned_to: selectedUser ? [selectedUser] : []
                });
              }}
            >
              <option value="">Select User</option>

              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name || user.full_name || `${user.first_name || ""} ${user.last_name || ""}` || user.username}
                </option>
              ))}
            </select>
          </div>


          {/* PRIORITY + DATE */}
          <div className="two-col">
            <div className="first-col">
              <p className="label">Priority</p>

              <select
                className="value"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

            </div>

            <div>
              <p className="label">Due Date</p>
              <input
                type="date"
                className="value"
                value={form.due_date || ""}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              />
            </div>
          </div>

          {/* STATUS + HOURS */}
          <div className="two-col">
            <div className="first-col">
              <p className="label">Status</p>

              <select
                className="value"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

            </div>

            <div>
              <p className="label">Effort Hours</p>
              <input
                className="value"
                value={form.working_hours || ""}
                onChange={(e) => setForm({ ...form, working_hours: e.target.value })}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button className="cancel" onClick={() => navigate("/tasks")}>
          Cancel
        </button>

        <button className="save" onClick={handleSave}>
          Save
        </button>
      </div>

    </div>
  );
};

export default TaskDetails;
