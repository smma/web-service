const db = require('../models/database');

// Get JSON params from database (defaults to activityID 12345)
exports.getJsonParams = (req, res) => {
  try {
    // Use default activityID 12345 or get from query params if provided
    const activityID = req.query.activityID || '12345';
    const jsonParams = db.getJsonParams(activityID);
    
    if (!jsonParams) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
    }
    
    res.status(200).json(jsonParams);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get analytics list from database
exports.getAnalyticsList = (req, res) => {
  try {
    const analyticsList = db.getAnalyticsList();
    res.status(200).json(analyticsList);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get analytics data by activityID
exports.getAnalytics = (req, res) => {
  try {
    const { activityID } = req.body;

    if (!activityID) {
      return res.status(400).json({
        success: false,
        error: 'activityID is required'
      });
    }

    const analytics = db.getAnalytics(activityID);
    
    if (!analytics) {
      return res.status(404).json({
        success: false,
        error: 'Analytics not found for this activityID'
      });
    }
    
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

