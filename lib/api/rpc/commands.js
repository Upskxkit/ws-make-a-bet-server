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

async function commandSwitcher(socket) {
  socket.join("products");
  const socketUserResponse = resFabric(socket)(Channels.User);
  const socketProductsResponse = resFabric(socket)(Channels.Products);

  const user_id = (socket.handshake.query || {}).token;

  //Reassign user session by token(user_id);
  if (user_id) {
    const user = await AuthService.getById(user_id);

    if (!user) {
      socketUserResponse({
        method: UserRPC.Logout,
        args: { error: "No such user." },
      });
    } else {
      usersSession.set(socket, user);
    }
  }

  socket.on(Channels.User, async (data) => {
    const { method, args } = data;

    switch (method) {
      case UserRPC.Login: {
        try {
          const user = await AuthService.login(args);
          usersSession.set(socket, user);
          socketUserResponse({ method, args: user.toDump() });
        } catch (err) {
          socketUserResponse({ method, args: { error: err.message } });
        }

        return;
      }

      case UserRPC.Register: {
        try {
          const user = await AuthService.register(args);
          socketUserResponse({ method, args: { user } });
        } catch (err) {
          socketUserResponse({ method, args: { error: err.message } });
        }
        return;
      }

      case UserRPC.Logout: {
        usersSession.remove(socket);
        socketUserResponse({ method, args: { success: true } });
      }
    }
  });

  socket.on(Channels.Products, async (data) => {
    const { method, args } = data;

    switch (method) {
      case ProductRPC.List: {
        try {
          const list = await ProductService.list();
          socketProductsResponse({ method, args: list });
        } catch (err) {
          socketProductsResponse({ method, args: { error: err.message } });
        }
        return;
      }

      case ProductRPC.Create: {
        try {
          const user = usersSession.get(socket);

          if (!user) {
            socketProductsResponse({
              method,
              args: { error: "To create Product - login as user" },
            });
            return;
          }

          const product = await ProductService.create({
            ...args,
            seller: user._id,
          });

          socketProductsResponse({ method, args: product });

          socket
            .to("products")
            .emit(Channels.Products, { method, args: product });
        } catch (err) {
          socketProductsResponse({ method, args: { error: err.message } });
        }
        return;
      }

      case ProductRPC.Bet: {
        try {
          const user = usersSession.get(socket);

          if (!user) {
            socketProductsResponse({
              method,
              args: { error: "To create Product - login as user" },
            });
            return;
          }

          const { product, bid } = await ProductService.makeBet({
            ...args,
            user,
          });

          socketProductsResponse({ method, args: { bid } });
          socket
            .to("products")
            .emit(Channels.Products, {
              method: ProductRPC.Update,
              args: product,
            });
        } catch (err) {
          socketProductsResponse({ method, args: { error: err.message } });
        }
      }
    }
  });

  socket.on("disconnect", () => {
    usersSession.remove(socket);
  });
}

module.exports = commandSwitcher;
