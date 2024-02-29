// TODO: after doing lots of testing, change error messages to not 
// have the actual prisma error messages, but instead a generic error message

const express = require("express");
const cors = require("cors");
const router = require("./router");

const app = express();

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

// CORS to allow requests from any origin
// TODO: change this to only allow requests from the frontend?
app.use(cors());

// Add the userID from the URL to the request object
// so that the API endpoints can use it
//TODO: move this to middleware (either in the middleware folder or individual API files)
//      this doesn't really belong here, but I haven't gotten it to work elsewhere
app.use('/api/users/:userId', (req, res, next) => {
  req.userId = req.params.userId;
  // If the user id is a number, convert it to a number
  if (parseInt(req.userId)) {
    req.userId = parseInt(req.userId);
  }
  next();
});

// use the router to define the applications routes/endpoints
router(app);

// Start up the server 
// TODO: which port should it listen on?
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;