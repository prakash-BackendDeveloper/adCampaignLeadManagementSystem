const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// GET /api/leads - Foundation route
router.get('/', leadController.getLeads);

module.exports = router;
