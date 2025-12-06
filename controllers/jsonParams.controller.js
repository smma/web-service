const db = require('../models/database');
const ResponseFactory = require('../factories/ResponseFactory');

// Get JSON params from database (defaults to activityID 12345)
exports.getJsonParams = (req, res) => {
  try {
    // Use default activityID 12345 or get from query params if provided
    const activityID = req.query.activityID || '12345';
    const jsonParams = db.getJsonParams(activityID);
    
    if (!jsonParams) {
      return ResponseFactory.notFound(res, 'Activity');
    }
    
    return ResponseFactory.success(res, jsonParams);
  } catch (error) {
    return ResponseFactory.serverError(res, error);
  }
};

// Get analytics list from database
exports.getAnalyticsList = (req, res) => {
  try {
    const analyticsList = db.getAnalyticsList();
    return ResponseFactory.success(res, analyticsList);
  } catch (error) {
    return ResponseFactory.serverError(res, error);
  }
};

// Get analytics data by activityID
exports.getAnalytics = (req, res) => {
  try {
    const { activityID } = req.body;

    if (!activityID) {
      return ResponseFactory.badRequest(res, 'activityID is required');
    }

    const analytics = db.getAnalytics(activityID);
    
    if (!analytics) {
      return ResponseFactory.notFound(res, 'Analytics not found for this activityID');
    }
    
    return ResponseFactory.success(res, analytics);
  } catch (error) {
    return ResponseFactory.serverError(res, error);
  }
};

