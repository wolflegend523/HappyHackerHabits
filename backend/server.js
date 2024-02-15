const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

// CORS to allow requests from any origin
app.use(cors());

// Create API endpoints
app.use("/api/users", require("./api/userApi"));
app.use("/api/users/:id/goals", require("./api/goalApi"));
app.use("/api/quotes", require("./api/quoteApi"));
app.use("/api/debuggingduck", require("./api/debuggingDuckApi"));

// Start up the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

// Export the app
module.exports = app;