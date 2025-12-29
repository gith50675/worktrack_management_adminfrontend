import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./ProjectDetail.css"

const ProjectDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
  if (!id) return;

  fetch(`http://127.0.0.1:8000/admin_app/view-project/${id}/`)
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(res => setData(res.project))   // IMPORTANT
    .catch(err => console.error("Fetch error:", err));
}, [id]);

  const openLink = () => {
    if (!data?.Links) return;
    const url = data.Links.startsWith("http")
      ? data.Links
      : `https://${data.Links}`;
    window.open(url, "_blank");
  };

  const openAttachment = () => {
    if (!data?.Attachments) return;
    window.open(data.Attachments, "_blank");
  };

  if (!data) return null;

  return (
    <div>
      <div className="project-detail-title">
        Project Details
      </div>

      <div className="project-detail-container">

        <div className="project-detail-leftform">
          <form>
            <label>Project Name</label><br />
            <input
              type="text"
              className="project-detail-input"
              value={data.Project_Name || ""}
              readOnly
            />

            <label>Company Name</label><br />
            <input
              type="text"
              className="project-detail-input"
              value={data.Company_Name || ""}
              readOnly
            />

            <label>Description</label><br />
            <textarea
              className="description"
              value={data.Description || ""}
              readOnly
            />
          </form>
        </div>

        <div className="project-detail-rightform">
          <form>
            <label>Assigned to</label><br />
            <textarea
              className="project-detail-input"
              value={(data.Assigned_to || []).join(", ")}
              readOnly
            />

            <div className="date-hour">
              <div className="est-hour">
                <label>Priority</label><br />
                <input
                  type="text"
                  className="esthour"
                  value={data.Priority || ""}
                  readOnly
                />
              </div>

              <div className="dates">
                <label>Due Date</label><br />
                <input
                  type="date"
                  className="date"
                  value={data.Due_Date ? data.Due_Date.slice(0, 10) : ""}
                  readOnly
                />
              </div>
            </div>

            <div className="link-project">
              {/* Link button */}
              <div
                className="project-attachment-link"
                onClick={openLink}
                title={data.Links || "No link"}
              >
                <img src="link icon.svg" alt="link" />
              </div>

              {/* Attachment button */}
              <div
                className="project-attachment-link"
                onClick={openAttachment}
                title={data.Attachments || "No attachment"}
              >
                <img src="link.svg" alt="attachment" />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="form-buttons">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default ProjectDetail;
