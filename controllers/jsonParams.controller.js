const db = require('../models/database');
const ResponseFactory = require('../factories/ResponseFactory');
const { ValidationHandler, RequiredFieldsHandler, ResourceExistsHandler } = require('../handlers');

// Get JSON params from database
exports.getJsonParams = (req, res) => {
  try {
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
    return ResponseFactory.success(res, db.getAnalyticsList());
  } catch (error) {
    return ResponseFactory.serverError(res, error);
  }
};

/**
 * Chain of Responsibility Pattern for analytics validation
 * Request → [RequiredFieldsHandler] → [ResourceExistsHandler] → Success
 *                    ↓                         ↓
 *              (error 400)              (error 404)
 */
const analyticsChain = ValidationHandler.buildChain([
  new RequiredFieldsHandler(['activityID'], 'body'),
  new ResourceExistsHandler('activityID', (id) => db.getAnalytics(id), 'Analytics', 'body')
]);

// Get analytics data by activityID
exports.getAnalytics = (req, res) => {
  try {
    const result = analyticsChain.handle(req);
    if (!result.success) {
      return ResponseFactory.error(res, result.error, result.statusCode);
    }

    // Resource already found by chain, stored in req.validatedResource
    return ResponseFactory.success(res, req.validatedResource);
  } catch (error) {
    return ResponseFactory.serverError(res, error);
  }
};
