"use strict";

const Io = require("socket.io");

class TransportWS {
  constructor(server, opts) {
    if (!server) {
      throw new Error("Need define base http server for ws.");
    }

    this.ws = new Io(server, opts);
    this.clientsWS = new Set();
  }

  init(api) {
    this.ws.on("connection", (connection) => {
      // this.clientsWS.add(connection);

      connection.on("login", async (event, callback) => {
        callback({ error: false });
      });

      connection.on("logout", async () => {});

      connection.on("message", async (event) => {
        const { method, args } = JSON.parse(event);
      });
    });
  }

  stop() {
    this.ws.close();
  }
}

module.exports = TransportWS;
