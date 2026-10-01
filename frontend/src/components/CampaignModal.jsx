import React, { useState, useEffect } from 'react';

export default function CampaignModal({
  isOpen,
  onClose,
  onSave,
  campaignToEdit,
  clients
}) {
  const isEditMode = Boolean(campaignToEdit);

  const [formData, setFormData] = useState({
    campaignName: '',
    clientId: '',
    platform: 'Google Ads',
    budget: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (campaignToEdit) {
      setFormData({
        campaignName: campaignToEdit.campaignName || '',
        clientId: campaignToEdit.clientId || '',
        platform: campaignToEdit.platform || 'Google Ads',
        budget: campaignToEdit.budget !== undefined ? campaignToEdit.budget : '',
        startDate: campaignToEdit.startDate || '',
        endDate: campaignToEdit.endDate || '',
        status: campaignToEdit.status || 'Active'
      });
    } else {
      setFormData({
        campaignName: '',
        clientId: clients.length > 0 ? clients[0].id : '',
        platform: 'Google Ads',
        budget: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        status: 'Active'
      });
    }
    setErrors({});
  }, [campaignToEdit, isOpen, clients]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.campaignName.trim()) {
      newErrors.campaignName = 'Campaign name is required.';
    }

    if (!formData.clientId) {
      newErrors.clientId = 'Please select a client.';
    }

    if (!formData.platform) {
      newErrors.platform = 'Please select an advertising platform.';
    }

    const budgetNum = Number(formData.budget);
    if (!formData.budget && formData.budget !== 0) {
      newErrors.budget = 'Budget amount is required.';
    } else if (isNaN(budgetNum) || budgetNum <= 0) {
      newErrors.budget = 'Budget must be a valid amount greater than 0.';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required.';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required.';
    } else if (formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date must not be before start date.';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...(campaignToEdit ? { id: campaignToEdit.id } : {}),
      campaignName: formData.campaignName.trim(),
      clientId: formData.clientId,
      platform: formData.platform,
      budget: Number(formData.budget),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditMode ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {/* Campaign Name */}
              <div className="form-group">
                <label className="form-label">
                  Campaign Name <span className="form-label-required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.campaignName ? 'is-invalid' : ''}`}
                  placeholder="e.g. Diwali Festive Mega Sale"
                  value={formData.campaignName}
                  onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                />
                {errors.campaignName && (
                  <span className="form-error-msg">{errors.campaignName}</span>
                )}
              </div>

              {/* Client & Platform */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">
                    Client <span className="form-label-required">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.clientId ? 'is-invalid' : ''}`}
                    value={formData.clientId}
                    onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  >
                    <option value="">Select a Client</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.clientId && (
                    <span className="form-error-msg">{errors.clientId}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Platform <span className="form-label-required">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.platform ? 'is-invalid' : ''}`}
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.platform && (
                    <span className="form-error-msg">{errors.platform}</span>
                  )}
                </div>
              </div>

              {/* Budget & Status */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">
                    Budget (₹) <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="500"
                    className={`form-control ${errors.budget ? 'is-invalid' : ''}`}
                    placeholder="e.g. 50000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                  {errors.budget && (
                    <span className="form-error-msg">{errors.budget}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Status <span className="form-label-required">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Completed">Completed</option>
                  </select>
                  {errors.status && (
                    <span className="form-error-msg">{errors.status}</span>
                  )}
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">
                    Start Date <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                  {errors.startDate && (
                    <span className="form-error-msg">{errors.startDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    End Date <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                  {errors.endDate && (
                    <span className="form-error-msg">{errors.endDate}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? 'Update Campaign' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
