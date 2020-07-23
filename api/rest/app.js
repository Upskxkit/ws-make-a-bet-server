"use strict";
const Koa = require("koa");
// const { body, cors, error } = require("./middleware");
// const reportRouter = require("./router");
const app = new Koa();

/*app.use(cors({
  origin: "*",
  allowMethods: ["GET", "POST"]
}));*/
// app.use(error);
// app.use(body());
// app.use(reportRouter.routes());

module.exports = app;
