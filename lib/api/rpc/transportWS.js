"use strict";

const Io = require("socket.io");

class TransportWS {
  constructor(server, opts) {
    if (!server) {
      throw new Error("Need define base http server for ws.");
    }

    this.ws = new Io(server, opts);
  }

  init(api) {
    this.ws.on("connection", (connection) => {
      api(connection, this.ws);
    });
  }

  stop() {
    this.ws.close();
  }
}

module.exports = TransportWS;
