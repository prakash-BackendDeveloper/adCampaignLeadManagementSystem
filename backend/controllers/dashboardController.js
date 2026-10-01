/**
 * Dashboard Controller - HTTP Request Handler foundation
 */
const dashboardService = require('../services/dashboardService');

const getOverview = (req, res, next) => {
  try {
    const data = dashboardService.getDashboardOverview();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview
};
