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
const { authorizeToken } = require("../middleware/authentication");

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
 * Get a goal and all of its tasks and habits
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
        task_id: parseInt(req.params.taskId),
        goal_id: parseInt(req.params.goalId),
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
        task_name: req.body.taskName,
        task_description: req.body.taskDescription,
        scheduled_at: req.body.scheduledAt ? new Date(req.body.scheduledAt) : undefined,
        ends_at: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
        goal: {
          connect: { goal_id: parseInt(req.params.goalId) },
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
        task_id: parseInt(req.params.taskId),
        goal_id: parseInt(req.params.goalId),
      },
      data: {
        task_name: req.body.taskName || undefined,
        task_description: req.body.taskDescription || undefined,
        scheduled_at: req.body.scheduledAt ? new Date(req.body.scheduledAt) : undefined,
        ends_at: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
        committed_at: req.body.committedAt ? new Date(req.body.committedAt) : undefined,
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
        task_id: parseInt(req.params.taskId),
        goal_id: parseInt(req.params.goalId),
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
        habit_id: parseInt(req.params.habitId),
        goal_id: parseInt(req.params.goalId),
      },
      include: {
        commits: {
          select: {
            habit_commit_id: true,
            committed_at: true,
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
        habit_id: parseInt(req.params.habitId),
        goal_id: parseInt(req.params.goalId),
      },
      data: {
        habit_name: req.body.habitName || undefined,
        habit_description: req.body.habitDescription || undefined,
        start_at: req.body.startAt ? new Date(req.body.startAt) : undefined,
        ends_at: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
        frequency: req.body.frequency || undefined,
        days_of_week: req.body.daysOfWeek || undefined,
        deployed_at: req.body.deployedAt ? new Date(req.body.deployedAt) : undefined,
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
    // Delete the habit
    const habit = await prisma.habit.delete({
      where: {
        habit_id: parseInt(req.params.habitId),
        goal_id: parseInt(req.params.goalId),
      },
    });

    // habit successfully deleted
    res.sendStatus(204);
    console.log("Habit deleted: ", habit);
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
        habit_id: parseInt(habitId),
        goal_id: parseInt(goalId),
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
        habit_id: parseInt(req.params.habitId),
        habit: {
          goal_id: parseInt(req.params.goalId),
        },
      },
      select: {
        habit_commit_id: true,
        committed_at: true,
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
          connect: { habit_id: parseInt(req.params.habitId) },
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
        habit_commit_id: parseInt(req.params.commitId),
        habit_id: parseInt(req.params.habitId),
        habit: {
          goal_id: parseInt(req.params.goalId),
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