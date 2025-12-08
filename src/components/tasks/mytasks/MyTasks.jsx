import React from 'react'
import "./MyTasks.css"
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const MyTasks = () => {
  const tasks = [
    { icon: "Group (2).svg", title: "To Do", count: "5" },
    { icon: "Group (2).svg", title: "In Progress", count: "3" },
    { icon: "Group (2).svg", title: "Review", count: "2" },
    { icon: "Group (2).svg", title: "Completed", count: "8" }
  ];

  return (
    <div className='container'>
      <div className='task-titlebox'>
        <p>My Tasks</p>

        <Link to={"/newtask"} className="new-task-btn">
          <img src="Add.svg" className='new-task-icon' alt="" />
          New Task
        </Link>
      </div>

      {/* MAPPING FIXED */}
      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="task-container" key={index}>
            <img className="task-icon" src={task.icon} alt="" />
            <div className="task-content">
              <div className="task-head">{task.title}</div>
              <div className="task-count">{task.count}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MyTasks;
