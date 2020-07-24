"use strict";

const app = require("./app");
const http = require("http");
let server;

const start = (port) => {
  server = http.createServer(app.callback());
  server.listen(port);
  return server;
};

const stop = async () => {
  if (!server) return;

  server.close();
};

module.exports = { start, stop };
