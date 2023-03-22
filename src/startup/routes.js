const {
  userRoutes,
  // projectRoutes,
  // renderxRoutes,
  // consumerRoutes,
} = require("../service/routesIndex");
const path = require("path");
const getBasePath = require("../../getBasePath");

module.exports = async (app) => {
  app.use("/api/user", userRoutes);
  // app.use("/api/project", projectRoutes);
  // app.use("/api/renderx", renderxRoutes);
  // app.use("/api/consumers", consumerRoutes);
  app.get("*", (req, res) => {
    res.sendFile(path.join(getBasePath, "static/index.html"));
  });
};
