/**
 * ValidationHandler - Chain of Responsibility Pattern (Behavioral Pattern)
 * 
 * Decouples request sender from receiver by letting multiple handlers
 * process the request in sequence until one handles it or all pass.
 */
class ValidationHandler {
  constructor() {
    this.next = null;
  }

  setNext(handler) {
    this.next = handler;
    return handler;
  }

  handle(request) {
    return this.next ? this.next.handle(request) : { success: true };
  }

  static buildChain(handlers) {
    if (!handlers.length) return new ValidationHandler();
    for (let i = 0; i < handlers.length - 1; i++) {
      handlers[i].setNext(handlers[i + 1]);
    }
    return handlers[0];
  }
}

module.exports = ValidationHandler;
