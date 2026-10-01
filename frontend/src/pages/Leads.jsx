import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import LeadModal from '../components/LeadModal';
import LeadStatusModal from '../components/LeadStatusModal';
import DeleteLeadModal from '../components/DeleteLeadModal';
import {
  getLeads,
  getCampaigns,
  getTeamMembers,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead
} from '../api/api';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [campaignFilter, setCampaignFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState(null);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [leadForStatus, setLeadForStatus] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusApiError, setStatusApiError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteApiError, setDeleteApiError] = useState(null);

  // Load Reference Data (Campaigns, Team Members)
  const loadReferenceData = async () => {
    try {
      const [campRes, teamRes] = await Promise.all([
        getCampaigns(),
        getTeamMembers()
      ]);
      if (campRes.success) setCampaigns(campRes.data || []);
      if (teamRes.success) setTeamMembers(teamRes.data || []);
    } catch (err) {
      console.error('Failed to load reference data:', err);
    }
  };

  // Load Leads with Backend Filters
  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getLeads({
        search: searchTerm,
        status: statusFilter,
        campaignId: campaignFilter,
        assignedTo: assigneeFilter
      });
      if (res.success) {
        setLeads(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load leads from server');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, campaignFilter, assigneeFilter]);

  useEffect(() => {
    loadReferenceData();
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // Helpers for display names
  const getCampaignName = (campaignId) => {
    const found = campaigns.find((c) => c.id === campaignId);
    return found ? (found.campaignName || found.name) : 'Unknown Campaign';
  };

  const getAssigneeName = (assignedToId) => {
    const found = teamMembers.find((t) => t.id === assignedToId);
    return found ? found.name : 'Unassigned';
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setCampaignFilter('All');
    setAssigneeFilter('All');
  };

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    statusFilter !== 'All' ||
    campaignFilter !== 'All' ||
    assigneeFilter !== 'All';

  // Handle Create / Edit Save
  const handleSaveLead = async (leadData) => {
    setFeedbackMessage(null);
    try {
      if (leadToEdit) {
        await updateLead(leadToEdit.id, leadData);
        setFeedbackMessage({ type: 'success', text: `Lead "${leadData.leadName}" updated successfully.` });
      } else {
        await createLead(leadData);
        setFeedbackMessage({ type: 'success', text: `Lead "${leadData.leadName}" created successfully.` });
      }
      setIsModalOpen(false);
      setLeadToEdit(null);
      await loadLeads();
    } catch (err) {
      setFeedbackMessage({ type: 'danger', text: err.message || 'Failed to save lead.' });
    }
  };

  // Handle Quick Status Update
  const handleUpdateStatus = async (leadId, newStatus) => {
    setIsUpdatingStatus(true);
    setStatusApiError(null);
    try {
      await updateLeadStatus(leadId, newStatus);
      setIsStatusModalOpen(false);
      setLeadForStatus(null);
      setFeedbackMessage({ type: 'success', text: `Lead status updated to ${newStatus}.` });
      await loadLeads();
    } catch (err) {
      setStatusApiError(err.message || 'Failed to update lead status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    setDeleteApiError(null);
    try {
      await deleteLead(leadToDelete.id);
      setIsDeleteModalOpen(false);
      setLeadToDelete(null);
      setFeedbackMessage({
        type: 'success',
        text: `Lead "${leadToDelete.leadName || leadToDelete.name}" deleted successfully.`
      });
      await loadLeads();
    } catch (err) {
      setDeleteApiError(err.message || 'Failed to delete lead');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Leads Pipeline"
        subtitle="Track, filter, and qualify prospective customer leads"
        actions={
          <button
            className="btn btn-primary"
            onClick={() => {
              setLeadToEdit(null);
              setIsModalOpen(true);
            }}
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

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div className={`alert-banner alert-${feedbackMessage.type}`} style={{ marginBottom: '1.25rem' }}>
          <span>{feedbackMessage.text}</span>
          <button
            onClick={() => setFeedbackMessage(null)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Server Error Banner */}
      {error && (
        <div className="alert-banner alert-danger" style={{ marginBottom: '1.25rem' }}>
          <span>{error}</span>
          <button className="btn btn-secondary btn-sm" onClick={loadLeads} style={{ marginLeft: 'auto' }}>
            Retry
          </button>
        </div>
      )}

      {/* Search & Filters Toolbar */}
      <div className="filters-card">
        <div className="filters-grid">
          {/* Search Input */}
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              width="18"
              height="18"
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
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by name, email, phone, campaign, assignee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <select
              className="form-control"
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

          {/* Campaign Filter */}
          <div className="filter-group">
            <select
              className="form-control"
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
            >
              <option value="All">All Campaigns</option>
              {campaigns.map((camp) => (
                <option key={camp.id} value={camp.id}>
                  {camp.campaignName || camp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned To Filter */}
          <div className="filter-group">
            <select
              className="form-control"
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
            >
              <option value="All">All Assignees</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="filter-group">
              <button className="btn btn-secondary btn-sm" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="filters-meta">
          <span className="results-count">
            Showing <strong>{leads.length}</strong> {leads.length === 1 ? 'lead' : 'leads'}
            {hasActiveFilters && ' (filtered)'}
          </span>
        </div>
      </div>

      {/* Leads Table or Empty State */}
      {loading ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          Loading leads from server...
        </div>
      ) : leads.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 className="empty-state-title">No leads found</h3>
          <p className="empty-state-text">
            {hasActiveFilters
              ? 'Try adjusting your search criteria or filter options to locate matching leads.'
              : 'Add prospective customer leads to begin pipeline tracking.'}
          </p>
          {hasActiveFilters ? (
            <button className="btn btn-secondary" onClick={handleClearFilters}>
              Reset Filters
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setLeadToEdit(null);
                setIsModalOpen(true);
              }}
            >
              Add Lead
            </button>
          )}
        </div>
      ) : (
        <div className="card table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Lead & Contact</th>
                <th>Phone</th>
                <th>Source Campaign</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Follow-up</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className="table-item-title">{lead.leadName || lead.name}</div>
                    <div className="table-item-subtitle">{lead.email}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontFamily: 'monospace' }}>
                      {lead.phone}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                      {getCampaignName(lead.campaignId)}
                    </div>
                  </td>
                  <td>
                    <span className="leads-badge" style={{ backgroundColor: 'var(--purple-bg)', color: 'var(--purple-text)' }}>
                      {getAssigneeName(lead.assignedTo)}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      title="Click to change status"
                      onClick={() => {
                        setLeadForStatus(lead);
                        setStatusApiError(null);
                        setIsStatusModalOpen(true);
                      }}
                    >
                      <StatusBadge status={lead.status} />
                    </button>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {lead.followUpDate || lead.createdDate || '—'}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions-group">
                      <button
                        className="btn btn-icon btn-sm"
                        title="Update Status"
                        onClick={() => {
                          setLeadForStatus(lead);
                          setStatusApiError(null);
                          setIsStatusModalOpen(true);
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                      <button
                        className="btn btn-icon btn-sm"
                        title="Edit Lead"
                        onClick={() => {
                          setLeadToEdit(lead);
                          setIsModalOpen(true);
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        className="btn btn-icon btn-sm btn-icon-danger"
                        title="Delete Lead"
                        onClick={() => {
                          setLeadToDelete(lead);
                          setDeleteApiError(null);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Create/Edit Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setLeadToEdit(null);
        }}
        onSave={handleSaveLead}
        leadToEdit={leadToEdit}
        campaigns={campaigns}
        teamMembers={teamMembers}
      />

      {/* Quick Status Update Modal */}
      <LeadStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setLeadForStatus(null);
        }}
        onUpdateStatus={handleUpdateStatus}
        lead={leadForStatus}
        isSubmitting={isUpdatingStatus}
        apiError={statusApiError}
      />

      {/* Delete Lead Modal */}
      <DeleteLeadModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setLeadToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        lead={leadToDelete}
        campaignName={leadToDelete ? getCampaignName(leadToDelete.campaignId) : ''}
        assigneeName={leadToDelete ? getAssigneeName(leadToDelete.assignedTo) : ''}
        isSubmitting={isDeleting}
        apiError={deleteApiError}
      />
    </div>
  );
}
