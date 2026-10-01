import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import { getDashboard } from '../api/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboard();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        throw new Error('Invalid dashboard data response');
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard overview from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Executive Dashboard"
          subtitle="Real-time performance overview for campaigns and lead pipelines"
        />
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          Loading real-time dashboard metrics from server...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <PageHeader
          title="Executive Dashboard"
          subtitle="Real-time performance overview for campaigns and lead pipelines"
        />
        <div className="alert-banner alert-danger">
          <span>{error || 'Unable to connect to backend server'}</span>
          <button className="btn btn-secondary btn-sm" onClick={fetchDashboardData} style={{ marginLeft: 'auto' }}>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const {
    totalClients = 0,
    totalCampaigns = 0,
    totalLeads = 0,
    kpis = {},
    campaignStatusSummary = { active: 0, paused: 0, completed: 0 },
    leadStatusSummary = { new: 0, contacted: 0, qualified: 0, converted: 0, lost: 0 },
    recentLeads = []
  } = data;

  const conversionRate = kpis.conversionRate !== undefined ? kpis.conversionRate : 0;
  const convertedLeads = kpis.convertedLeads !== undefined ? kpis.convertedLeads : (leadStatusSummary.converted || 0);
  const pendingFollowUps = kpis.pendingFollowUps !== undefined ? kpis.pendingFollowUps : 0;

  return (
    <div>
      <PageHeader
        title="Executive Dashboard"
        subtitle="Real-time performance overview for campaigns and lead pipelines"
        actions={
          <button className="btn btn-secondary btn-sm" onClick={fetchDashboardData}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Refresh Data</span>
          </button>
        }
      />

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <KpiCard
          title="Total Clients"
          value={totalClients}
          changeText="Enterprise Accounts"
          changeType="positive"
          iconBg="#eef2ff"
          iconColor="#4f46e5"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <KpiCard
          title="Total Campaigns"
          value={totalCampaigns}
          changeText={`${campaignStatusSummary.active || 0} Active • ${campaignStatusSummary.paused || 0} Paused`}
          changeType="neutral"
          iconBg="#f0f9ff"
          iconColor="#0284c7"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          }
        />

        <KpiCard
          title="Total Leads"
          value={totalLeads}
          changeText={`${conversionRate}% Conversion Rate`}
          changeType="positive"
          iconBg="#ecfdf5"
          iconColor="#059669"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <KpiCard
          title="Converted Leads"
          value={convertedLeads}
          changeText={`${conversionRate}% of pipeline`}
          changeType="positive"
          iconBg="#faf5ff"
          iconColor="#7e22ce"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />

        <KpiCard
          title="Pending Follow-ups"
          value={pendingFollowUps}
          changeText="Awaiting conversion"
          changeType="warning"
          iconBg="#fffbeb"
          iconColor="#d97706"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="dashboard-grid">
        {/* Campaign Status Breakdown */}
        <div className="card dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Campaign Status Distribution</h2>
            <Link to="/campaigns" className="card-action-link">
              View All Campaigns →
            </Link>
          </div>
          <div className="card-body">
            <div className="metric-breakdown-list">
              <div className="metric-breakdown-item">
                <div className="metric-breakdown-label">
                  <span className="badge badge-active">Active</span>
                  <span>Currently Live</span>
                </div>
                <div className="metric-breakdown-value">
                  <strong>{campaignStatusSummary.active || 0}</strong>
                  <span className="metric-breakdown-pct">
                    {totalCampaigns > 0 ? `${Math.round(((campaignStatusSummary.active || 0) / totalCampaigns) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="metric-breakdown-item">
                <div className="metric-breakdown-label">
                  <span className="badge badge-paused">Paused</span>
                  <span>Temporarily On Hold</span>
                </div>
                <div className="metric-breakdown-value">
                  <strong>{campaignStatusSummary.paused || 0}</strong>
                  <span className="metric-breakdown-pct">
                    {totalCampaigns > 0 ? `${Math.round(((campaignStatusSummary.paused || 0) / totalCampaigns) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="metric-breakdown-item">
                <div className="metric-breakdown-label">
                  <span className="badge badge-completed">Completed</span>
                  <span>Delivered / Concluded</span>
                </div>
                <div className="metric-breakdown-value">
                  <strong>{campaignStatusSummary.completed || 0}</strong>
                  <span className="metric-breakdown-pct">
                    {totalCampaigns > 0 ? `${Math.round(((campaignStatusSummary.completed || 0) / totalCampaigns) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Status Distribution */}
        <div className="card dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Lead Pipeline Stages</h2>
            <Link to="/leads" className="card-action-link">
              View Pipeline →
            </Link>
          </div>
          <div className="card-body">
            <div className="metric-breakdown-list">
              <div className="metric-breakdown-item">
                <div className="metric-breakdown-label">
                  <span className="badge badge-new">New</span>
                  <span>Incoming Inquiries</span>
                </div>
                <div className="metric-breakdown-value">
                  <strong>{leadStatusSummary.new || 0}</strong>
                  <span className="metric-breakdown-pct">
                    {totalLeads > 0 ? `${Math.round(((leadStatusSummary.new || 0) / totalLeads) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="metric-breakdown-item">
                <div className="metric-breakdown-label">
                  <span className="badge badge-contacted">Contacted</span>
                  <span>Under Outreach</span>
                </div>
                <div className="metric-breakdown-value">
                  <strong>{leadStatusSummary.contacted || 0}</strong>
                  <span className="metric-breakdown-pct">
                    {totalLeads > 0 ? `${Math.round(((leadStatusSummary.contacted || 0) / totalLeads) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="metric-breakdown-item">
                <div className="metric-breakdown-label">
                  <span className="badge badge-qualified">Qualified</span>
                  <span>High Purchase Intent</span>
                </div>
                <div className="metric-breakdown-value">
                  <strong>{leadStatusSummary.qualified || 0}</strong>
                  <span className="metric-breakdown-pct">
                    {totalLeads > 0 ? `${Math.round(((leadStatusSummary.qualified || 0) / totalLeads) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="metric-breakdown-item">
                <div className="metric-breakdown-label">
                  <span className="badge badge-converted">Converted</span>
                  <span>Successful Closures</span>
                </div>
                <div className="metric-breakdown-value">
                  <strong>{leadStatusSummary.converted || 0}</strong>
                  <span className="metric-breakdown-pct">
                    {totalLeads > 0 ? `${Math.round(((leadStatusSummary.converted || 0) / totalLeads) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="metric-breakdown-item">
                <div className="metric-breakdown-label">
                  <span className="badge badge-lost">Lost</span>
                  <span>Disqualified</span>
                </div>
                <div className="metric-breakdown-value">
                  <strong>{leadStatusSummary.lost || 0}</strong>
                  <span className="metric-breakdown-pct">
                    {totalLeads > 0 ? `${Math.round(((leadStatusSummary.lost || 0) / totalLeads) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="card dashboard-table-card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Recent Inbound Leads</h2>
            <p className="card-subtitle">Latest additions to your active customer pipeline</p>
          </div>
          <Link to="/leads" className="btn btn-secondary btn-sm">
            View All Leads
          </Link>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {recentLeads.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No leads currently in the pipeline.
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Lead Name</th>
                    <th>Source Campaign</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <div className="table-item-title">{lead.name}</div>
                      </td>
                      <td>
                        <div className="table-item-subtitle">{lead.campaignName || '—'}</div>
                      </td>
                      <td>
                        <span className="leads-badge" style={{ backgroundColor: 'var(--purple-bg)', color: 'var(--purple-text)' }}>
                          {lead.assignedToName || 'Unassigned'}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={lead.status} />
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {lead.createdDate || '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
