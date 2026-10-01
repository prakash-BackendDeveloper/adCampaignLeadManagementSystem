/**
 * Lead Controller - HTTP Request Handlers for CRUD & Search/Filters
 */
const leadService = require('../services/leadService');

const getLeads = (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      status: req.query.status,
      campaignId: req.query.campaignId,
      assignedTo: req.query.assignedTo
    };
    const data = leadService.getAllLeads(filters);
    res.status(200).json({
      success: true,
      data,
      total: data.length
    });
  } catch (error) {
    next(error);
  }
};

const getLeadById = (req, res, next) => {
  try {
    const lead = leadService.getLeadById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: `Lead with ID ${req.params.id} not found`
      });
    }
    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

const createLead = (req, res, next) => {
  try {
    const newLead = leadService.createLead(req.body);
    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: newLead
    });
  } catch (error) {
    next(error);
  }
};

const updateLead = (req, res, next) => {
  try {
    const updatedLead = leadService.updateLead(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: updatedLead
    });
  } catch (error) {
    next(error);
  }
};

const deleteLead = (req, res, next) => {
  try {
    const deletedLead = leadService.deleteLead(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      data: deletedLead
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
};

