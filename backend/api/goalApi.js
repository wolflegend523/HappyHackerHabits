const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeToken } = require("../authToken");

// prisma client to interact with the database
const prisma = new PrismaClient();


/**
 * Get goals of a user
 * TODO: Add Query Parameters to filter the goals
 * TODO: Add Query Parameters to filter what to include in the response
 * TODO: think about how to best determine if a habit should be included 
 *       in the response regarding its schedule (monthly weekly daily, ect)
 */
router.get("/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // initial query parameter thoughts TODO: figure it out
  // const queryGoals = req.query.deployed; // DEPLOYED or UNDEPLOYED or ALL (if not provided, show all goals)
  // const queryHabits = req.query.habits; // NONE or COMMITTED or UNCOMMITTED or ALL (if not provided, show all habits)
  // const queryTasks = req.query.tasks; // NONE or COMMITTED or UNCOMMITTED or ALL (if not provided, show all tasks)
  // const queryDate = req.query.date; // YYYY-MM-DD (if not provided, show all days)


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

    // some initial thoughts on how to filter the goals TODO: figure it out
    // const goals2 = await prisma.goal.findMany({
    //   where: {
    //     user_id: req.userId,
    //     deployed_at: queryGoals === "DEPLOYED" ? { not: null } : queryGoals === "UNDEPLOYED" ? null : undefined,
    //   },
    //   select: {
    //     goal_id: true,
    //     goal_name: true,
    //     goal_description: true,
    //     created_at: true,
    //     deployed_at: true,
    //     habits: {
    //       where: {

    //       },
    //     },
    //     tasks: {
    //       where: {
    //         scheduled_at: queryDate ? { gte: new Date(queryDate), lt: new Date(queryDate + "T23:59:59") } : undefined,
    //         commited_at: (queryTasks === "COMMITTED" && queryDate) ? { gte: new Date(queryDate), lt: new Date(queryDate + "T23:59:59") } :  queryTasks === "COMMITTED" ? {not: null} : queryTasks === "UNCOMMITTED" ? null : undefined,
    //       },
    //     },
    //   },
    // });

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
 * update a goal
 */
router.put("/:goalId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Update the goal
    const goal = await prisma.goal.update({
      where: {
        goal_id: parseInt(req.params.goalId),
      },
      data: {
        goal_name: req.body.goalName || undefined,
        goal_description: req.body.goalDescription || undefined,
        deployed_at: req.body.deployedAt ? new Date(req.body.deployedAt) : undefined,
      },
    });

    // goal successfully updated
    res.sendStatus(204);
    console.log("Goal updated: ", goal);
  } catch (err) {
    // if the goal does not exist
    if (err.code === "P2025") {
      res.status(404).json({ error: "Goal not found" });
      return;
    }

    res.status(400).json(err); // Error when updating the goal
  }
});


/**
 * delete a goal
 */
router.delete("/:goalId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Delete the goal
    const goal = await prisma.goal.delete({
      where: {
        goal_id: parseInt(req.params.goalId),
      },
    });

    // goal successfully deleted
    res.sendStatus(204);
    console.log("Goal deleted: ", goal);
  } catch (err) {
    // if the goal does not exist
    if (err.code === "P2025") {
      res.status(404).json({ error: "Goal not found" });
      return;
    }

    res.status(400).json(err); // Error when deleting the goal
  }
});


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