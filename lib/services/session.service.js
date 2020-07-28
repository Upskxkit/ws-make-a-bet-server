"use strict";

class Session {
  constructor() {
    this.sessions = new WeakMap();
  }

  get(key) {
    return this.sessions.get(key);
  }
  set(key, user) {
    if (this.has(key)) {
      return this.sessions(key);
    }

    this.sessions.set(key, user);

    return user;
  }
  has(key) {
    return this.sessions.has(key);
  }
  remove(key) {
    return this.sessions.delete(key);
  }
}

module.exports = Session;
