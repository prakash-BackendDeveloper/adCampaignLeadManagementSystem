import React, { useState, useEffect } from "react";

export default function LeadModal({
  isOpen,
  onClose,
  onSave,
  leadToEdit,
  campaigns,
  teamMembers,
}) {
  const isEditMode = Boolean(leadToEdit);

  const [formData, setFormData] = useState({
    leadName: "",
    email: "",
    phone: "",
    campaignId: "",
    assignedTo: "",
    status: "New",
    createdDate: "",
    followUpDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (leadToEdit) {
      setFormData({
        leadName: leadToEdit.leadName || leadToEdit.name || "",
        email: leadToEdit.email || "",
        phone: leadToEdit.phone || "",
        campaignId: leadToEdit.campaignId || "",
        assignedTo: leadToEdit.assignedTo || "",
        status: leadToEdit.status || "New",
        createdDate: leadToEdit.createdDate || "",
        followUpDate: leadToEdit.followUpDate || "",
      });
    } else {
      const today = new Date().toISOString().split("T")[0];
      setFormData({
        leadName: "",
        email: "",
        phone: "",
        campaignId: campaigns && campaigns.length > 0 ? campaigns[0].id : "",
        assignedTo:
          teamMembers && teamMembers.length > 0 ? teamMembers[0].id : "",
        status: "New",
        createdDate: today,
        followUpDate: today,
      });
    }
    setErrors({});
  }, [leadToEdit, isOpen, campaigns, teamMembers]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.leadName.trim()) {
      newErrors.leadName = "Lead name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.campaignId) {
      newErrors.campaignId = "Please select a source campaign.";
    }

    if (!formData.assignedTo) {
      newErrors.assignedTo = "Please select an assigned team member.";
    }

    if (!formData.status) {
      newErrors.status = "Status is required.";
    }

    if (!formData.createdDate) {
      newErrors.createdDate = "Created date is required.";
    }

    if (!formData.followUpDate) {
      newErrors.followUpDate = "Follow-up date is required.";
    } else if (
      formData.createdDate &&
      formData.followUpDate < formData.createdDate
    ) {
      newErrors.followUpDate =
        "Follow-up date must not be before created date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...(leadToEdit ? { id: leadToEdit.id } : {}),
      leadName: formData.leadName.trim(),
      name: formData.leadName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      campaignId: formData.campaignId,
      assignedTo: formData.assignedTo,
      status: formData.status,
      createdDate: formData.createdDate,
      followUpDate: formData.followUpDate,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditMode ? "Edit Lead" : "Add New Lead"}
          </h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-grid">
              {/* Lead Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="leadNameInput">
                  Lead Name <span className="form-label-required">*</span>
                </label>
                <input
                  id="leadNameInput"
                  type="text"
                  className={`form-control ${errors.leadName ? "is-invalid" : ""}`}
                  placeholder="e.g. Vikram Malhotra"
                  value={formData.leadName}
                  onChange={(e) =>
                    setFormData({ ...formData, leadName: e.target.value })
                  }
                  autoFocus
                />
                {errors.leadName && (
                  <span className="form-error-msg">{errors.leadName}</span>
                )}
              </div>

              {/* Email & Phone */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="leadEmailInput">
                    Email Address <span className="form-label-required">*</span>
                  </label>
                  <input
                    id="leadEmailInput"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="e.g. vikram.m@techpulse.in"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <span className="form-error-msg">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="leadPhoneInput">
                    Phone Number <span className="form-label-required">*</span>
                  </label>
                  <input
                    id="leadPhoneInput"
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="e.g. +91 98450 12345"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  {errors.phone && (
                    <span className="form-error-msg">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Campaign & Assigned To */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="leadCampaignSelect">
                    Source Campaign{" "}
                    <span className="form-label-required">*</span>
                  </label>
                  <select
                    id="leadCampaignSelect"
                    className={`form-control ${errors.campaignId ? "is-invalid" : ""}`}
                    value={formData.campaignId}
                    onChange={(e) =>
                      setFormData({ ...formData, campaignId: e.target.value })
                    }
                  >
                    <option value="">Select a Campaign</option>
                    {campaigns &&
                      campaigns.map((camp) => (
                        <option key={camp.id} value={camp.id}>
                          {camp.campaignName || camp.name}
                        </option>
                      ))}
                  </select>
                  {errors.campaignId && (
                    <span className="form-error-msg">{errors.campaignId}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="leadAssigneeSelect">
                    Assigned To <span className="form-label-required">*</span>
                  </label>
                  <select
                    id="leadAssigneeSelect"
                    className={`form-control ${errors.assignedTo ? "is-invalid" : ""}`}
                    value={formData.assignedTo}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedTo: e.target.value })
                    }
                  >
                    <option value="">Select Assignee</option>
                    {teamMembers &&
                      teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                  </select>
                  {errors.assignedTo && (
                    <span className="form-error-msg">{errors.assignedTo}</span>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="form-group">
                <label className="form-label" htmlFor="leadStatusSelect">
                  Pipeline Status <span className="form-label-required">*</span>
                </label>
                <select
                  id="leadStatusSelect"
                  className={`form-control ${errors.status ? "is-invalid" : ""}`}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
                {errors.status && (
                  <span className="form-error-msg">{errors.status}</span>
                )}
              </div>

              {/* Created Date & Follow-up Date */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="leadCreatedDateInput">
                    Created Date <span className="form-label-required">*</span>
                  </label>
                  <input
                    id="leadCreatedDateInput"
                    type="date"
                    className={`form-control ${errors.createdDate ? "is-invalid" : ""}`}
                    value={formData.createdDate}
                    onChange={(e) =>
                      setFormData({ ...formData, createdDate: e.target.value })
                    }
                  />
                  {errors.createdDate && (
                    <span className="form-error-msg">{errors.createdDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="leadFollowUpDateInput">
                    Follow-up Date{" "}
                    <span className="form-label-required">*</span>
                  </label>
                  <input
                    id="leadFollowUpDateInput"
                    type="date"
                    className={`form-control ${errors.followUpDate ? "is-invalid" : ""}`}
                    value={formData.followUpDate}
                    onChange={(e) =>
                      setFormData({ ...formData, followUpDate: e.target.value })
                    }
                  />
                  {errors.followUpDate && (
                    <span className="form-error-msg">
                      {errors.followUpDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Save Changes" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
