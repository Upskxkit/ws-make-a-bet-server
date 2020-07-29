"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "username is required."],
  },
});

UserSchema.methods.toDump = function () {
  const dumpUser = {
    id: this._id,
    username: this.username
  };

  return dumpUser;
};

module.exports = mongoose.model("User", UserSchema);
