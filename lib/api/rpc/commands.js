"use strict";
const {
  AuthService,
  ProductService,
  SessionService,
} = require("../../services");

const usersSession = new SessionService();

const METHODS = {
  UserRegister: "user::register",
  UserLogin: "user::login",
  UserLogout: "user::logout",
  ProductList: "product::list",
  ProductCreate: "product::create",
  ProductUpdate: "product::update",
  BetCreate: "bet::create",
};

const resFabric = (socket) => (method, data) => {
  socket.emit(method, data);
};

function commandSwitcher(socket) {
  const socketRes = resFabric(socket);

  socket.on(METHODS.UserRegister, async (data) => {
    try {
      const user = await AuthService.register(data);
      socketRes(METHODS.UserRegister, { data: user });
    } catch (err) {
      socketRes(METHODS.UserRegister, { error: err.message });
    }
  });

  socket.on(METHODS.UserLogin, async (data) => {
    try {
      const user = await AuthService.login(data);
      usersSession.set(socket, user);
      socketRes(METHODS.UserLogin, user);
    } catch (err) {
      socketRes(METHODS.UserLogin, { error: err.message });
    }
  });

  socket.on(METHODS.UserLogout, async () => {
    usersSession.remove(socket);
    socketRes(METHODS.UserRegister, { success: true });
  });

  socket.on(METHODS.ProductList, async (event) => {
    try {
      const list = await ProductService.list();
      socketRes(list);
    } catch (err) {
      socketRes(METHODS.ProductList, { error: err.message });
    }
  });

  socket.on(METHODS.ProductCreate, async (data) => {
    try {
      const product = await ProductService.create(data);
      socketRes(METHODS.ProductCreate, product);
    } catch (err) {
      socketRes(METHODS.ProductCreate, { error: err.message });
    }
  });

  socket.on("product::update", async (event, callback) => {
    await ProductService.update();
  });

  socket.on("product::bet", async (event, callback) => {
    const { project_id, amount } = event;
  });
}

module.exports = commandSwitcher;
