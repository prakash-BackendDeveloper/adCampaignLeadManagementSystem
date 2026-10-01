/**
 * Express Server Entry Point
 * Ad Campaign & Lead Management System Backend
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const campaignRoutes = require("./routes/campaignRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middleware
app.use(cors());
app.use(express.json());

// Basic Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// API Routes
app.use("/api/campaigns", campaignRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Helper reference endpoints
app.get("/api/clients", (req, res) => {
  const { clients } = require("./data/mockData");
  res.status(200).json({ success: true, data: clients });
});

app.get("/api/team-members", (req, res) => {
  const { teamMembers } = require("./data/mockData");
  res.status(200).json({ success: true, data: teamMembers });
});

// 404 & Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
