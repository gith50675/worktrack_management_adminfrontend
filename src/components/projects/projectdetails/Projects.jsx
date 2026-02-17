import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import api from "../../../api/api";
import "./Projects.css";
import { toast } from "react-hot-toast";

import NewProjectModal from "../newprojects/NewProjectModal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // backend-driven filter & sort
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortMode, setSortMode] = useState("None");

  const menuRef = useRef(null);

  const fetchProjects = () => {
    let url = "admin_app/projects/";

    if (filterStatus !== "All") {
      url += `?status=${encodeURIComponent(filterStatus)}`;
    }

    api.get(url)
      .then((res) => {
        const backendProjects = res.data.projects || [];

        const mapped = backendProjects.map((p) => ({
          id: p.id,
          work: p.project_name,
          comapny: p.company_name,
          status: p.status,
          time: p.due_date ? `Due ${p.due_date}` : "No date",
          progress: "60",
        }));

        setProjects(mapped);
      })
      .catch((err) => console.error("Failed to load projects", err));
  };


  useEffect(() => {
    fetchProjects();
  }, [filterStatus, sortMode]);


  /* =========================
     Close action menu on outside click
  ========================= */
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenIndex(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  /* =========================
     Button handlers
  ========================= */
  const handleFilter = () => {
    const order = ["All", "In Progress", "Pending", "Completed"];
    setFilterStatus(order[(order.indexOf(filterStatus) + 1) % order.length]);
  };

  const handleSort = () => {
    const order = ["None", "Due Date", "Name"];
    setSortMode(order[(order.indexOf(sortMode) + 1) % order.length]);
  };

  const toggleMenu = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await api.delete(`admin_app/projects/${id}/delete/`);

      if (res.status === 200) {
        alert("Deleted Successfully");
        setProjects(prev => prev.filter(p => p.id !== id));
        setOpenIndex(null);
      } else {
        alert("Delete failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  return (
    <div className="project-container">
      {/* =========================
          Header
      ========================= */}
      <div className="project-title">
        <div className="PRoject">Projects</div>

        <button
          className="new-project-btn"
          onClick={() => setIsModalOpen(true)}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <img className="plus-icon" src="/Add.svg" alt="" />
          <div>New Project</div>
        </button>
      </div>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProjects}
      />

      {/* =========================
          Filter / Sort
      ========================= */}
      <div className="project-filter-sort-div">
        <button className="proj-sort-filt-btn" onClick={handleFilter}>
          <img src="/filter icon.svg" alt="" />
          <p className="filt-sort">Filter: {filterStatus}</p>
        </button>

        <button className="proj-sort-filt-btn" onClick={handleSort}>
          <img src="/sort icon.svg" alt="" />
          <p className="filt-sort">Sort: {sortMode}</p>
        </button>
      </div>

      {/* =========================
          Project List
      ========================= */}
      {projects.map((proj, index) => (
        <div className="project-detail-status" key={proj.id}>
          <div className="project-Name">
            {proj.work}
            <span>{proj.comapny}</span>
          </div>

          <div className="project-Status">{proj.status}</div>

          <div className="project-day-left">
            <img className="clock-icon" src="/clock.svg" alt="" />
            <p className="day-left">{proj.time}</p>
          </div>

          <div className="progress-bar-per">
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${proj.progress}%` }}
              />
            </div>
            <span className="progress-value">{proj.progress}%</span>
          </div>

          {/* =========================
              Actions
          ========================= */}
          <div className="three-dot-wrapper" ref={menuRef}>
            <div
              className="three-dot"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(index);
              }}
            >

              <img src="/3 dot.svg" alt="menu" />
            </div>

            {openIndex === index && (
              <div className="menu-popup" onClick={(e) => e.stopPropagation()}>
                <NavLink
                  to={`/projectdetail/${proj.id}`}
                  onClick={() => setOpenIndex(null)}
                >
                  <p>View</p>
                </NavLink>

                <p onClick={() => setOpenIndex(null)}>Edit</p>

                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(proj.id);
                  }}
                >
                  Delete
                </p>

              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
