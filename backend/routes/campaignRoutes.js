const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// GET /api/campaigns - Foundation route
router.get('/', campaignController.getCampaigns);

module.exports = router;
