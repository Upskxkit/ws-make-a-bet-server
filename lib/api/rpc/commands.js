"use strict";

const ProductService = require("../../services/product.service");

function commandSwitcher(socket) {
  socket.on("register", async (event, callback) => {
    console.log(event);
    callback(event);
  });

  socket.on("login", async (event, callback) => {
    console.log(callback);
    callback({ error: false });
  });

  socket.on("logout", async () => {});

  socket.on("product::create", async (event, callback) => {
    const product = await ProductService.create();
  });

  socket.on("product::update", async (event, callback) => {
    await ProductService.update();
  });

  socket.on("product::list", async (event, callback) => {
    const list = await ProductService.list();

    callback(list);
  });

  socket.on("product::bet", async (event, callback) => {
    const { project_id, amount } = event;


  });
}

module.exports = commandSwitcher;
