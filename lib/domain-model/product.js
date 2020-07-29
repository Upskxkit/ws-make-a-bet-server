"use strict";

const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  bidder: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  bid: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Item name is required",
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  bidStart: {
    type: Date,
    default: Date.now,
  },
  bidEnd: {
    type: Date,
    required: "Auction end time is required",
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  currentBid: { type: Number, required: true },
  bids: [BidSchema],
});

ProductSchema.methods.maxBid = function () {
  return Math.max(...this.bids.map((item) => item.bid));
};

ProductSchema.methods.toDump = function (withBids = false) {
  const dumpProduct = {
    id: this._id,
    title: this.title,
    description: this.description,
    created: this.created,
    updated: this.updated,
    bidStart: this.bidStart,
    bidEnd: this.bidEnd,
    seller: this.seller,
    currentBid: this.currentBid,
    bids: this.bids,
  };

  return dumpProduct;
};

module.exports = mongoose.model("Product", ProductSchema);
