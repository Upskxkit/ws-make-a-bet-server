"use strict";

const commandsSwitcher = require("./commands");
const TransportWS = require("./transportWS");
let transport;


const start = (server) => {
  transport = new TransportWS(server);
  transport.init(commandsSwitcher);
  return transport.ws;
};

const stop = async () => {
  transport.stop(); //define reason for shutdown
};

module.exports = { start, stop };
