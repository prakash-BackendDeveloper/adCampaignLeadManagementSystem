/**
 * Mock data for Clients, Campaigns, Team Members, and Leads (Frontend-only in-memory storage)
 */

export const initialClients = [
  { id: 'cli-1', name: 'Tata Digital Solutions', industry: 'Technology', city: 'Mumbai' },
  { id: 'cli-2', name: 'Reliance Retail Ventures', industry: 'Retail', city: 'Mumbai' },
  { id: 'cli-3', name: 'Infosys BPM Services', industry: 'IT & Services', city: 'Bengaluru' },
  { id: 'cli-4', name: 'Mahindra Logistics Ltd', industry: 'Logistics', city: 'Pune' },
  { id: 'cli-5', name: 'Zomato Media Ltd', industry: 'Food Delivery', city: 'Gurugram' },
  { id: 'cli-6', name: 'Swiggy Instamart', industry: 'Quick Commerce', city: 'Bengaluru' },
  { id: 'cli-7', name: 'Nykaa Lifestyle Beauty', industry: 'E-commerce', city: 'Mumbai' },
  { id: 'cli-8', name: 'Paytm Financial Services', industry: 'FinTech', city: 'Noida' },
  { id: 'cli-9', name: 'Ola Electric Mobility', industry: 'Automotive', city: 'Bengaluru' },
  { id: 'cli-10', name: 'Flipkart Internet Pvt Ltd', industry: 'E-commerce', city: 'Bengaluru' }
];

export const initialCampaigns = [
  {
    id: 'camp-1',
    campaignName: 'Diwali Festive Electronics Mega Sale',
    clientId: 'cli-10',
    platform: 'Google Ads',
    budget: 85000,
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    status: 'Active'
  },
  {
    id: 'camp-2',
    campaignName: 'Gourmet Midnight Munchies Blitz',
    clientId: 'cli-5',
    platform: 'Instagram',
    budget: 45000,
    startDate: '2026-09-15',
    endDate: '2026-10-15',
    status: 'Active'
  },
  {
    id: 'camp-3',
    campaignName: 'S1 Pro Gen-3 Pre-Booking Push',
    clientId: 'cli-9',
    platform: 'Facebook',
    budget: 120000,
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    status: 'Completed'
  },
  {
    id: 'camp-4',
    campaignName: 'Beauty Superstars Autumn Showcase',
    clientId: 'cli-7',
    platform: 'Instagram',
    budget: 60000,
    startDate: '2026-09-20',
    endDate: '2026-10-20',
    status: 'Active'
  },
  {
    id: 'camp-5',
    campaignName: 'Enterprise Cloud Migration Advisory',
    clientId: 'cli-1',
    platform: 'Other',
    budget: 95000,
    startDate: '2026-07-01',
    endDate: '2026-10-30',
    status: 'Paused'
  },
  {
    id: 'camp-6',
    campaignName: 'Smart Bazaar Weekly Groceries Rush',
    clientId: 'cli-2',
    platform: 'Google Ads',
    budget: 70000,
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    status: 'Completed'
  },
  {
    id: 'camp-7',
    campaignName: 'Soundbox Pro Merchant Acquisition',
    clientId: 'cli-8',
    platform: 'Facebook',
    budget: 55000,
    startDate: '2026-09-10',
    endDate: '2026-10-10',
    status: 'Active'
  },
  {
    id: 'camp-8',
    campaignName: 'Supply Chain Express Fleet Outreach',
    clientId: 'cli-4',
    platform: 'Google Ads',
    budget: 40000,
    startDate: '2026-08-15',
    endDate: '2026-11-15',
    status: 'Active'
  },
  {
    id: 'camp-9',
    campaignName: '10-Minute Grocery Delivery Expansion',
    clientId: 'cli-6',
    platform: 'Instagram',
    budget: 65000,
    startDate: '2026-09-01',
    endDate: '2026-10-05',
    status: 'Active'
  },
  {
    id: 'camp-10',
    campaignName: 'Global BPM Talent Recruitment Drive',
    clientId: 'cli-3',
    platform: 'Other',
    budget: 35000,
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    status: 'Completed'
  },
  {
    id: 'camp-11',
    campaignName: 'Big Billion Days Early Access Buzz',
    clientId: 'cli-10',
    platform: 'Facebook',
    budget: 150000,
    startDate: '2026-09-25',
    endDate: '2026-10-10',
    status: 'Active'
  },
  {
    id: 'camp-12',
    campaignName: 'Luxury Skincare Festival 2026',
    clientId: 'cli-7',
    platform: 'Instagram',
    budget: 50000,
    startDate: '2026-07-15',
    endDate: '2026-08-15',
    status: 'Completed'
  },
  {
    id: 'camp-13',
    campaignName: 'Quick Loan Instant Disbursal Campaign',
    clientId: 'cli-8',
    platform: 'Google Ads',
    budget: 80000,
    startDate: '2026-09-05',
    endDate: '2026-10-25',
    status: 'Paused'
  },
  {
    id: 'camp-14',
    campaignName: 'Hyperlocal 3PL Warehouse Solutions',
    clientId: 'cli-4',
    platform: 'Other',
    budget: 30000,
    startDate: '2026-09-18',
    endDate: '2026-10-18',
    status: 'Active'
  },
  {
    id: 'camp-15',
    campaignName: 'Digital Banking AI Suite Awareness',
    clientId: 'cli-1',
    platform: 'Google Ads',
    budget: 90000,
    startDate: '2026-08-20',
    endDate: '2026-09-20',
    status: 'Completed'
  }
];

export const initialTeamMembers = [
  { id: 'team-1', name: 'Priya' },
  { id: 'team-2', name: 'Arun' },
  { id: 'team-3', name: 'Karthik' },
  { id: 'team-4', name: 'Divya' }
];

export const initialLeads = [
  {
    id: 'lead-1',
    leadName: 'Vikram Malhotra',
    email: 'vikram.m@techpulse.in',
    phone: '+91 98450 12345',
    campaignId: 'camp-1',
    assignedTo: 'team-1', // Priya
    status: 'New',
    createdDate: '2026-09-25',
    followUpDate: '2026-10-02'
  },
  {
    id: 'lead-2',
    leadName: 'Ananya Deshmukh',
    email: 'ananya.d@foodiebites.com',
    phone: '+91 98230 45678',
    campaignId: 'camp-2',
    assignedTo: 'team-2', // Arun
    status: 'Contacted',
    createdDate: '2026-09-20',
    followUpDate: '2026-10-01'
  },
  {
    id: 'lead-3',
    leadName: 'Rahul Verma',
    email: 'r.verma@greenmobility.org',
    phone: '+91 97110 78901',
    campaignId: 'camp-3',
    assignedTo: 'team-3', // Karthik
    status: 'Converted',
    createdDate: '2026-08-15',
    followUpDate: '2026-08-25'
  },
  {
    id: 'lead-4',
    leadName: 'Pooja Sundaram',
    email: 'pooja.s@glamgoddess.in',
    phone: '+91 94440 34567',
    campaignId: 'camp-4',
    assignedTo: 'team-4', // Divya
    status: 'Qualified',
    createdDate: '2026-09-22',
    followUpDate: '2026-10-03'
  },
  {
    id: 'lead-5',
    leadName: 'Sanjay Kulkarni',
    email: 'sanjay@apexinfra.co.in',
    phone: '+91 98220 89012',
    campaignId: 'camp-5',
    assignedTo: 'team-1', // Priya
    status: 'Contacted',
    createdDate: '2026-09-10',
    followUpDate: '2026-10-04'
  },
  {
    id: 'lead-6',
    leadName: 'Meera Nambiar',
    email: 'meera.n@freshmart.in',
    phone: '+91 99950 67890',
    campaignId: 'camp-6',
    assignedTo: 'team-2', // Arun
    status: 'Converted',
    createdDate: '2026-09-05',
    followUpDate: '2026-09-15'
  },
  {
    id: 'lead-7',
    leadName: 'Rohan Joshi',
    email: 'rohan.j@kiranaexpress.net',
    phone: '+91 98190 23456',
    campaignId: 'camp-7',
    assignedTo: 'team-3', // Karthik
    status: 'Qualified',
    createdDate: '2026-09-18',
    followUpDate: '2026-10-02'
  },
  {
    id: 'lead-8',
    leadName: 'Deepak Singhania',
    email: 'deepak@speedylog.in',
    phone: '+91 98300 56789',
    campaignId: 'camp-8',
    assignedTo: 'team-4', // Divya
    status: 'New',
    createdDate: '2026-09-28',
    followUpDate: '2026-10-05'
  },
  {
    id: 'lead-9',
    leadName: 'Kavita Menon',
    email: 'kavita.m@urbanpantry.com',
    phone: '+91 98470 90123',
    campaignId: 'camp-9',
    assignedTo: 'team-1', // Priya
    status: 'Qualified',
    createdDate: '2026-09-15',
    followUpDate: '2026-10-03'
  },
  {
    id: 'lead-10',
    leadName: 'Amitabh Sen',
    email: 'amitabh.sen@hrsolutions.org',
    phone: '+91 98310 12349',
    campaignId: 'camp-10',
    assignedTo: 'team-2', // Arun
    status: 'Lost',
    createdDate: '2026-07-10',
    followUpDate: '2026-07-25'
  },
  {
    id: 'lead-11',
    leadName: 'Tanvi Agarwal',
    email: 'tanvi.a@retailgenie.in',
    phone: '+91 98710 45672',
    campaignId: 'camp-11',
    assignedTo: 'team-3', // Karthik
    status: 'New',
    createdDate: '2026-09-29',
    followUpDate: '2026-10-04'
  },
  {
    id: 'lead-12',
    leadName: 'Neha Kapoor',
    email: 'neha.k@radiantskin.com',
    phone: '+91 98110 78903',
    campaignId: 'camp-12',
    assignedTo: 'team-4', // Divya
    status: 'Converted',
    createdDate: '2026-08-01',
    followUpDate: '2026-08-10'
  },
  {
    id: 'lead-13',
    leadName: 'Manish Tiwari',
    email: 'm.tiwari@smefinance.co.in',
    phone: '+91 99350 23458',
    campaignId: 'camp-13',
    assignedTo: 'team-1', // Priya
    status: 'Contacted',
    createdDate: '2026-09-12',
    followUpDate: '2026-10-06'
  },
  {
    id: 'lead-14',
    leadName: 'Sunil Chawla',
    email: 'sunil@northdockfreight.com',
    phone: '+91 98100 89014',
    campaignId: 'camp-14',
    assignedTo: 'team-2', // Arun
    status: 'New',
    createdDate: '2026-09-26',
    followUpDate: '2026-10-03'
  },
  {
    id: 'lead-15',
    leadName: 'Aishwarya Roy',
    email: 'aishwarya.roy@fintechinnovate.com',
    phone: '+91 98360 67895',
    campaignId: 'camp-15',
    assignedTo: 'team-3', // Karthik
    status: 'Lost',
    createdDate: '2026-08-25',
    followUpDate: '2026-09-05'
  }
];

