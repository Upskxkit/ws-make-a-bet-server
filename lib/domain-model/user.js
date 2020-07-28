"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "username is required."],
  },
});

module.exports = mongoose.model("User", UserSchema);
