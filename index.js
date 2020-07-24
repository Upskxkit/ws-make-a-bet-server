"use strict";
const config = require("config");
const {start,stop} = require("./config/db.js");
const port = config.server.port || 5000;
const RestAPI = require("./lib/api/rest");
const JsonRPC = require("./lib/api/rpc");

async function main() {
  await start();
  const server = RestAPI.start(port);
  await JsonRPC.start(server);
}

process.on("SIGTERM", async () => {
  await shutdown();
});

// Subscribe to system signals
process.on("SIGTERM", async () => {
  await shutdown();
});

process.on("unhandledRejection", (error) => {
  console.error(error);
});

process.on("uncaughtException", (error) => {
  console.error(error);
});

main().catch((err) => {
  console.log(err);
  process.exit(0);
});

//Graceful shutdown
async function shutdown() {
  await stop();
  await RestAPI.stop();
  await JsonRPC.stop();
}
