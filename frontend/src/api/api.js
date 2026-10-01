/**
 * Frontend API Service Layer
 * Connects React frontend to Express backend endpoints.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Helper to handle fetch responses and standardize errors
 */
async function fetchJson(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(json.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = json;
      throw error;
    }

    return json;
  } catch (error) {
    console.error(`API error on ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Health check endpoint
 * GET /api/health
 */
export async function getHealth() {
  return fetchJson('/health');
}

/**
 * Dashboard overview endpoint
 * GET /api/dashboard
 */
export async function getDashboard() {
  return fetchJson('/dashboard');
}

/**
 * Clients list endpoint
 * GET /api/clients
 */
export async function getClients() {
  return fetchJson('/clients');
}

/**
 * Team Members list endpoint
 * GET /api/team-members
 */
export async function getTeamMembers() {
  return fetchJson('/team-members');
}

/**
 * Campaigns list endpoint with optional query parameters
 * GET /api/campaigns?search=...&clientId=...&platform=...&status=...
 */
export async function getCampaigns(filters = {}) {
  const query = new URLSearchParams();
  if (filters.search) query.append('search', filters.search);
  if (filters.clientId && filters.clientId !== 'All') query.append('clientId', filters.clientId);
  if (filters.platform && filters.platform !== 'All') query.append('platform', filters.platform);
  if (filters.status && filters.status !== 'All') query.append('status', filters.status);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return fetchJson(`/campaigns${queryString}`);
}

/**
 * Single campaign endpoint
 * GET /api/campaigns/:id
 */
export async function getCampaignById(id) {
  return fetchJson(`/campaigns/${id}`);
}

/**
 * Create campaign endpoint
 * POST /api/campaigns
 */
export async function createCampaign(campaignData) {
  return fetchJson('/campaigns', {
    method: 'POST',
    body: JSON.stringify(campaignData),
  });
}

/**
 * Update campaign endpoint
 * PUT /api/campaigns/:id
 */
export async function updateCampaign(id, campaignData) {
  return fetchJson(`/campaigns/${id}`, {
    method: 'PUT',
    body: JSON.stringify(campaignData),
  });
}

/**
 * Delete campaign endpoint
 * DELETE /api/campaigns/:id
 */
export async function deleteCampaign(id) {
  return fetchJson(`/campaigns/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Leads list endpoint with optional query parameters
 * GET /api/leads?search=...&status=...&campaignId=...&assignedTo=...
 */
export async function getLeads(filters = {}) {
  const query = new URLSearchParams();
  if (filters.search) query.append('search', filters.search);
  if (filters.status && filters.status !== 'All') query.append('status', filters.status);
  if (filters.campaignId && filters.campaignId !== 'All') query.append('campaignId', filters.campaignId);
  if (filters.assignedTo && filters.assignedTo !== 'All') query.append('assignedTo', filters.assignedTo);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return fetchJson(`/leads${queryString}`);
}

/**
 * Single lead endpoint
 * GET /api/leads/:id
 */
export async function getLeadById(id) {
  return fetchJson(`/leads/${id}`);
}

/**
 * Create lead endpoint
 * POST /api/leads
 */
export async function createLead(leadData) {
  return fetchJson('/leads', {
    method: 'POST',
    body: JSON.stringify(leadData),
  });
}

/**
 * Update lead endpoint
 * PUT /api/leads/:id
 */
export async function updateLead(id, leadData) {
  return fetchJson(`/leads/${id}`, {
    method: 'PUT',
    body: JSON.stringify(leadData),
  });
}

/**
 * Update lead status endpoint
 * PUT /api/leads/:id
 */
export async function updateLeadStatus(id, status) {
  return fetchJson(`/leads/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

/**
 * Delete lead endpoint
 * DELETE /api/leads/:id
 */
export async function deleteLead(id) {
  return fetchJson(`/leads/${id}`, {
    method: 'DELETE',
  });
}
