import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

// Sample demonstration leads data
const initialLeads = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah.j@apexdigital.io",
    phone: "+1 (555) 234-5678",
    campaign: "Google Search - Q1 Growth",
    status: "New",
    date: "2026-09-30",
  },
  {
    id: 2,
    name: "Michael Chang",
    email: "m.chang@nexusretail.com",
    phone: "+1 (555) 876-5432",
    campaign: "Meta Retargeting Campaign",
    status: "Contacted",
    date: "2026-09-29",
  },
  {
    id: 3,
    name: "Elena Rostova",
    email: "elena@solariasolar.org",
    phone: "+1 (555) 345-6789",
    campaign: "LinkedIn B2B Decision Makers",
    status: "Qualified",
    date: "2026-09-29",
  },
  {
    id: 4,
    name: "David Miller",
    email: "david@millersons.com",
    phone: "+1 (555) 456-7890",
    campaign: "Google Search - Q1 Growth",
    status: "Converted",
    date: "2026-09-28",
  },
  {
    id: 5,
    name: "Amanda Price",
    email: "aprice@vanguardrealty.com",
    phone: "+1 (555) 567-8901",
    campaign: "Meta Retargeting Campaign",
    status: "Lost",
    date: "2026-09-27",
  },
  {
    id: 6,
    name: "Robert Torres",
    email: "rtorres@zenithlogistics.net",
    phone: "+1 (555) 678-9012",
    campaign: "Google Search - Q1 Growth",
    status: "New",
    date: "2026-09-26",
  },
];

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Frontend filter for interactive preview
  const filteredLeads = initialLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      lead.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle="Track, filter, and qualify prospective customer leads"
        actions={
          <button
            className="btn btn-primary"
            onClick={() =>
              alert("Add Lead modal / form will be connected in Step 2.")
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
            <span>Add Lead</span>
          </button>
        }
      />

      {/* Demo helper banner to test table or empty placeholder state */}
      <div className="demo-toggle-banner">
        <span>
          <strong>Step 1 Preview:</strong> Test search/filter controls or
          preview empty state.
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setShowEmptyState(!showEmptyState)}
        >
          {showEmptyState ? "Show Leads Table" : "Preview Empty State"}
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="empty-state-title">No leads captured yet</h3>
          <p className="empty-state-desc">
            Leads generated from your ad campaigns or entered manually will
            appear in this pipeline.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setShowEmptyState(false)}
          >
            <span>Add New Lead</span>
          </button>
        </div>
      ) : (
        <>
          {/* Search and Filter Bar */}
          <div className="filter-bar">
            <div className="search-input-wrapper">
              <span className="search-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search leads by name, email, or campaign..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Leads Table Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  All Leads ({filteredLeads.length})
                </h2>
                <span className="card-subtitle">
                  Inbound customer prospects
                </span>
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  color: "var(--text-muted)",
                }}
              >
                No leads match your search criteria.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Lead Name</th>
                      <th>Email Address</th>
                      <th>Phone Number</th>
                      <th>Source Campaign</th>
                      <th>Status</th>
                      <th>Date Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="table-cell-bold">{lead.name}</td>
                        <td>{lead.email}</td>
                        <td className="table-cell-sub">{lead.phone}</td>
                        <td>{lead.campaign}</td>
                        <td>
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="table-cell-sub">{lead.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
