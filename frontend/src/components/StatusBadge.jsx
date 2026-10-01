import React from "react";

/**
 * StatusBadge Component supporting standard Campaign & Lead statuses
 */
export default function StatusBadge({ status }) {
  const normalized = (status || "").toLowerCase().trim();

  let badgeClass = "badge-new";
  if (normalized === "active") badgeClass = "badge-active";
  else if (normalized === "paused") badgeClass = "badge-paused";
  else if (normalized === "completed") badgeClass = "badge-completed";
  else if (normalized === "new") badgeClass = "badge-new";
  else if (normalized === "contacted") badgeClass = "badge-contacted";
  else if (normalized === "qualified") badgeClass = "badge-qualified";
  else if (normalized === "converted") badgeClass = "badge-converted";
  else if (normalized === "lost") badgeClass = "badge-lost";

  return (
    <span className={`status-badge ${badgeClass}`}>
      <span className="badge-dot"></span>
      {status}
    </span>
  );
}
