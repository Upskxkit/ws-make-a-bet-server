"use strict";

const mongoose = require("mongoose");
// const config = require("config");
// const beautifyUnique = require("mongoose-beautiful-unique-validation");
mongoose.Promise = Promise;

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
  // mongoose.plugin(beautifyUnique);
}

const connect = () =>
  new Promise((resolve, reject) => {
    console.log(process.env.DB_URL);
    mongoose
      .connect(process.env.DB_URL, {
        keepAlive: 1,
        poolSize: 5,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("DB connected");
        resolve(mongoose.connection);
      })
      .catch((err) => {
        reject(err);
      });
  });

const disconnect = () =>
  mongoose.disconnect(() => {
    console.log("DB disconnected");
  });

module.exports = { mongoose, connect, disconnect };
