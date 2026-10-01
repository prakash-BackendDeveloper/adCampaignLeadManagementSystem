import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import CampaignModal from '../components/CampaignModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { getCampaigns, getClients, getLeads, createCampaign, updateCampaign, deleteCampaign } from '../api/api';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  // Fetch initial clients and leads reference
  const loadReferenceData = async () => {
    try {
      const [clientsRes, leadsRes] = await Promise.all([
        getClients(),
        getLeads()
      ]);
      if (clientsRes.success) setClients(clientsRes.data || []);
      if (leadsRes.success) setLeads(leadsRes.data || []);
    } catch (err) {
      console.error('Failed to load reference data:', err);
    }
  };

  // Fetch campaigns from backend with query parameters
  const loadCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCampaigns({
        search: searchTerm,
        clientId: clientFilter,
        platform: platformFilter,
        status: statusFilter
      });
      if (res.success) {
        setCampaigns(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load campaigns from server');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, clientFilter, platformFilter, statusFilter]);

  useEffect(() => {
    loadReferenceData();
  }, []);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  // Client name lookup helper
  const getClientName = (clientId) => {
    const found = clients.find((c) => c.id === clientId);
    return found ? found.name : 'Unknown Client';
  };

  // Calculate leads count per campaign
  const getCampaignLeadsCount = (campaignId) => {
    return leads.filter((l) => l.campaignId === campaignId).length;
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setClientFilter('All');
    setPlatformFilter('All');
    setStatusFilter('All');
  };

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    clientFilter !== 'All' ||
    platformFilter !== 'All' ||
    statusFilter !== 'All';

  // Handle Create / Edit Save
  const handleSaveCampaign = async (campaignData) => {
    setFeedbackMessage(null);
    try {
      if (campaignToEdit) {
        await updateCampaign(campaignToEdit.id, campaignData);
        setFeedbackMessage({ type: 'success', text: `Campaign "${campaignData.campaignName}" updated successfully.` });
      } else {
        await createCampaign(campaignData);
        setFeedbackMessage({ type: 'success', text: `Campaign "${campaignData.campaignName}" created successfully.` });
      }
      setIsModalOpen(false);
      setCampaignToEdit(null);
      await loadCampaigns();
    } catch (err) {
      setFeedbackMessage({ type: 'danger', text: err.message || 'Failed to save campaign.' });
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!campaignToDelete) return;
    setFeedbackMessage(null);
    try {
      await deleteCampaign(campaignToDelete.id);
      setFeedbackMessage({
        type: 'success',
        text: `Campaign "${campaignToDelete.campaignName || campaignToDelete.name}" deleted successfully.`
      });
      setIsDeleteModalOpen(false);
      setCampaignToDelete(null);
      await loadCampaigns();
    } catch (err) {
      setIsDeleteModalOpen(false);
      setCampaignToDelete(null);
      setFeedbackMessage({
        type: 'danger',
        text: err.message || 'Could not delete campaign.'
      });
    }
  };

  return (
    <div>
      <PageHeader
        title="Campaigns"
        subtitle="Manage and monitor marketing ad campaigns across platforms"
        actions={
          <button
            className="btn btn-primary"
            onClick={() => {
              setCampaignToEdit(null);
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
            <span>Add Campaign</span>
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
          <button className="btn btn-secondary btn-sm" onClick={loadCampaigns} style={{ marginLeft: 'auto' }}>
            Retry
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
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
              placeholder="Search by campaign name, platform, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Client Filter */}
          <div className="filter-group">
            <select
              className="form-control"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
            >
              <option value="All">All Clients</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div className="filter-group">
            <select
              className="form-control"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value="All">All Platforms</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
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
            Showing <strong>{campaigns.length}</strong> {campaigns.length === 1 ? 'campaign' : 'campaigns'}
            {hasActiveFilters && ' (filtered)'}
          </span>
        </div>
      </div>

      {/* Campaigns Table or Empty State */}
      {loading ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          Loading campaigns from server...
        </div>
      ) : campaigns.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <h3 className="empty-state-title">No campaigns found</h3>
          <p className="empty-state-text">
            {hasActiveFilters
              ? 'Try adjusting your search terms or filter criteria to find what you are looking for.'
              : 'Get started by creating your first ad campaign.'}
          </p>
          {hasActiveFilters ? (
            <button className="btn btn-secondary" onClick={handleClearFilters}>
              Reset Filters
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setCampaignToEdit(null);
                setIsModalOpen(true);
              }}
            >
              Create Campaign
            </button>
          )}
        </div>
      ) : (
        <div className="card table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Campaign & Client</th>
                <th>Platform</th>
                <th>Budget</th>
                <th>Leads</th>
                <th>Status</th>
                <th>Duration</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((camp) => (
                <tr key={camp.id}>
                  <td>
                    <div className="table-item-title">{camp.campaignName || camp.name}</div>
                    <div className="table-item-subtitle">{getClientName(camp.clientId)}</div>
                  </td>
                  <td>
                    <span className="platform-tag">{camp.platform}</span>
                  </td>
                  <td>
                    <strong>₹{Number(camp.budget || 0).toLocaleString('en-IN')}</strong>
                  </td>
                  <td>
                    <span className="leads-badge">{getCampaignLeadsCount(camp.id)} leads</span>
                  </td>
                  <td>
                    <StatusBadge status={camp.status} />
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {camp.startDate || '—'} {camp.endDate ? `to ${camp.endDate}` : ''}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions-group">
                      <button
                        className="btn btn-icon btn-sm"
                        title="Edit Campaign"
                        onClick={() => {
                          setCampaignToEdit(camp);
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
                        title="Delete Campaign"
                        onClick={() => {
                          setCampaignToDelete(camp);
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

      {/* Campaign Create/Edit Modal */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCampaignToEdit(null);
        }}
        onSave={handleSaveCampaign}
        campaignToEdit={campaignToEdit}
        clients={clients}
      />

      {/* Delete Campaign Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCampaignToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        campaign={campaignToDelete}
        clientName={campaignToDelete ? getClientName(campaignToDelete.clientId) : ''}
      />
    </div>
  );
}
