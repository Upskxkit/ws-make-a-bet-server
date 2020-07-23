"use strict";
const config = require("config");
const port = config.SERVER.PORT || 5000;
const RestAPI = require("./api/rest");
const JsonRPC = require("./api/rpc");

async function main() {
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
  await RestAPI.stop();
  await JsonRPC.stop();
}
