/**
 * Define the routes for the application
 */
const router = (app) => {
  app.use("/api/debuggingduck", require("./api/debuggingDuckApi"));
  app.use("/api/users/:userId/goals", require("./api/goalApi"));
  app.use("/api/users/:userId/quotes", require("./api/quoteApi"));
  app.use("/api/users", require("./api/userApi"));
};

module.exports = router;
