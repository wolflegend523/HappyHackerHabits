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
  // const GoalStatus = req.query.status; // DEPLOYED or UNDEPLOYED or ALL (if not provided, show all goals)
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
    //         committed_at: (queryTasks === "COMMITTED" && queryDate) ? { gte: new Date(queryDate), lt: new Date(queryDate + "T23:59:59") } :  queryTasks === "COMMITTED" ? {not: null} : queryTasks === "UNCOMMITTED" ? null : undefined,
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
 * TODO: Get a goal and all of its tasks and habits
 */
// TODO: Add Query Parameters to filter what to include in the response
router.get("/:goalId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Get the goal
    const goal = await prisma.goal.findUnique({
      where: {
        goal_id: parseInt(req.params.goalId),
      },
      select: {
        goal_id: true,
        goal_name: true,
        goal_description: true,
        created_at: true,
        deployed_at: true,
        habits: {
          select: {
            habit_id: true,
            habit_name: true,
            habit_description: true,
            created_at: true,
            start_at: true,
            ends_at: true,
            frequency: true,
            days_of_week: true,
            deployed_at: true,
            commits: {
              select: {
                habit_commit_id: true,
                committed_at: true,
              }
            }
          },
        },
        tasks: {
          select: {
            task_id: true,
            task_name: true,
            task_description: true,
            created_at: true,
            scheduled_at: true,
            ends_at: true,
            committed_at: true,
          },
        },
      },
    });

    // if the goal does not exist
    if (!goal) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }

    res.json(goal);
    console.log("Goal retrieved: ", goal);
  } catch (err) {
    res.status(400).json(err); // Error when getting the goal
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
 * Add a habit to a goal
 */ 
// TODO: Figure out how to properly handle the start and end times for the habits
//       Do we need to deal with timezones?
router.post("/:goalId/habits/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // If the request does not have a name
  if (!req.body.habitName) {
    res.status(400).json({ error: "Missing Habit name" });
    return;
  }

  try {
    // Create a new habit
    const habit = await prisma.habit.create({
      data: {
        habit_name: req.body.habitName,
        habit_description: req.body.habitDescription,
        start_at: req.body.startAt ? new Date(req.body.startAt) : undefined,
        ends_at: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
        frequency: req.body.frequency || undefined,
        days_of_week: req.body.daysOfWeek,
        goal: {
          connect: { goal_id: parseInt(req.params.goalId) },
        },
      },
    });

    res.status(201).json(habit); // Created
    console.log("Habit created: ", habit);
  } catch (err) {
    res.status(400).json(err); // Error when creating the habit
  }
});


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