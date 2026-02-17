import React, { useState, useEffect } from "react";
import "./NewTask.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../api/api";

const NewTask = ({ isModal = false, onClose, onSuccess }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    workingHours: "",
    priority: "",
  });

  // 🔹 Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("admin_app/users/list/");
        setUsers(res.data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit task
  const handleSubmit = async () => {
    if (
      !formData.taskName ||
      !formData.priority ||
      !formData.dueDate ||
      !formData.assignedTo
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        task_name: formData.taskName,
        description: formData.description,
        due_date: formData.dueDate,
        working_hours: Number(formData.workingHours || 0),
        priority: formData.priority,
        status: "Pending",
        assigned_to: [Number(formData.assignedTo)],
      };

      const res = await api.post("admin_app/tasks/add/", payload);

      if (res.status === 201) {
        toast.success("Task added successfully");
        if (isModal) {
          onSuccess && onSuccess();
        } else {
          navigate("/tasks");
        }
      }
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isModal ? "new-task-modal-body" : "new-task-page-container"} animate-fade-in`}>
      {!isModal && (
        <div className="new-task-header animate-slide-up">
          <h2 className="new-task-title">Create New Task</h2>
          <p className="new-task-subtitle">Fill in the details below to assign a new task.</p>
        </div>
      )}

      <div className={`newtask-container ${!isModal ? "animate-slide-up" : ""}`} style={{ animationDelay: '0.1s' }}>
        {/* LEFT */}
        <div className="newtask-form-card">
          <div className="form-section">
            <label className="form-label">Task Name *</label>
            <input
              type="text"
              name="taskName"
              className="newtask-input"
              placeholder="Enter task name"
              value={formData.taskName}
              onChange={handleChange}
            />

            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="description-input"
              placeholder="Add task description..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="newtask-form-card">
          <div className="form-section">
            <label className="form-label">Assigned To *</label>
            <select
              name="assignedTo"
              className="newtask-input"
              value={formData.assignedTo}
              onChange={handleChange}
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.first_name || u.email}
                </option>
              ))}
            </select>

            <div className="date-hour-grid">
              <div className="form-item">
                <label className="form-label">Due Date *</label>
                <input
                  type="date"
                  name="dueDate"
                  className="date-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-item">
                <label className="form-label">Est. Hours</label>
                <input
                  type="number"
                  name="workingHours"
                  className="esthour-input"
                  min="0"
                  placeholder="0"
                  value={formData.workingHours}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label className="form-label">Priority *</label>
            <select
              name="priority"
              className="newtask-input"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`${isModal ? "modal-actions-bar" : "form-actions-bar"} animate-slide-up`} style={{ animationDelay: '0.2s' }}>
        <button className="btn-cancel" onClick={isModal ? onClose : () => navigate("/tasks")}>
          {isModal ? "Close" : "Discard"}
        </button>

        <button className="btn-save" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>
    </div>
  );
};

export default NewTask;
