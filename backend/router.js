/**
 * Define the routes for the application
 */
const router = (app) => {
  app.use("/api/debuggingduck", require("./api/debuggingDuck/debuggingDuckApi"));
  app.use("/api/users/:userId/goals", require("./api/goals/goalApi"));
  app.use("/api/users/:userId/quotes", require("./api/quotes/quoteApi"));
  app.use("/api/users", require("./api/users/userApi"));
};

module.exports = router;
