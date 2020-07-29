"use strict";
const Product = require("../domain-model/product");

const create = async (data) => {
  const product = new Product(data);

  await product.save();

  return product.toDump();
};

const update = (data) => {};

const remove = (data) => {};

const list = async (data) => {
  const products = await Product.find({});

  return products.map((product) => product.toDump());
};

const bet = (req, res) => {};

module.exports = { create, update, remove, list };
