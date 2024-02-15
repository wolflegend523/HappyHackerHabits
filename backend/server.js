const express = require("express");
const cors = require("cors");

const app = express();

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

// CORS to allow requests from any origin
app.use(cors());

// Add the userID from the URL to the request object
// so that the API endpoints can use it
app.use('/users/:userId', (req, res, next) => {
  req.userId = req.params.userId
  router(req, res, next)
})

// Create API endpoints
app.use("/api/users", require("./api/userApi"));
app.use("/api/users/:userId/goals", require("./api/goalApi"));
//app.use("/api/quotes", require("./api/quoteApi"));
app.use("/api/debuggingduck", require("./api/debuggingDuckApi"));

// Start up the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

// Export the app
module.exports = app;