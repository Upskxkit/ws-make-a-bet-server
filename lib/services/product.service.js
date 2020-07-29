"use strict";
const Product = require("../domain-model/product");
const { ValidationError } = require("../errors");
const Lock = require("../Lock");

const productLock = new Lock();

const create = async (data) => {
  const { seller, currentBid } = data;

  const bid = { bid: currentBid, bidder: seller };
  const product = new Product(data);
  product.bids.push(bid);

  await product.save();

  return product.toDump();
};

const update = async (data) => {
  await productLock.enter();
  productLock.leave();
};

const remove = (data) => {};

const list = async (data) => {
  const products = await Product.find({});

  return products.map((product) => product.toDump());
};

const makeBet = async ({ amount, user, product_id }) => {
  await productLock.enter();
  try {
    const product = await Product.findById(product_id);

    if (!product) {
      throw new ValidationError("No such Product");
    }
    const maxBid = product.currentBid();

    if (maxBid > amount) {
      throw new ValidationError(
        `Current bid is ${maxBid} and your bid ${amount}`
      );
    }

    const bid = { bidder: user._id, bid: amount };

    product.updated = new Date();
    product.bids.push(bid);

    await product.save();

    productLock.leave();

    return { product: product.toDump(), bid };
  } catch (err) {
    productLock.leave();
    throw err;
  }
};

module.exports = { create, update, remove, list, makeBet };
