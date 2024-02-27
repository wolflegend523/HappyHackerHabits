// TODO: Do we want to move the habit and task endpoints to their own files?
//       would then need to change some of the request params to be a part of the request

// TODO: trim any strings before setting them so that we don't have any extra whitespace in the database 
//       this probably is something we should do in the frontend mainly, but we should maybe do it for names
//       and descriptions in the backend as well

// TODO: change POST/PUT checking to check for undefined instead of just falsy or null 
//       so that we can POST/PUT empty strings or a null value in the database

// TODO: make sure that we are being consistent with what gets returned in the response

const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeToken } = require("../../middleware/authentication");

// prisma client to interact with the database
const prisma = new PrismaClient();


/**
 * Get goals of a user
 * TODO: Add Query Parameters to filter the goals
 */
router.get("/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // get Query Parameters
  const queryStatus = req.query.status;

  try {
    // Get all goals of the user
    const goals = await prisma.goal.findMany({
      where: {
        userId: req.userId,
        deployedAt: queryStatus === "deployed" ? { not: null } : queryStatus === "notDeployed" ? null : undefined,
      },
      select: {
        goalId: true,
        goalName: true,
        goalDescription: true,
        createdAt: true,
        deployedAt: true,
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
        goalName: req.body.goalName,
        goalDescription: req.body.goalDescription,
        user: {
          connect: { userId: req.userId },
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
 * Get a goal and all of its tasks and habits
 */
// TODO: Add Query Parameters to filter what to include in the response
router.get("/:goalId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // get Query Parameters
  const queryStatus = req.query.status;
  
  try {
    // Get the goal
    const goal = await prisma.goal.findUnique({
      where: {
        goalId: parseInt(req.params.goalId),
        deployedAt: queryStatus === "deployed" ? { not: null } : queryStatus === "notDeployed" ? null : undefined,
      },
      select: {
        goalId: true,
        goalName: true,
        goalDescription: true,
        createdAt: true,
        deployedAt: true,
        habits: {
          where: {
            deployedAt: queryStatus === "deployed" ? { not: null } : queryStatus === "notDeployed" ? null : undefined,
          },
          select: {
            habitId: true,
            habitName: true,
            habitDescription: true,
            createdAt: true,
            startAt: true,
            endsAt: true,
            frequency: true,
            daysOfWeek: true,
            deployedAt: true,
            commits: {
              select: {
                habitCommitId: true,
                committedAt: true,
              }
            }
          },
        },
        tasks: {
          where: {
            committedAt: queryStatus === "deployed" ? { not: null } : queryStatus === "notDeployed" ? null : undefined,
          },
          select: {
            taskId: true,
            taskName: true,
            taskDescription: true,
            createdAt: true,
            scheduledAt: true,
            endsAt: true,
            committedAt: true,
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
        goalId: parseInt(req.params.goalId),
      },
      data: {
        goalName: req.body.goalName || undefined,
        goalDescription: req.body.goalDescription || undefined,
        deployedAt: req.body.deployedAt ? new Date(req.body.deployedAt) : undefined,
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
    // Delete the goal's tasks'
    const tasks = prisma.task.deleteMany({
      where: {
        goalId: parseInt(req.params.goalId),
      },
    });

    // Delete the goal's habits and their commits
    const habitCommits = prisma.habitCommit.deleteMany({
      where: {
        habit: {
          goalId: parseInt(req.params.goalId),
        },
      },
    });

    const habits = prisma.habit.deleteMany({
      where: {
        goalId: parseInt(req.params.goalId),
      },
    });


    // Delete the goal
    const goal = prisma.goal.delete({
      where: {
        goalId: parseInt(req.params.goalId),
      },
    });

    const deleteGoal = await prisma.$transaction([tasks, habitCommits, habits, goal]);

    // goal successfully deleted
    res.sendStatus(204);
    console.log("Goal deleted: ", deleteGoal);
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
 * get a task
 */
router.get("/:goalId/tasks/:taskId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }
  
  try {
    // Get the task
    const task = await prisma.task.findUnique({
      where: {
        taskId: parseInt(req.params.taskId),
        goalId: parseInt(req.params.goalId),
      },
    });

    // if the task does not exist
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(task);
    console.log("Task retrieved: ", task);
  } catch (err) {
    res.status(400).json(err); // Error when getting the task
  }
});


/**
 * Add a Task to a goal
 */ 
router.post("/:goalId/tasks/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // If the request does not have a name
  if (!req.body.taskName) {
    res.status(400).json({ error: "Missing Task name" });
    return;
  }

  try {
    // Create a new task
    const task = await prisma.task.create({
      data: {
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        scheduledAt: req.body.scheduledAt ? new Date(req.body.scheduledAt) : undefined,
        endsAt: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
        goal: {
          connect: { goalId: parseInt(req.params.goalId) },
        },
      },
    });

    res.status(201).json(task); // Created
    console.log("Task created: ", task);
  } catch (err) {
    if (err.code === "P2025") {
      res.status(404).json({ error: "Goal not found" });
      return;
    }
    res.status(400).json(err); // Error when creating the task
  }
});


/**
 * Update a Task
 */
router.put("/:goalId/tasks/:taskId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Update the task
    const task = await prisma.task.update({
      where: {
        taskId: parseInt(req.params.taskId),
        goalId: parseInt(req.params.goalId),
      },
      data: {
        taskName: req.body.taskName || undefined,
        taskDescription: req.body.taskDescription || undefined,
        scheduledAt: req.body.scheduledAt ? new Date(req.body.scheduledAt) : undefined,
        endsAt: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
        committedAt: req.body.committedAt ? new Date(req.body.committedAt) : undefined,
      },
    });

    // task successfully updated
    res.sendStatus(204);
    console.log("Task updated: ", task);
  } catch (err) {
    // if the task does not exist
    if (err.code === "P2025") {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(400).json(err); // Error when updating the task
  }
});


/**
 * delete a task
 */ 
router.delete("/:goalId/tasks/:taskId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Delete the task
    const task = await prisma.task.delete({
      where: {
        taskId: parseInt(req.params.taskId),
        goalId: parseInt(req.params.goalId),
      },
    });

    // task successfully deleted
    res.sendStatus(204);
    console.log("Task deleted: ", task);
  } catch (err) {
    // if the task does not exist
    if (err.code === "P2025") {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(400).json(err); // Error when deleting the task
  }
});


/**
 * get a habit
 */
// TODO: Do we want a query param to not include the commits of the habit?
router.get("/:goalId/habits/:habitId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }
  
  try {
    // Get the habit
    const habit = await prisma.habit.findUnique({
      where: {
        habitId: parseInt(req.params.habitId),
        goalId: parseInt(req.params.goalId),
      },
      include: {
        commits: {
          select: {
            habitCommitId: true,
            committedAt: true,
          }
        },
      },
    });

    // if the habit does not exist
    if (!habit) {
      res.status(404).json({ error: "Habit not found" });
      return;
    }

    res.json(habit);
    console.log("Habit retrieved: ", habit);
  } catch (err) {
    res.status(400).json(err); // Error when getting the habit
  }
});


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
        habitName: req.body.habitName,
        habitDescription: req.body.habitDescription,
        startAt: req.body.startAt ? new Date(req.body.startAt) : undefined,
        endsAt: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
        frequency: req.body.frequency || undefined,
        daysOfWeek: req.body.daysOfWeek,
        goal: {
          connect: { goalId: parseInt(req.params.goalId) },
        },
      },
    });

    res.status(201).json(habit); // Created
    console.log("Habit created: ", habit);
  } catch (err) {
    if (err.code === "P2025") {
      res.status(404).json({ error: "Goal not found" });
      return;
    }
    res.status(400).json(err); // Error when creating the habit
  }
});


/**
 * Update a habit
 */ 
// TODO: Figure out how to properly handle the start and end times for the habits
//       Do we need to deal with timezones?
router.put("/:goalId/habits/:habitId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Update the habit
    const habit = await prisma.habit.update({
      where: {
        habitId: parseInt(req.params.habitId),
        goalId: parseInt(req.params.goalId),
      },
      data: {
        habitName: req.body.habitName || undefined,
        habitDescription: req.body.habitDescription || undefined,
        startAt: req.body.startAt ? new Date(req.body.startAt) : undefined,
        endsAt: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
        frequency: req.body.frequency || undefined,
        daysOfWeek: req.body.daysOfWeek || undefined,
        deployedAt: req.body.deployedAt ? new Date(req.body.deployedAt) : undefined,
      },
    });

    // habit successfully updated
    res.sendStatus(204);
    console.log("Habit updated: ", habit);
  } catch (err) {
    // if the habit does not exist
    if (err.code === "P2025") {
      res.status(404).json({ error: "Habit not found" });
      return;
    }

    res.status(400).json(err); // Error when updating the habit
  }
});


/**
 * delete a habit
 */ 
router.delete("/:goalId/habits/:habitId/", async (req, res) => {  
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Delete the habit and its commits
    const commits = prisma.habitCommit.deleteMany({
      where: {
        habit: {
          habitId: parseInt(req.params.habitId),
          goalId: parseInt(req.params.goalId),
        },
      },
    });

    const habit = prisma.habit.delete({
      where: {
        habitId: parseInt(req.params.habitId),
        goalId: parseInt(req.params.goalId),
      },
    });

    const deleteHabit = await prisma.$transaction([commits, habit]);

    // habit successfully deleted
    res.sendStatus(204);
    console.log("Habit deleted: ", deleteHabit);
  } catch (err) {
    // if the habit does not exist
    if (err.code === "P2025") {
      res.status(404).json({ error: "Habit not found" });
      return;
    }

    res.status(400).json(err); // Error when deleting the habit
  }
});


/**
 * check that a given habit exists for a given goal
 */
async function habitExists(habitId, goalId) {
  // Check if the habit exists
  try {
    const habit = await prisma.habit.findUnique({
      where: {
        habitId: parseInt(habitId),
        goalId: parseInt(goalId),
      },
    });

    return habit !== null;
  } catch (err) {
    return false;
  }
}


/**
 * Get a habit's commit history
 */
router.get("/:goalId/habits/:habitId/commits/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // Check if the habit exists
  habitExistsResults = await habitExists(req.params.habitId, req.params.goalId);
  if (!habitExistsResults) {
    res.status(404).json({ error: "Habit not found" });
    return;
  }

  try {
    // Get the habit's commit history
    const commits = await prisma.habitCommit.findMany({
      where: {
        habitId: parseInt(req.params.habitId),
        habit: {
          goalId: parseInt(req.params.goalId),
        },
      },
      select: {
        habitCommitId: true,
        committedAt: true,
      },
    });

    res.json(commits);
    console.log("Commits retrieved: ", commits);
  } catch (err) {
    res.status(400).json(err); // Error when getting the commits
  }
});


/**
 * Commit a habit
 */
router.post("/:goalId/habits/:habitId/commits/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // Check if the habit exists
  habitExistsResults = await habitExists(req.params.habitId, req.params.goalId);
  if (!habitExistsResults) {
    res.status(404).json({ error: "Habit not found" });
    return;
  }

  try {
    // Commit the habit
    // TODO: do we want a user to be able to commit to a habit multiple times in a day?
    // I think so, but if not we need to check before creating the commit
    const commit = await prisma.habitCommit.create({
      data: {
        habit: {
          connect: { habitId: parseInt(req.params.habitId) },
        },
      },
    });

    res.status(201).json(commit); // Created
    console.log("Commit created: ", commit);
  } catch (err) {
    if (err.code === "P2025") {
      res.status(404).json({ error: "Habit not found" });
      return;
    }
    res.status(400).json(err); // Error when creating the commit
  }
});


/**
 * Delete a habit Commit
 */
router.delete("/:goalId/habits/:habitId/commits/:commitId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Delete the commit
    const commit = await prisma.habitCommit.delete({
      where: {
        habitCommitId: parseInt(req.params.commitId),
        habitId: parseInt(req.params.habitId),
        habit: {
          goalId: parseInt(req.params.goalId),
        },
      },
    });

    // commit successfully deleted
    res.sendStatus(204);
    console.log("Commit deleted: ", commit);
  } catch (err) {
    // if the commit does not exist
    if (err.code === "P2025") {
      res.status(404).json({ error: "Commit not found" });
      return;
    }

    res.status(400).json(err); // Error when deleting the commit
  }
});

module.exports = router;