import React from "react";
import PageHeader from "../components/PageHeader";
import KpiCard from "../components/KpiCard";
import StatusBadge from "../components/StatusBadge";

// Sample demonstration data for UI
const sampleRecentLeads = [
  {
    id: 1,
    name: "Sarah Jenkins",
    company: "Apex Digital",
    campaign: "Google Search - Q1",
    status: "New",
    date: "2026-09-30",
  },
  {
    id: 2,
    name: "Michael Chang",
    company: "Nexus Retail",
    campaign: "Meta Retargeting",
    status: "Contacted",
    date: "2026-09-29",
  },
  {
    id: 3,
    name: "Elena Rostova",
    company: "Solaria Solar",
    campaign: "LinkedIn B2B Leads",
    status: "Qualified",
    date: "2026-09-29",
  },
  {
    id: 4,
    name: "David Miller",
    company: "Miller & Sons Ltd",
    campaign: "Google Search - Q1",
    status: "Converted",
    date: "2026-09-28",
  },
  {
    id: 5,
    name: "Amanda Price",
    company: "Vanguard Realty",
    campaign: "Meta Retargeting",
    status: "Lost",
    date: "2026-09-27",
  },
];

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Executive Dashboard"
        subtitle="Performance overview for active campaigns and customer lead pipelines"
      />

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <KpiCard
          title="Total Clients"
          value="14"
          changeText="↑ 2 new this month"
          changeType="positive"
          iconBg="#eef2ff"
          iconColor="#4f46e5"
          icon={
            <svg
              width="20"
              height="20"
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
          }
        />

        <KpiCard
          title="Total Campaigns"
          value="8"
          changeText="5 Active • 2 Paused"
          changeType="neutral"
          iconBg="#f0f9ff"
          iconColor="#0284c7"
          icon={
            <svg
              width="20"
              height="20"
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
          }
        />

        <KpiCard
          title="Total Leads"
          value="248"
          changeText="↑ 18% vs last week"
          changeType="positive"
          iconBg="#faf5ff"
          iconColor="#7e22ce"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
          }
        />

        <KpiCard
          title="Converted Leads"
          value="42"
          changeText="↑ 12% conversion gain"
          changeType="positive"
          iconBg="#ecfdf5"
          iconColor="#059669"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />

        <KpiCard
          title="Conversion Rate"
          value="16.9%"
          changeText="Target: 15.0%"
          changeType="positive"
          iconBg="#fffbeb"
          iconColor="#d97706"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" x2="6" y1="6" y2="18" />
              <circle cx="8" cy="8" r="2" />
              <circle cx="16" cy="16" r="2" />
            </svg>
          }
        />

        <KpiCard
          title="Pending Follow-ups"
          value="19"
          changeText="Requires attention"
          changeType="neutral"
          iconBg="#fef2f2"
          iconColor="#e11d48"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
      </div>

      {/* Two Column Summaries: Campaign Status & Lead Distribution */}
      <div className="dashboard-sections-grid">
        {/* Campaign Status Summary */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Campaign Status Summary</h2>
              <span className="card-subtitle">
                Overview of running marketing initiatives
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="summary-items-list">
              <div className="summary-row">
                <span className="summary-row-label">
                  <span
                    className="summary-dot"
                    style={{ backgroundColor: "var(--success-text)" }}
                  ></span>
                  Active Campaigns
                </span>
                <span className="summary-row-count">5</span>
              </div>
              <div className="summary-row">
                <span className="summary-row-label">
                  <span
                    className="summary-dot"
                    style={{ backgroundColor: "var(--warning-text)" }}
                  ></span>
                  Paused Campaigns
                </span>
                <span className="summary-row-count">2</span>
              </div>
              <div className="summary-row">
                <span className="summary-row-label">
                  <span
                    className="summary-dot"
                    style={{ backgroundColor: "var(--info-text)" }}
                  ></span>
                  Completed Campaigns
                </span>
                <span className="summary-row-count">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Status Distribution */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Lead Status Distribution</h2>
              <span className="card-subtitle">
                Breakdown by current stage in funnel
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="summary-items-list">
              <div className="summary-row">
                <span className="summary-row-label">
                  <span
                    className="summary-dot"
                    style={{ backgroundColor: "var(--info-text)" }}
                  ></span>
                  New Inquiries
                </span>
                <span className="summary-row-count">86</span>
              </div>
              <div className="summary-row">
                <span className="summary-row-label">
                  <span
                    className="summary-dot"
                    style={{ backgroundColor: "var(--purple-text)" }}
                  ></span>
                  Contacted / In Discussion
                </span>
                <span className="summary-row-count">64</span>
              </div>
              <div className="summary-row">
                <span className="summary-row-label">
                  <span
                    className="summary-dot"
                    style={{ backgroundColor: "var(--warning-text)" }}
                  ></span>
                  Qualified Prospects
                </span>
                <span className="summary-row-count">38</span>
              </div>
              <div className="summary-row">
                <span className="summary-row-label">
                  <span
                    className="summary-dot"
                    style={{ backgroundColor: "var(--success-text)" }}
                  ></span>
                  Converted Clients
                </span>
                <span className="summary-row-count">42</span>
              </div>
              <div className="summary-row">
                <span className="summary-row-label">
                  <span
                    className="summary-dot"
                    style={{ backgroundColor: "var(--danger-text)" }}
                  ></span>
                  Lost / Closed
                </span>
                <span className="summary-row-count">18</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads Section */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Recent Leads</h2>
            <span className="card-subtitle">
              Latest inbound prospects across all channels
            </span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Company</th>
                <th>Source Campaign</th>
                <th>Status</th>
                <th>Date Received</th>
              </tr>
            </thead>
            <tbody>
              {sampleRecentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="table-cell-bold">{lead.name}</td>
                  <td>{lead.company}</td>
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
      </div>
    </div>
  );
}
