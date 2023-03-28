const {
  userRoutes,
  productRoutes,
  CartRoutes,
  orderRoutes,
  // projectRoutes,
  // renderxRoutes,
  // consumerRoutes,
} = require("../service/routesIndex");
const path = require("path");
const getBasePath = require("../../getBasePath");

module.exports = async (app) => {
  app.use("/api/user", userRoutes);
   app.use("/api/product", productRoutes);
  app.use("/api/cart", CartRoutes);
   app.use("/api/order", orderRoutes);
  app.get("*", (req, res) => {
    res.sendFile(path.join(getBasePath, "static/index.html"));
  });
};
