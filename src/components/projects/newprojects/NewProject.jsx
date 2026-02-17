import React, { useRef, useEffect, useState } from "react";
import "./NewProject.css";
import { toast } from "react-toastify";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

const NewProject = ({ isModal = false, onClose, onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    project_name: "",
    company_name: "",
    description: "",
    assigned_by: "",
    due_date: "",
    est_hr: "",
    priority: "Medium",
    links: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [users, setUsers] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("admin_app/users/list/");
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAttachmentClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
    e.target.value = null;
  };

  const handleRemoveAttachment = (i) => {
    setAttachments(prev => prev.filter((_, index) => index !== i));
  };

  const handleLinkIconClick = () => {
    if (formData.links?.trim() && !showLinkInput) {
      const url = formData.links.startsWith("http")
        ? formData.links
        : `https://${formData.links}`;
      window.open(url, "_blank");
      return;
    }
    setShowLinkInput(s => !s);
  };

  const validateRequired = () => {
    const { project_name, company_name, description, assigned_by, due_date, est_hr } = formData;
    if (!project_name || !company_name || !description || !assigned_by || !due_date || !est_hr) {
      toast.error("All mission-critical fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateRequired()) return;

    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("project_name", formData.project_name);
      payload.append("company_name", formData.company_name);
      payload.append("description", formData.description);
      payload.append("assigned_by", formData.assigned_by);
      payload.append("due_date", formData.due_date);
      payload.append("est_hr", formData.est_hr);
      payload.append("priority", formData.priority);
      payload.append("links", formData.links);

      attachments.forEach(f => payload.append("attachments", f));

      const res = await api.post("admin_app/projects/add/", payload);
      toast.success(res.data?.message || "Project launched successfully!");

      if (isModal) {
        onSuccess && onSuccess();
      } else {
        navigate("/projects");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initialize project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isModal ? "new-project-modal-body" : "new-project-full-page"} animate-fade-in`}>
      {!isModal && <div className="newproject-title">Initialize New Project</div>}

      <form className={`newproject-container ${!isModal ? "animate-slide-up" : ""}`} onSubmit={handleSubmit}>
        <div className="newproject-leftform">
          <div className="newproject-form-group">
            <label>Project Name</label>
            <input
              type="text"
              className="newproject-input"
              name="project_name"
              placeholder="Enter project name..."
              value={formData.project_name}
              onChange={handleChange}
            />
          </div>

          <div className="newproject-form-group">
            <label>Company Name</label>
            <input
              type="text"
              className="newproject-input"
              name="company_name"
              placeholder="Client or Company Name"
              value={formData.company_name}
              onChange={handleChange}
            />
          </div>

          <div className="newproject-form-group">
            <label>Detailed Description</label>
            <textarea
              className="description"
              name="description"
              placeholder="Outline project goals, scope, and key deliverables..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="newproject-rightform">
          <div className="newproject-form-group">
            <label>Assign Project Lead</label>
            <select
              name="assigned_by"
              className="newproject-input"
              value={formData.assigned_by}
              onChange={handleChange}
            >
              <option value="">Select an available user</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.first_name || u.email}
                </option>
              ))}
            </select>
          </div>

          <div className="date-hour">
            <div className="newproject-form-group">
              <label>Deadline</label>
              <input
                type="date"
                className="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
              />
            </div>

            <div className="newproject-form-group">
              <label>Est. Investment (Hours)</label>
              <input
                type="number"
                className="esthour"
                name="est_hr"
                placeholder="24"
                value={formData.est_hr}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="newproject-form-group">
            <label>Priority Level</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="priority-select"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <div className="priority-link-project">
            <div className="newproject-form-group">
              <label>Resource Links & Attachments</label>
              <div className="attachment-block">
                <button
                  type="button"
                  className="project-attachment-link"
                  onClick={handleLinkIconClick}
                  title={formData.links ? "Open reference link" : "Add resource link"}
                >
                  <img src="/link icon.svg" alt="link" className="icon-img" />
                </button>

                {showLinkInput && (
                  <input
                    type="url"
                    name="links"
                    value={formData.links}
                    placeholder="https://resource-link.com"
                    onChange={handleChange}
                    className="small-link-input"
                  />
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  multiple
                />
                <button
                  type="button"
                  className="project-attachment-link"
                  onClick={handleAttachmentClick}
                  title="Attach documentation"
                >
                  <img src="/link.svg" alt="attachment" className="icon-img" />
                </button>
              </div>

              <div className="files-list selected-meta">
                {attachments.length === 0 ? (
                  <span className="no-file">No documents attached</span>
                ) : (
                  attachments.map((f, i) => (
                    <div key={i} className="file-item">
                      <span className="file-name">{f.name}</span>
                      <button type="button" className="remove-file" onClick={() => handleRemoveAttachment(i)}>
                        &times;
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className={isModal ? "modal-buttons" : "form-buttons"}>
            <button type="button" className="cancel-btn" onClick={isModal ? onClose : () => navigate("-1")}>
              {isModal ? "Cancel" : "Discard Changes"}
            </button>
            <button className="save-btn" type="submit" disabled={loading}>
              {loading ? "Initializing..." : "Launch Project"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProject;
