"use strict";

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  itemName: {
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
  startingBid: { type: Number, default: 0 },
  bids: [
    {
      bidder: { type: mongoose.Schema.ObjectId, ref: "User" },
      bid: Number,
      time: Date,
    },
  ],
});

ProductSchema.methods.toDump = function () {
  const dumpProduct = {
    id: this._id,
    itemName: this.itemName,
    description: this.description,
    created: this.created,
    updated: this.updated,
    bidStart: this.bidStart,
    bidEnd: this.bidEnd,
    seller: this.seller,
    startingBid: this.startingBid,
  };

  return dumpProduct;
};

module.exports = mongoose.model("Product", ProductSchema);
