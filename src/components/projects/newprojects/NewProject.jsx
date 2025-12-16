import React, { useRef, useState } from "react";
import "./NewProject.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/api";

const NewProject = () => {
  // const navigate=useNavigate();

  const [formData, setFormData] = useState({
    project_name: "",
    company_name: "",
    description: "",
    assigned_by: "",
    due_date: "",
    est_hr: "",
    priority: "",
    links: "",
    // attachments will be handled separately as File[]
  });

  const [attachments, setAttachments] = useState([]); // File[]
  const [loading, setLoading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Trigger file chooser
  const handleAttachmentClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // When files are chosen
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    // optional: dedupe by name
    setAttachments((prev) => {
      const combined = [...prev, ...files];
      // remove duplicates by name+size
      const unique = [];
      const keys = new Set();
      combined.forEach((f) => {
        const k = `${f.name}_${f.size}`;
        if (!keys.has(k)) {
          keys.add(k);
          unique.push(f);
        }
      });
      return unique;
    });
    // clear input value so same file can be selected again if removed
    e.target.value = null;
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Link icon click: open link if present, otherwise toggle input
  const handleLinkIconClick = () => {
    if (formData.links && formData.links.trim() !== "") {
      const url = formData.links.match(/^https?:\/\//) ? formData.links : `https://${formData.links}`;
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    setShowLinkInput((s) => !s);
  };

  const validateRequired = () => {
    const { project_name, company_name, description, assigned_by, due_date, est_hr } = formData;
    if (!project_name || !company_name || !description || !assigned_by || !due_date || !est_hr) {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateRequired()) return;

    try {
      setLoading(true);

      // prepare multipart form data
      const payload = new FormData();
      payload.append("project_name", formData.project_name);
      payload.append("company_name", formData.company_name);
      payload.append("description", formData.description);
      payload.append("assigned_by", formData.assigned_by);
      payload.append("due_date", formData.due_date);
      payload.append("est_hr", formData.est_hr);
      payload.append("priority", formData.priority || "");
      payload.append("links", formData.links || "");

      // Append attachments. Backend typically accepts repeated keys for multiple files.
      // If your backend expects `attachments[]` change the key accordingly.
      attachments.forEach((file) => {
        payload.append("attachments", file);
      });

      const res = await api.post("/admin_app/add_projects", payload, {
        headers: {
          // Let axios set Content-Type (multipart boundary) automatically
        },
      });

      toast.success(res.data?.message || "Successfully added new project");
      // reset
      setFormData({
        project_name: "",
        company_name: "",
        description: "",
        assigned_by: "",
        due_date: "",
        est_hr: "",
        priority: "",
        links: "",
      });
      setAttachments([]);
      setShowLinkInput(false);
    } catch (error) {
      const msg = error.response?.data?.error || error.message || "Added new project failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="newproject-title">New Project</div>

      {/* single form for the whole layout */}
      <form className="newproject-container" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="newproject-leftform">
          <label>Project Name</label>
          <input
            type="text"
            className="newproject-input"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
          />

          <label>Company Name</label>
          <input
            type="text"
            className="newproject-input"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea className="description" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="newproject-rightform">
          <label>Assigned to</label>
          <textarea
            className="newproject-input"
            name="assigned_by"
            value={formData.assigned_by}
            onChange={handleChange}
          />

          <div className="date-hour">
            <div className="dates">
              <label>Due Date</label>
              <input type="date" className="date" name="due_date" value={formData.due_date} onChange={handleChange} />
            </div>

            <div className="est-hour">
              <label>Est.hour</label>
              <input
                type="text"
                className="esthour"
                name="est_hr"
                placeholder="00hr"
                value={formData.est_hr}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="priority-link-project">
            <div className="project-priority">
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="priority-select"
                aria-label="Priority"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Link icon (toggles inline input). Clicking image opens link if present */}
            <div className="attachment-block">
              <button
                type="button"
                className="project-attachment-link"
                onClick={handleLinkIconClick}
                title={formData.links ? "Open link in new tab" : "Add link"}
              >
                <img src="link icon.svg" alt="link" className="icon-img" />
              </button>

              {showLinkInput && (
                <input
                  type="url"
                  name="links"
                  value={formData.links}
                  placeholder="https://example.com"
                  onChange={handleChange}
                  className="small-link-input"
                />
              )}

              {!showLinkInput && formData.links && (
                <div className="selected-meta">
                  {formData.links.length > 30 ? formData.links.slice(0, 30) + "..." : formData.links}
                </div>
              )}
            </div>

            {/* File attachment icon */}
            <div className="attachment-block">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden-file"
                onChange={handleFileChange}
                multiple
                accept="*/*"
              />
              <button
                type="button"
                className="project-attachment-link"
                onClick={handleAttachmentClick}
                title="Add attachment(s)"
              >
                <img src="link.svg" alt="attachment" className="icon-img" />
              </button>

              <div className="files-list selected-meta">
                {attachments.length === 0 ? (
                  <span className="no-file">No file</span>
                ) : (
                  attachments.map((f, i) => (
                    <div key={`${f.name}-${f.size}-${i}`} className="file-item">
                      <span className="file-name">{f.name.length > 18 ? f.name.slice(0, 18) + "..." : f.name}</span>
                      <button type="button" className="remove-file" onClick={() => handleRemoveAttachment(i)}>
                        &times;
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={() => {
              // optional: reset form or navigate back
              setFormData({
                project_name: "",
                company_name: "",
                description: "",
                assigned_by: "",
                due_date: "",
                est_hr: "",
                priority: "",
                links: "",
              });
              setAttachments([]);
            }}>
              Cancel
            </button>
            <button className="save-btn" type="submit" disabled={loading}>
              {loading ? "Adding Project...." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProject;
