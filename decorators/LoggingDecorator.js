/**
 * LoggingDecorator - Decorator Pattern (Structural Pattern)
 * 
 * The Decorator Pattern allows adding new functionality to an object
 * without altering its structure. This decorator wraps the database
 * and adds logging to all operations.
 * 
 * Benefits:
 * - Follows Open/Closed Principle (open for extension, closed for modification)
 * - Allows dynamic addition of behavior at runtime
 * - More flexible than static inheritance
 * - Database operations become observable for debugging/monitoring
 * 
 * Features:
 * - Detailed operation logging with timestamps
 * - Execution time tracking
 * - Operation counting
 * - Error logging
 */

class LoggingDecorator {
  /**
   * @param {Object} database - The database object to wrap
   */
  constructor(database) {
    this.database = database;
    this.operationCount = 0;
  }

  /**
   * Get formatted timestamp
   */
  _getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Log an operation with details
   */
  _log(method, params, result, duration) {
    this.operationCount++;
    const status = result !== null ? 'found' : 'not found';
    console.log(
      `[DB] [${this._getTimestamp()}] #${this.operationCount} | ${method}` +
      (params.length > 0 ? ` | params: ${JSON.stringify(params)}` : '') +
      ` | ${duration}ms | ${status}`
    );
  }

  /**
   * Log an error
   */
  _logError(method, params, error) {
    console.error(
      `[DB] [${this._getTimestamp()}] ERROR in ${method}` +
      ` | params: ${JSON.stringify(params)}` +
      ` | ${error.message}`
    );
  }

  /**
   * Wrap a database method with logging
   */
  _withLogging(method, executor, ...params) {
    const startTime = Date.now();
    try {
      const result = executor();
      this._log(method, params, result, Date.now() - startTime);
      return result;
    } catch (error) {
      this._logError(method, params, error);
      throw error;
    }
  }

  // Decorated database methods
  getActivityById(activityID) {
    return this._withLogging(
      'getActivityById',
      () => this.database.getActivityById(activityID),
      activityID
    );
  }

  getJsonParams(activityID) {
    return this._withLogging(
      'getJsonParams',
      () => this.database.getJsonParams(activityID),
      activityID
    );
  }

  getAnalytics(activityID) {
    return this._withLogging(
      'getAnalytics',
      () => this.database.getAnalytics(activityID),
      activityID
    );
  }

  getAnalyticsList() {
    return this._withLogging(
      'getAnalyticsList',
      () => this.database.getAnalyticsList()
    );
  }

  saveActivity(activityID, data) {
    return this._withLogging(
      'saveActivity',
      () => this.database.saveActivity(activityID, data),
      activityID
    );
  }

  // Get operation statistics
  getStats() {
    return { totalOperations: this.operationCount };
  }
}

module.exports = LoggingDecorator;

