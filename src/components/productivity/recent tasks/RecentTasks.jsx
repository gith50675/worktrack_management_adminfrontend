import React from "react";
import "./RecentTasks.css";

const RecentTasks = ({ tasks = [] }) => {   // DEFAULT EMPTY ARRAY

  return (
    <div className="recent-task-container">
      <div className="recent-title">
        <div className="recent-tasks">Recent Tasks</div>
        <div className="tasks-details">Details</div>
      </div>

      <hr />

      <div className="task-and-status">
        {tasks.length === 0 ? (
          <p>No recent tasks</p>
        ) : (
          tasks.map((rectask, index) => (
            <div className="task-status" key={index}>
              <div className="productivity-task">{rectask.task_name}</div>
              <div className="productivity-task-status">
                {rectask.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
