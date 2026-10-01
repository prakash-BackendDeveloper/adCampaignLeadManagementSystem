import React from 'react';

export default function DeleteLeadModal({
  isOpen,
  onClose,
  onConfirm,
  lead,
  campaignName,
  assigneeName,
  isSubmitting = false,
  apiError = null
}) {
  if (!isOpen || !lead) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-dialog-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Delete Lead</h2>
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

          <div className="delete-dialog-content">
            <div className="delete-dialog-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
            <div>
              <div className="delete-dialog-title">Are you sure you want to delete this lead?</div>
              <p className="delete-dialog-text">
                This will permanently remove the lead from your pipeline.
              </p>
              <div className="delete-dialog-item-card">
                <strong>{lead.leadName || lead.name}</strong>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  Campaign: {campaignName || 'Unknown Campaign'} • Assigned To: {assigneeName || 'Unassigned'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? 'Deleting...' : 'Delete Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}

