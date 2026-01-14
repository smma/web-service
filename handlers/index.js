/**
 * Chain of Responsibility Pattern - Validation Handlers
 * 
 * Pattern Structure:
 *   Request → [Handler1] → [Handler2] → Success
 *                 ↓            ↓
 *             (error)      (error)
 * 
 * Handlers:
 * - ValidationHandler: Base class
 * - RequiredFieldsHandler: Validates required fields exist
 * - ResourceExistsHandler: Validates resource exists in database
 */

const ValidationHandler = require('./ValidationHandler');
const RequiredFieldsHandler = require('./RequiredFieldsHandler');
const ResourceExistsHandler = require('./ResourceExistsHandler');

module.exports = {
  ValidationHandler,
  RequiredFieldsHandler,
  ResourceExistsHandler
};
