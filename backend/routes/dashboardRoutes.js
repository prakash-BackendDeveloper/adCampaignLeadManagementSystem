const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// GET /api/dashboard - Foundation route
router.get('/', dashboardController.getOverview);

module.exports = router;
