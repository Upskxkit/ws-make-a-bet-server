"use strict";

class ValidationError extends Error {
  constructor(status, message) {
    super();
    this.name = "ValidationError";
    this.message = message;
    this.status = status;
  }
}

module.exports = ValidationError;
