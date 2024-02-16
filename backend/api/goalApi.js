const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeToken } = require("../authToken");

// prisma client to interact with the database
const prisma = new PrismaClient();


/**
 * Get goals of a user
 * TODO: Add Query Parameters to filter the goals
 * TODO: Add Query Parameters to filter what to include in the response
 */
router.get("/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Get all goals of the user
    const goals = await prisma.goal.findMany({
      where: {
        user_id: req.userId,
      },
      select: {
        goal_id: true,
        goal_name: true,
        goal_description: true,
        created_at: true,
        deployed_at: true,
      },
    });

    res.json(goals);
    console.log("Goals retrieved: ", goals);
  } catch (err) {
    res.status(400).json(err); // Error when getting the goals
  }
});


/**
 * Add a new goal
 */
router.post("/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // If the request does not have a name
  if (!req.body.goalName) {
    res.status(400).json({ error: "Missing Goal name" });
    return;
  }

  try {
    // Create a new goal
    const goal = await prisma.goal.create({
      data: {
        goal_name: req.body.goalName,
        goal_description: req.body.goalDescription,
        user: {
          connect: { user_id: req.userId },
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
 * TODO: update a goal
 */


/**
 * TODO: delete a goal
 */


/**
 * TODO: Add a Task to a goal
 */ 


/**
 * TODO: Update a Task
 */


/**
 * TODO: delete a task
 */ 


/**
 * TODO: Add a habit to a goal
 */ 


/**
 * TODO: Update a habit
 */ 


/**
 * TODO: delete a habit
 */ 


/**
 * TODO: Get a habit's commit history
 */


/**
 * TODO: Commit a habit
 */


/**
 * TODO: Delete a habit Commit
 */

module.exports = router;