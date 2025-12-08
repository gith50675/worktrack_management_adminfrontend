import React from "react";
import "./Graph.css";

const Graph = () => {
  const data = [
    { day: "Mon", hours: 4.5 },
    { day: "Tue", hours: 2.3 },
    { day: "Wed", hours: 4.0 },
    { day: "Thu", hours: 5.0 },
    { day: "Fri", hours: 3.0 },
    { day: "Sat", hours: 7.5 },
    { day: "Sun", hours: 6.0 },
  ];

  const maxHours = 8;
  const ticks = [8, 6, 4, 2, 0];

  const toPct = (h) => Math.max(0, Math.min(100, (h / maxHours) * 100));

  return (
    <div className="graph-card">
      <div className="graph-header">
        <div>
          <h3 className="graph-title">Work Report</h3>
          <div className="graph-subtle">8 hr</div>
        </div>
      </div>

      <div className="graph-body">
        <div className="graph-yaxis">
          {ticks.map((t) =>
            t === 0 ? (
              <div key={t} className="graph-y-row empty" />
            ) : (
              <div key={t} className="graph-y-row">
                <span className="graph-y-label">{t} hr</span>
              </div>
            )
          )}
        </div>

        <div className="graph-plot">
          <div className="graph-grid">
            {ticks.map((tick, i) => (
              <div
                key={tick}
                className="graph-grid-line"
                style={{ top: `${(i / (ticks.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          <div className="graph-bars">
            {data.map((d) => {
              const pct = toPct(d.hours);
              const greyPct = 100 - pct; // remaining (top)
              return (
                <div className="graph-bar-col" key={d.day}>
                  <div className="graph-bar-viewport" role="img" aria-label={`${d.day} ${d.hours} hours`}>
                    <div className="graph-bar-bg" />

                    {/* top grey (remaining) */}
                    <div
                      className="graph-bar-grey"
                      style={{ height: `${greyPct}%` }}
                      aria-hidden="true"
                    />

                    {/* bottom violet (actual work) */}
                    <div
                      className="graph-bar-fill"
                      style={{ height: `${pct}%` }}
                      title={`${d.day}: ${d.hours} hr`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="graph-day-label">{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
