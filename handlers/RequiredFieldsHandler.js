/**
 * RequiredFieldsHandler - Validates required fields are present
 */
const ValidationHandler = require('./ValidationHandler');

class RequiredFieldsHandler extends ValidationHandler {
  constructor(requiredFields, source = 'body') {
    super();
    this.requiredFields = requiredFields;
    this.source = source;
  }

  handle(request) {
    const data = request[this.source] || {};
    const missing = this.requiredFields.filter(f => !data[f] && data[f] !== 0);

    if (missing.length) {
      return { success: false, error: `Missing required field(s): ${missing.join(', ')}`, statusCode: 400 };
    }
    return super.handle(request);
  }
}

module.exports = RequiredFieldsHandler;
