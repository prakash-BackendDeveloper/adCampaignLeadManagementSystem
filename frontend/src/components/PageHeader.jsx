import React from "react";

/**
 * Standard Page Header with title, subtitle, and action buttons
 */
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header-wrapper">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </div>
  );
}
