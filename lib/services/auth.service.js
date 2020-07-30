"use strict";

const User = require("../domain-model/user");
const { ValidationError } = require("../errors");

async function login(data) {
  //Login logic
}

async function register(data) {
  //Register logic
}

async function getById(id) {
  return User.findById(id);
}

module.exports = { register, login, getById };
