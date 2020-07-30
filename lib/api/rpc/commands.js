"use strict";
const {
  AuthService,
  ProductService,
  SessionService,
} = require("../../services");

const usersSession = new SessionService();

const Channels = {
  User: "user",
  Products: "products",
};

const ProductRPC = {
  List: "product::list",
  Create: "product::create",
  Update: "product::update",
  Remove: "product::remove",
  Bet: "product::bet",
};

const UserRPC = {
  Login: "user::login",
  Register: "user::register",
  Logout: "user::logout",
};

const resFabric = (socket) => (channel) => (data) => {
  socket.emit(channel, data);
};

async function commandSwitcher(socket, socketManager) {
  socket.join("products");

  //Channel logic with RPC

  socket.on("disconnect", () => {
    usersSession.remove(socket);
  });
}

module.exports = commandSwitcher;
