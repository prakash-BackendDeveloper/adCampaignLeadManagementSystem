/**
 * Lead Service - In-memory business logic with search, multi-field filtering, CRUD, and status updates
 */
const { leads, campaigns, teamMembers } = require("../data/mockData");

const getAllLeads = (filters = {}) => {
  const { search, status, campaignId, assignedTo } = filters;

  return leads.filter((lead) => {
    // Status filter
    if (
      status &&
      status !== "All" &&
      lead.status.toLowerCase() !== status.toLowerCase()
    ) {
      return false;
    }

    // Campaign filter
    if (campaignId && campaignId !== "All" && lead.campaignId !== campaignId) {
      return false;
    }

    // Assigned-to filter
    if (assignedTo && assignedTo !== "All" && lead.assignedTo !== assignedTo) {
      return false;
    }

    // Search query (name, email, phone, campaign name, assignee name)
    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      const leadName = (lead.leadName || lead.name || "").toLowerCase();
      const email = (lead.email || "").toLowerCase();
      const phone = (lead.phone || "").toLowerCase();

      const camp = campaigns.find((c) => c.id === lead.campaignId);
      const campName = camp
        ? (camp.campaignName || camp.name || "").toLowerCase()
        : "";

      const member = teamMembers.find((t) => t.id === lead.assignedTo);
      const memberName = member ? member.name.toLowerCase() : "";

      const matchesSearch =
        leadName.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        campName.includes(q) ||
        memberName.includes(q);

      if (!matchesSearch) {
        return false;
      }
    }

    return true;
  });
};

const getLeadById = (id) => {
  return leads.find((l) => l.id === id) || null;
};

const createLead = (data) => {
  const name = data.leadName || data.name;
  if (!name || !name.trim()) {
    const error = new Error("Lead name is required");
    error.status = 400;
    throw error;
  }

  if (!data.email || !data.email.trim()) {
    const error = new Error("Email is required");
    error.status = 400;
    throw error;
  }

  if (!data.phone || !data.phone.trim()) {
    const error = new Error("Phone number is required");
    error.status = 400;
    throw error;
  }

  if (!data.campaignId) {
    const error = new Error("Source campaign is required");
    error.status = 400;
    throw error;
  }

  const today = new Date().toISOString().split("T")[0];
  const newLead = {
    id: `lead-${Date.now()}`,
    name: name.trim(),
    leadName: name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    campaignId: data.campaignId,
    assignedTo:
      data.assignedTo || (teamMembers[0] ? teamMembers[0].id : "team-1"),
    status: data.status || "New",
    createdDate: data.createdDate || today,
    followUpDate: data.followUpDate || data.createdDate || today,
  };

  leads.unshift(newLead);
  return newLead;
};

const updateLead = (id, data) => {
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) {
    const error = new Error(`Lead with ID ${id} not found`);
    error.status = 404;
    throw error;
  }

  const existing = leads[index];
  const updatedName =
    (data.leadName !== undefined ? data.leadName : data.name) || existing.name;

  const updatedLead = {
    ...existing,
    name: updatedName,
    leadName: updatedName,
    email: data.email !== undefined ? data.email.trim() : existing.email,
    phone: data.phone !== undefined ? data.phone.trim() : existing.phone,
    campaignId:
      data.campaignId !== undefined ? data.campaignId : existing.campaignId,
    assignedTo:
      data.assignedTo !== undefined ? data.assignedTo : existing.assignedTo,
    status: data.status !== undefined ? data.status : existing.status,
    createdDate:
      data.createdDate !== undefined ? data.createdDate : existing.createdDate,
    followUpDate:
      data.followUpDate !== undefined
        ? data.followUpDate
        : existing.followUpDate,
  };

  leads[index] = updatedLead;
  return updatedLead;
};

const deleteLead = (id) => {
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) {
    const error = new Error(`Lead with ID ${id} not found`);
    error.status = 404;
    throw error;
  }

  const deleted = leads.splice(index, 1)[0];
  return deleted;
};

module.exports = {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
