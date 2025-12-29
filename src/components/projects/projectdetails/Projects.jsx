import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // backend-driven filter & sort
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortMode, setSortMode] = useState("None");

  const menuRef = useRef(null);


useEffect(() => {
  let url = "http://127.0.0.1:8000/admin_app/view_projects";

  if (filterStatus !== "All") {
    url += `?status=${encodeURIComponent(filterStatus)}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const backendProjects = data.projects || [];

      const mapped = backendProjects.map((p) => ({
        id: p.id,
        work: p.Project_Name,
        comapny: p.Company_Name,
        status: p.Status,
        time: p.Due_Date ? `Due ${p.Due_Date}` : "No date",
        progress: "60",
      }));

      setProjects(mapped);
    })
    .catch((err) => console.error("Failed to load projects", err));
}, [filterStatus, sortMode]);


  /* =========================
     Close action menu on outside click
  ========================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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

  return (
    <div className="project-container">
      {/* =========================
          Header
      ========================= */}
      <div className="project-title">
        <div className="PRoject">Projects</div>

        <NavLink to="/newproject">
          <div className="new-project-btn">
            <img className="plus-icon" src="/Add.svg" alt="" />
            <div>New Project</div>
          </div>
        </NavLink>
      </div>

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
              onClick={() => toggleMenu(index)}
            >
              <img src="/3 dot.svg" alt="menu" />
            </div>

            {openIndex === index && (
              <div className="menu-popup">
                <NavLink
                  to={`/projectdetail/${proj.id}`}
                  onClick={() => setOpenIndex(null)}
                >
                  <p>View</p>
                </NavLink>

                <p onClick={() => setOpenIndex(null)}>Edit</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
