/**
 * ResourceExistsHandler - Validates a resource exists in the database
 */
const ValidationHandler = require('./ValidationHandler');

class ResourceExistsHandler extends ValidationHandler {
  constructor(fieldName, lookupFn, resourceName = 'Resource', source = 'body') {
    super();
    this.fieldName = fieldName;
    this.lookupFn = lookupFn;
    this.resourceName = resourceName;
    this.source = source;
  }

  handle(request) {
    const id = (request[this.source] || {})[this.fieldName];
    if (!id) return super.handle(request);

    const resource = this.lookupFn(id);
    if (!resource) {
      return { success: false, error: `${this.resourceName} not found`, statusCode: 404 };
    }

    request.validatedResource = resource;
    return super.handle(request);
  }
}

module.exports = ResourceExistsHandler;
