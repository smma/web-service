const ResponseFactory = require('../factories/ResponseFactory');
const { ValidationHandler, RequiredFieldsHandler } = require('../handlers');

/**
 * Chain of Responsibility Pattern for request validation
 * Request → [RequiredFieldsHandler] → Success or Error
 */
const validationChain = ValidationHandler.buildChain([
  new RequiredFieldsHandler(['activityID', 'Inven!RAstdID', 'json_params'], 'body')
]);

// Generate user URL with activityID and Inven!RAstdID
exports.generateUserUrl = (req, res) => {
  try {
    // Use Chain of Responsibility for validation
    const result = validationChain.handle(req);
    if (!result.success) {
      return ResponseFactory.error(res, result.error, result.statusCode);
    }

    const { activityID, 'Inven!RAstdID': invenRAstdID } = req.body;

    // Construct URL
    const domain = process.env.DOMAIN || req.get('host') || 'localhost:3000';
    const protocol = req.get('x-forwarded-proto') || (domain.includes('localhost') ? 'http' : 'https');
    
    const params = new URLSearchParams();
    params.append('activityID', activityID);
    params.append('Inven!RAstdID', invenRAstdID);

    return ResponseFactory.text(res, `${protocol}://${domain}/user?${params.toString()}`);
  } catch (error) {
    return ResponseFactory.serverError(res, error);
  }
};
