import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

// Sample demonstration campaigns data
const initialCampaigns = [
  {
    id: 1,
    name: "Google Search - Q1 Growth",
    client: "Acme Enterprise",
    platform: "Google Ads",
    budget: "$3,500",
    leadsCount: 112,
    status: "Active",
    startDate: "2026-01-15",
  },
  {
    id: 2,
    name: "Meta Retargeting Campaign",
    client: "Starlight E-commerce",
    platform: "Meta Ads",
    budget: "$2,000",
    leadsCount: 84,
    status: "Active",
    startDate: "2026-02-01",
  },
  {
    id: 3,
    name: "LinkedIn B2B Decision Makers",
    client: "CloudScale SaaS",
    platform: "LinkedIn",
    budget: "$5,000",
    leadsCount: 32,
    status: "Paused",
    startDate: "2026-02-10",
  },
  {
    id: 4,
    name: "Local Service Brand Awareness",
    client: "Apex Auto Care",
    platform: "Multi-Channel",
    budget: "$1,200",
    leadsCount: 20,
    status: "Completed",
    startDate: "2026-01-01",
  },
];

export default function Campaigns() {
  const [showEmptyState, setShowEmptyState] = useState(false);

  return (
    <div>
      <PageHeader
        title="Campaigns"
        subtitle="Manage and monitor marketing ad campaigns across platforms"
        actions={
          <button
            className="btn btn-primary"
            onClick={() =>
              alert("Add Campaign modal / form will be connected in Step 2.")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Campaign</span>
          </button>
        }
      />

      {/* Demo helper banner to inspect table or empty placeholder state */}
      <div className="demo-toggle-banner">
        <span>
          <strong>Step 1 Preview:</strong> Switch between preview table and
          empty state placeholder.
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setShowEmptyState(!showEmptyState)}
        >
          {showEmptyState ? "Show Campaign Table" : "Preview Empty State"}
        </button>
      </div>

      {showEmptyState ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 11 18-5v12L3 14v-3z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          </div>
          <h3 className="empty-state-title">No campaigns found</h3>
          <p className="empty-state-desc">
            Get started by creating your first ad campaign to track leads,
            platforms, and performance.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setShowEmptyState(false)}
          >
            <span>Create First Campaign</span>
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">All Campaigns</h2>
              <span className="card-subtitle">
                List of advertising campaigns and lead volumes
              </span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Client</th>
                  <th>Platform</th>
                  <th>Budget</th>
                  <th>Leads Generated</th>
                  <th>Status</th>
                  <th>Start Date</th>
                </tr>
              </thead>
              <tbody>
                {initialCampaigns.map((camp) => (
                  <tr key={camp.id}>
                    <td className="table-cell-bold">{camp.name}</td>
                    <td>{camp.client}</td>
                    <td>
                      <span
                        style={{ fontWeight: 500, color: "var(--text-muted)" }}
                      >
                        {camp.platform}
                      </span>
                    </td>
                    <td className="table-cell-bold">{camp.budget}</td>
                    <td>{camp.leadsCount} leads</td>
                    <td>
                      <StatusBadge status={camp.status} />
                    </td>
                    <td className="table-cell-sub">{camp.startDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
