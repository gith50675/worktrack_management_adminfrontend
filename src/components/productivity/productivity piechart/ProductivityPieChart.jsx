import React from "react";
import "./ProductivityPieChart.css";

/**
 * ProductivityPieChart
 * - Props:
 *    data: array of numbers (e.g. [40,30,30])
 *    labels: array of strings (e.g. ["Productive","Neutral","Unproductive"])
 *    size: diameter in px (default 220)
 *    innerRatio: hole ratio (0..1) (default 0.5 => 50% hole)
 */
export default function ProductivityPieChart({
  data = [40, 30, 30],
  labels = ["Productive", "Neutral", "Unproductive"],
  size = 220,
  innerRatio = 0.5,
}) {
  // Basic normalization & geometry
  const total = data.reduce((s, v) => s + v, 0) || 1;
  const center = size / 2;
  const outerR = Math.floor(size * 0.42); // leave some padding
  const innerR = Math.floor(outerR * innerRatio);

  // palette like your design (three purples)
  const colors = ["#dcb8f0", "#f3dff8", "#8f48c9"]; // lighten/mid/dark - reorder to match screenshot if needed
  // re-order to get dark slice at bottom like screenshot: use [light, medium, dark]
  // We'll use colors[i % colors.length]

  // Build slices: startAngle moves along, angles in radians
  let angle = 0; // start at top (we offset -Math.PI/2 later)
  const slices = data.map((value, i) => {
    const portion = value / total;
    const start = angle;
    const end = angle + portion * Math.PI * 2;
    angle = end;

    const d = describeDonutSlice(center, center, outerR, innerR, start, end);
    return {
      d,
      color: colors[i % colors.length],
      value,
      percent: Math.round((portion * 100)),
      label: labels[i] || `slice ${i + 1}`,
      key: `slice-${i}`,
    };
  });

  return (
    <div className="productivity-piechart-container">
      <div className="productivity-title">Productivity</div>

      <div className="productivity-body">
        <svg
          className="productivity-pie-svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Productivity donut chart"
        >
          <g transform={`translate(0,0) rotate(-90 ${center} ${center})`}>
            {slices.map((s) => (
              <path
                key={s.key}
                d={s.d}
                fill={s.color}
                stroke="#fff"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* inner circle to ensure crisp hole (optional) */}
          <circle cx={center} cy={center} r={innerR - 1} fill="#fff" />
        </svg>

        <ul className="productivity-legend">
          {slices.map((s, i) => (
            <li key={s.key} className="legend-item">
              <span
                className="legend-dot"
                style={{ background: s.color }}
                aria-hidden
              />
              <span className="legend-text">
                {s.label} <span className="legend-percent">{s.percent}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * describeDonutSlice
 * returns an SVG path 'd' for a donut slice between startAngle and endAngle
 * angles in radians, center cx/cy, outerR and innerR numeric.
 */
function describeDonutSlice(cx, cy, outerR, innerR, startAngle, endAngle) {
  const large = endAngle - startAngle > Math.PI ? 1 : 0;

  // outer arc start/end
  const x1 = cx + outerR * Math.cos(startAngle);
  const y1 = cy + outerR * Math.sin(startAngle);
  const x2 = cx + outerR * Math.cos(endAngle);
  const y2 = cy + outerR * Math.sin(endAngle);

  // inner arc start/end (reverse direction)
  const x3 = cx + innerR * Math.cos(endAngle);
  const y3 = cy + innerR * Math.sin(endAngle);
  const x4 = cx + innerR * Math.cos(startAngle);
  const y4 = cy + innerR * Math.sin(startAngle);

  // Path: Move to outer start -> arc outer -> line to inner start -> arc inner (reverse) -> close
  const d = [
    `M ${x1.toFixed(3)} ${y1.toFixed(3)}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`,
    `L ${x3.toFixed(3)} ${y3.toFixed(3)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${x4.toFixed(3)} ${y4.toFixed(3)}`,
    "Z",
  ].join(" ");
  return d;
}

