/**
 * Campaign Service - In-memory business logic with search, filters, CRUD, and deletion protection
 */
const { campaigns, clients, leads } = require('../data/mockData');

const getAllCampaigns = (filters = {}) => {
  const { search, clientId, platform, status } = filters;

  return campaigns.filter((camp) => {
    // Platform filter
    if (platform && platform !== 'All' && camp.platform.toLowerCase() !== platform.toLowerCase()) {
      return false;
    }

    // Status filter
    if (status && status !== 'All' && camp.status.toLowerCase() !== status.toLowerCase()) {
      return false;
    }

    // Client filter
    if (clientId && clientId !== 'All' && camp.clientId !== clientId) {
      return false;
    }

    // Search query (name, platform, client name)
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      const campName = (camp.campaignName || camp.name || '').toLowerCase();
      const campPlatform = (camp.platform || '').toLowerCase();
      const clientObj = clients.find((c) => c.id === camp.clientId);
      const clientName = clientObj ? clientObj.name.toLowerCase() : '';

      const matchesSearch =
        campName.includes(q) ||
        campPlatform.includes(q) ||
        clientName.includes(q);

      if (!matchesSearch) {
        return false;
      }
    }

    return true;
  });
};

const getCampaignById = (id) => {
  return campaigns.find((c) => c.id === id) || null;
};

const createCampaign = (data) => {
  const name = data.campaignName || data.name;
  if (!name || !name.trim()) {
    const error = new Error('Campaign name is required');
    error.status = 400;
    throw error;
  }

  if (!data.clientId) {
    const error = new Error('Client ID is required');
    error.status = 400;
    throw error;
  }

  const newCampaign = {
    id: `camp-${Date.now()}`,
    name: name.trim(),
    campaignName: name.trim(),
    clientId: data.clientId,
    platform: data.platform || 'Google Ads',
    budget: Number(data.budget) || 0,
    startDate: data.startDate || new Date().toISOString().split('T')[0],
    endDate: data.endDate || '',
    status: data.status || 'Active'
  };

  campaigns.unshift(newCampaign);
  return newCampaign;
};

const updateCampaign = (id, data) => {
  const index = campaigns.findIndex((c) => c.id === id);
  if (index === -1) {
    const error = new Error(`Campaign with ID ${id} not found`);
    error.status = 404;
    throw error;
  }

  const existing = campaigns[index];
  const updatedName = (data.campaignName !== undefined ? data.campaignName : data.name) || existing.name;

  const updatedCampaign = {
    ...existing,
    name: updatedName,
    campaignName: updatedName,
    clientId: data.clientId !== undefined ? data.clientId : existing.clientId,
    platform: data.platform !== undefined ? data.platform : existing.platform,
    budget: data.budget !== undefined ? Number(data.budget) : existing.budget,
    startDate: data.startDate !== undefined ? data.startDate : existing.startDate,
    endDate: data.endDate !== undefined ? data.endDate : existing.endDate,
    status: data.status !== undefined ? data.status : existing.status
  };

  campaigns[index] = updatedCampaign;
  return updatedCampaign;
};

const deleteCampaign = (id) => {
  const index = campaigns.findIndex((c) => c.id === id);
  if (index === -1) {
    const error = new Error(`Campaign with ID ${id} not found`);
    error.status = 404;
    throw error;
  }

  // Deletion protection: Check if associated leads exist
  const associatedLeads = leads.filter((l) => l.campaignId === id);
  if (associatedLeads.length > 0) {
    const error = new Error(
      `Cannot delete campaign "${campaigns[index].name || campaigns[index].campaignName}" because it has ${associatedLeads.length} associated lead(s).`
    );
    error.status = 409;
    throw error;
  }

  const deleted = campaigns.splice(index, 1)[0];
  return deleted;
};

module.exports = {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
};

