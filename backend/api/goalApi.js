const jwt = require("jwt-simple");
const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');

// Secret for encoding and decoding JWTs
const secret = process.env.JWT_SECRET;
// prisma client to interact with the database
const prisma = new PrismaClient();


/**
 * Add a new goal
 */
router.post("/", async (req, res) => {
  // Check if the X-Auth header is set 
  if (!req.headers["x-auth"]) {
    res.status(401).json({error: "Missing X-Auth header"});
    return;
  }

  // If the request does not have a name
  if (!req.body.goalName) {
    res.status(400).json({ error: "Missing Goal name" });
    return;
  }

  // X-Auth should contain the token value
  const token = req.headers["x-auth"];

  try {
    // Decode the token to get the user id
    try {
      jwt.decode(token, secret);
    } catch (err) {
      res.status(401).json({error: "Invalid token"});
      return;
    }
    const decoded= jwt.decode(token, secret);


    // If the user id is "me", replace it with the actual user id
    if (req.userId && req.userId === "me") {
      req.userId = decoded.id;
    }
    
    // If the user id in the token does not match the user id in the request
    if (req.userId && (req.userId !== decoded.id)) {
      res.status(403).json({error: "Forbidden"});
      return;
    }

    // Create a new goal
    const goal = await prisma.goal.create({
      data: {
        goal_name: req.body.goalName,
        goal_description: req.body.goalDescription,
        user: {
          connect: { user_id: decoded.id },
        },
      },
    });

    res.status(201).json(goal); // Created
    console.log("Goal created: ", goal);
  } catch (err) {
    res.status(400).json(err); // Error when creating the goal
  }
});


/**
 * Get all goals of a user
 */
router.get("/", async (req, res) => {
  // Check if the X-Auth header is set 
  if (!req.headers["x-auth"]) {
    res.status(401).json({error: "Missing X-Auth header"});
    return;
  }

  // X-Auth should contain the token value
  const token = req.headers["x-auth"];

  try {
    // Decode the token to get the user id
    try {
      jwt.decode(token, secret);
    } catch (err) {
      res.status(401).json({error: "Invalid token"});
      return;
    }
    const decoded= jwt.decode(token, secret);

    // If the user id is "me", replace it with the actual user id
    if (req.userId && req.userId === "me") {
      req.userId = decoded.id;
    }
    
    // If the user id in the token does not match the user id in the request
    if (req.userId && (req.userId !== decoded.id)) {
      res.status(403).json({error: "Forbidden"});
      return;
    }

    // Get all goals of the user
    const goals = await prisma.goal.findMany({
      where: {
        user_id: decoded.id,
      },
    });

    res.json(goals);
    console.log("Goals retrieved: ", goals);
  } catch (err) {
    res.status(400).json(err); // Error when getting the goals
  }
});


/**
 * Add a Task to a goal
 */ 


/**
 * Add a habit to a goal
 */ 

module.exports = router;