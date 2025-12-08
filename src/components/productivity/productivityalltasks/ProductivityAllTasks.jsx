import React from "react";
import "./ProductivityAllTasks.css";

const ProductivityAllTasks = () => {
  return (
    <>
      <div className="all-tasks-title">All Tasks</div>

      <div className="all-tasks-card">
        <table className="all-tasks-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Project Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {/* main highlighted row */}
            <tr className="tasks-highlight-row">
              <td>Marketing Landing Page</td>
              <td>Website creation</td>
              <td>In Progress</td>
            </tr>

            {/* row that contains screenshots + application usage */}
            <tr>
              <td colSpan={3} className="tasks-details-cell">
                <div className="tasks-details-wrapper">
                  {/* Recent Screenshots */}
                  <div className="screenshots-card">
                    <div className="screenshots-header">
                      <div className="screenshots-title">
                        Recent Screenshots
                      </div>
                      <div className="screenshots-subtitle">
                        Take Screenshot every 30 minutes
                      </div>
                    </div>

                    <div className="screenshots-list">
                      <div className="screenshot-item">
                        <div className="screenshot-thumb" />
                        <div className="screenshot-time">10.30 AM</div>
                      </div>
                      <div className="screenshot-item">
                        <div className="screenshot-thumb" />
                        <div className="screenshot-time">09.15 AM</div>
                      </div>
                      <div className="screenshot-item">
                        <div className="screenshot-thumb" />
                        <div className="screenshot-time">12.30 PM</div>
                      </div>
                    </div>
                  </div>

                  {/* Application Usage */}
                  <div className="app-usage-card">
                    <div className="app-usage-title">Application Usage</div>

                    <table className="app-usage-table">
                      <thead>
                        <tr>
                          <th>Application</th>
                          <th>Time spend</th>
                          <th>Idle Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>VSCode</td>
                          <td>2h 15m</td>
                          <td>0h 15m</td>
                        </tr>
                        <tr>
                          <td>VSCode</td>
                          <td>2h 15m</td>
                          <td>0h 15m</td>
                        </tr>
                        <tr>
                          <td>VSCode</td>
                          <td>2h 15m</td>
                          <td>0h 15m</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>

            {/* bottom simple rows */}
            <tr className="tasks-row">
              <td>Marketing Landing Page</td>
              <td>Website creation</td>
              <td>In Progress</td>
            </tr>
            <tr className="tasks-row">
              <td>Marketing Landing Page</td>
              <td>Website creation</td>
              <td>To Do</td>
            </tr>
            <tr className="tasks-row">
              <td>CRM Integration</td>
              <td>Website creation</td>
              <td>Task Done</td>
            </tr>
            <tr className="tasks-row">
              <td>CRM Integration</td>
              <td>Website creation</td>
              <td>Task Done</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductivityAllTasks;
