import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import "./ProjectDetail.css";
import { toast } from "react-hot-toast";

const ProjectDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ------------ FETCH PROJECT ------------
  useEffect(() => {
    if (!id) return;

    api.get(`admin_app/projects/${id}/view/`)
      .then((res) => setData(res.data.project))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  // ------------ LINK OPEN ------------
  const openLink = () => {
    if (!data?.links) return;
    const url = data.links.startsWith("http")
      ? data.links
      : `https://${data.links}`;
    window.open(url, "_blank");
  };

  // ------------ ATTACHMENT OPEN ------------
  const openAttachment = () => {
    if (!data?.attachments) return;
    window.open(data.attachments, "_blank");
  };

  // ------------ SAVE UPDATE ------------
  const handleSave = async () => {
    if (!data) return;

    const form = new FormData();
    form.append("project_name", data.project_name || "");
    form.append("company_name", data.company_name || "");
    form.append("description", data.description || "");
    form.append("priority", data.priority || "");
    form.append("due_date", data.due_date?.slice(0, 10) || "");
    form.append("links", data.links || "");
    form.append("status", data.status || "");

    try {
      setLoading(true);

      const res = await api.post(
        `admin_app/projects/${id}/update/`,
        form
      );

      toast.success(res.data.message || "Updated Successfully");
      navigate("/projects");
    } catch (err) {
      const msg = err.response?.data?.error || "Server Error";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <div>
      <div className="project-detail-title">Project Details</div>

      <div className="project-detail-container">
        {/* LEFT */}
        <div className="project-detail-leftform">
          <form>
            <label>Project Name</label>
            <br />
            <input
              type="text"
              className="project-detail-input"
              value={data.project_name || ""}
              onChange={(e) =>
                setData({ ...data, project_name: e.target.value })
              }
            />

            <label>Company Name</label>
            <br />
            <input
              type="text"
              className="project-detail-input"
              value={data.company_name || ""}
              onChange={(e) =>
                setData({ ...data, company_name: e.target.value })
              }
            />

            <label>Description</label>
            <br />
            <textarea
              className="description"
              value={data.description || ""}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </form>
        </div>

        {/* RIGHT */}
        <div className="project-detail-rightform">
          <form>
            <label>Assigned to</label>
            <br />
            <textarea
              className="project-detail-input"
              value={(data.assigned_to || []).map(u => u.first_name || u.username).join(", ")}
              readOnly
            />

            <div className="date-hour">
              <div className="est-hour">
                <label>Priority</label>
                <br />
                <input
                  type="text"
                  className="esthour"
                  value={data.priority || ""}
                  onChange={(e) =>
                    setData({ ...data, priority: e.target.value })
                  }
                />
              </div>

              <div className="dates">
                <label>Due Date</label>
                <br />
                <input
                  type="date"
                  className="date"
                  value={data.due_date ? data.due_date.slice(0, 10) : ""}
                  onChange={(e) =>
                    setData({ ...data, due_date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* LINKS */}
            <div className="link-project">
              <div
                className="project-attachment-link"
                onClick={openLink}
                title={data.links || "No link"}
              >
                <img src="/link icon.svg" alt="link" />
              </div>

              <div
                className="project-attachment-link"
                onClick={openAttachment}
                title={data.attachments || "No attachment"}
              >
                <img src="/link.svg" alt="attachment" />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="form-buttons">
        <button className="cancel-btn">Cancel</button>

        <button className="save-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
