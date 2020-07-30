"use strict";
const Product = require("../domain-model/product");
const { ValidationError } = require("../errors");
const Lock = require("../Lock");

// const productLock = new Lock();

const create = async (data) => {
  // const { seller, currentBid } = data;

  //LOGIC
};

const update = async (data) => {};

const remove = (data) => {};

const list = async (data) => {
  //LOGIC
};

const makeBet = async ({ amount, user, product_id }) => {
  //LOGIC (LOCKER)
};

module.exports = { create, update, remove, list, makeBet };
