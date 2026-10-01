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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const json = await response.json();
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
 * Campaigns list endpoint
 * GET /api/campaigns
 */
export async function getCampaigns() {
  return fetchJson('/campaigns');
}

/**
 * Leads list endpoint
 * GET /api/leads
 */
export async function getLeads() {
  return fetchJson('/leads');
}
