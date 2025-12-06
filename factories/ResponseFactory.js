/**
 * ResponseFactory - Factory Pattern for API Responses
 * 
 * This factory standardizes API response creation across all endpoints,
 * ensuring consistent response format and reducing code duplication.
 */
class ResponseFactory {
  /**
   * Create a success response
   * @param {Object} res - Express response object
   * @param {*} data - Data to send in response
   * @param {number} statusCode - HTTP status code (default: 200)
   */
  static success(res, data, statusCode = 200) {
    return res.status(statusCode).json(data);
  }

  /**
   * Create an error response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (default: 500)
   */
  static error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      error: message
    });
  }

  /**
   * Create a not found (404) response
   * @param {Object} res - Express response object
   * @param {string} resource - Name of the resource not found
   */
  static notFound(res, resource = 'Resource') {
    return this.error(res, `${resource} not found`, 404);
  }

  /**
   * Create a bad request (400) response
   * @param {Object} res - Express response object
   * @param {string} message - Error message describing the bad request
   */
  static badRequest(res, message) {
    return this.error(res, message, 400);
  }

  /**
   * Create a server error (500) response
   * @param {Object} res - Express response object
   * @param {Error|string} error - Error object or message
   */
  static serverError(res, error) {
    const message = error instanceof Error ? error.message : error;
    return this.error(res, message, 500);
  }

  /**
   * Create a plain text response (used for URL responses)
   * @param {Object} res - Express response object
   * @param {string} text - Text to send
   * @param {number} statusCode - HTTP status code (default: 200)
   */
  static text(res, text, statusCode = 200) {
    return res.status(statusCode).send(text);
  }
}

module.exports = ResponseFactory;

