"use strict";

const User = require("../domain-model/user");
const { ValidationError } = require("../errors");

async function login(data) {
  const { username } = data;

  if (!username) {
    throw new ValidationError("Define username.");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ValidationError("No such user.");
  }

  return user;
}

async function register(data) {
  const { username } = data;

  if (!username) {
    throw new ValidationError("Define username.");
  }

  let isExists = await User.findOne({ username });

  console.log(isExists);

  if (isExists) {
    throw new ValidationError("Choose other username.");
  }

  const user = new User(data);
  await user.save();
  return `${user.username} successfully register`;
}

async function getById(id) {
  return User.findById(id);
}

module.exports = { register, login, getById };
