import React, { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';

const ALLOWED_STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

export default function LeadStatusModal({
  isOpen,
  onClose,
  onUpdateStatus,
  lead,
  isSubmitting = false,
  apiError = null
}) {
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    if (lead) {
      setSelectedStatus(lead.status || 'New');
    }
  }, [lead, isOpen]);

  if (!isOpen || !lead) return null;

  const handleSave = () => {
    if (isSubmitting) return;
    if (ALLOWED_STATUSES.includes(selectedStatus)) {
      onUpdateStatus(lead.id, selectedStatus);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-dialog-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Update Lead Status</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog" disabled={isSubmitting}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {apiError && (
            <div className="alert-banner alert-danger" style={{ marginBottom: '1.25rem' }}>
              <span>{apiError}</span>
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {lead.leadName || lead.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Current Status: <StatusBadge status={lead.status} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Select New Status</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              {ALLOWED_STATUSES.map((st) => (
                <label
                  key={st}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.6rem 0.85rem',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    backgroundColor: selectedStatus === st ? 'var(--primary-50)' : 'var(--bg-surface)',
                    borderColor: selectedStatus === st ? 'var(--primary-500)' : 'var(--border-light)',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  <input
                    type="radio"
                    name="leadStatus"
                    value={st}
                    checked={selectedStatus === st}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <StatusBadge status={st} />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Applying...' : 'Apply Status'}
          </button>
        </div>
      </div>
    </div>
  );
}

