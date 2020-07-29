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

const ProductsRoomEvents = {
  Create: "create",
  Update: "update",
};

const resFabric = (socket) => (method, data) => {
  socket.emit(method, data);
};

async function commandSwitcher(socket) {
  const socketRes = resFabric(socket);
  socket.join("products");
  const user_id = (socket.handshake.query || {}).token;

  //Reassign user session by token(user_id);
  if (user_id) {
    const user = await AuthService.getById(user_id);

    if (!user) {
      socketRes(METHODS.UserLogout, { error: "No such user." });
    } else {
      usersSession.set(socket, user);
    }
  }

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

  socket.on(METHODS.ProductList, async () => {
    try {
      const list = await ProductService.list();
      socketRes(METHODS.ProductList, list);
    } catch (err) {
      socketRes(METHODS.ProductList, { error: err.message });
    }
  });

  socket.on(METHODS.ProductCreate, async (data) => {
    try {
      const seller = usersSession.get(socket);

      if (!seller) {
        socketRes(METHODS.ProductCreate, {
          error: "To create Product - login as user",
        });
        return;
      }

      const product = await ProductService.create({ ...data, seller });

      socketRes(METHODS.ProductCreate, product);
      socket.to("products").emit();
    } catch (err) {
      socketRes(METHODS.ProductCreate, { error: err.message });
    }
  });

  socket.on("product::update", async (event, callback) => {
    await ProductService.update();
  });

  socket.on(METHODS.BetCreate, async (event, callback) => {
    const { project_id, amount } = event;
  });

  socket.on("disconnect", () => {
    usersSession.remove(socket);
  });
}

module.exports = commandSwitcher;
