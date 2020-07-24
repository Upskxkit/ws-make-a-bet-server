"use strict";

class PermissionError extends Error {
  constructor(message) {
    super();
    this.name = "PermissionError";
    this.message = message;
    this.status = 403;
  }
}

module.exports = PermissionError;
