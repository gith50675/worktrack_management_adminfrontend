import React, { useState } from "react";
import "./NewTask.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/api";

const NewTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    assignedBy: "",
    dueDate: "",
    workingHours: "",
    priority: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("task-name", formData.taskName);
    data.append("description", formData.description);
    data.append("assigned-by", formData.assignedBy);
    data.append("due-date", formData.dueDate);
    data.append("working-hours", formData.workingHours);
    data.append("priority", formData.priority);
    data.append("status", "Pending");

       try {
      const response = await api.post("admin_app/add_tasks", data);
      const result = response.data;

      if (result.message) {
        toast.success("Task added successfully");
        navigate("/tasks");
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  return (
    <>
      <div className="newtask-title">New Task</div>

      <div className="newtask-container">
        <div className="newtask-leftform">
          <label>Task Name</label>
          <input
            type="text"
            name="taskName"
            className="newtask-input"
            value={formData.taskName}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            className="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="newtask-rightform">
          <label>Assigned to</label>
          <input
            type="text"
            name="assignedBy"
            className="newtask-input"
            value={formData.assignedBy}
            onChange={handleChange}
          />

          <div className="date-hour">
            <div>
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Est.hour</label>
              <input
                type="text"
                name="workingHours"
                className="esthour"
                placeholder="00hr"
                value={formData.workingHours}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Priority</label>
          <select
            name="priority"
            className="newtask-input"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="form-buttons">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </>
  );
};

export default NewTask;
