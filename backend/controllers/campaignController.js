/**
 * Campaign Controller - HTTP Request Handlers for CRUD & Search/Filters
 */
const campaignService = require('../services/campaignService');

const getCampaigns = (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      clientId: req.query.clientId,
      platform: req.query.platform,
      status: req.query.status
    };
    const data = campaignService.getAllCampaigns(filters);
    res.status(200).json({
      success: true,
      data,
      total: data.length
    });
  } catch (error) {
    next(error);
  }
};

const getCampaignById = (req, res, next) => {
  try {
    const campaign = campaignService.getCampaignById(req.params.id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: `Campaign with ID ${req.params.id} not found`
      });
    }
    res.status(200).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    next(error);
  }
};

const createCampaign = (req, res, next) => {
  try {
    const newCampaign = campaignService.createCampaign(req.body);
    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: newCampaign
    });
  } catch (error) {
    next(error);
  }
};

const updateCampaign = (req, res, next) => {
  try {
    const updatedCampaign = campaignService.updateCampaign(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      data: updatedCampaign
    });
  } catch (error) {
    next(error);
  }
};

const deleteCampaign = (req, res, next) => {
  try {
    const deletedCampaign = campaignService.deleteCampaign(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully',
      data: deletedCampaign
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
};

