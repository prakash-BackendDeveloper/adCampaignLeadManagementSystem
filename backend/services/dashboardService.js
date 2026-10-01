/**
 * Dashboard Service - Dynamic In-memory Metrics & Analytics Calculations
 */
const { clients, campaigns, teamMembers, leads } = require("../data/mockData");

const getDashboardOverview = () => {
  const totalClients = clients.length;
  const totalCampaigns = campaigns.length;
  const totalLeads = leads.length;

  // KPI Calculations
  const convertedLeads = leads.filter((l) => l.status === "Converted").length;
  const conversionRate =
    totalLeads > 0
      ? Number(((convertedLeads / totalLeads) * 100).toFixed(1))
      : 0;

  // Pending Follow-ups: leads in active pipeline stages awaiting follow-up/action
  const pendingFollowUps = leads.filter(
    (l) => l.status !== "Converted" && l.status !== "Lost",
  ).length;

  // Campaign Status Breakdown
  const campaignStatusSummary = {
    active: campaigns.filter((c) => c.status === "Active").length,
    paused: campaigns.filter((c) => c.status === "Paused").length,
    completed: campaigns.filter((c) => c.status === "Completed").length,
  };

  // Lead Status Breakdown
  const leadStatusSummary = {
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    qualified: leads.filter((l) => l.status === "Qualified").length,
    converted: convertedLeads,
    lost: leads.filter((l) => l.status === "Lost").length,
  };

  // Helper maps for resolving names
  const campaignMap = {};
  campaigns.forEach((c) => {
    campaignMap[c.id] = c.name;
  });

  const teamMap = {};
  teamMembers.forEach((t) => {
    teamMap[t.id] = t.name;
  });

  // Recent Leads: sorted by createdDate descending, max 5 records
  const recentLeads = [...leads]
    .sort((a, b) => (b.createdDate || "").localeCompare(a.createdDate || ""))
    .slice(0, 5)
    .map((lead) => ({
      id: lead.id,
      name: lead.name,
      campaignId: lead.campaignId,
      campaignName: campaignMap[lead.campaignId] || "Unknown Campaign",
      assignedTo: lead.assignedTo,
      assignedToName: teamMap[lead.assignedTo] || "Unassigned",
      status: lead.status,
      createdDate: lead.createdDate,
    }));

  return {
    totalClients: clients.length,
    totalCampaigns: campaigns.length,
    totalLeads: leads.length,
    kpis: {
      totalClients,
      totalCampaigns,
      totalLeads,
      convertedLeads,
      conversionRate,
      pendingFollowUps,
    },
    campaignStatusSummary,
    leadStatusSummary,
    recentLeads,
  };
};

module.exports = {
  getDashboardOverview,
};
