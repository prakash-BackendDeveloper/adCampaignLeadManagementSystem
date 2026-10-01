import React from "react";

/**
 * KPI Metric Card Component
 */
export default function KpiCard({
  title,
  value,
  changeText,
  changeType = "positive",
  icon,
  iconBg = "#eef2ff",
  iconColor = "#4f46e5",
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <span className="kpi-label">{title}</span>
        <div
          className="kpi-icon"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {icon}
        </div>
      </div>
      <div>
        <div className="kpi-value">{value}</div>
        {changeText && (
          <div className="kpi-footer">
            <span
              className={
                changeType === "positive"
                  ? "kpi-trend-positive"
                  : "kpi-trend-neutral"
              }
            >
              {changeText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
