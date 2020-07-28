"use strict";
const Product = require("../domain-model/product");

const create = async (data) => {
  const product = new Product(data);

  await product.save();

  return product.toDump();
};

const update = (req, res) => {};

const remove = (req, res) => {};

const list = (req, res) => {};

const bet = (req, res) => {};

module.exports = { create, update, remove, list };
