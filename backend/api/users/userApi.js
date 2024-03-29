const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const {createToken, authorizeToken} = require("../../middleware/authentication");

// prisma client to interact with the database
const prisma = new PrismaClient();


/**
 * Add a new user
 */
router.post("/", async (req, res) => {
  // If the request does not have a username or password
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: "Missing username and/or password" });
    return;
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  try {
    // Create a new user and profile
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        passwordHash: hashedPassword,
        profile: {
          create: { // default display name is the email
            displayName: req.body.displayName || req.body.email,
          },
        },
      },
    });

    res.sendStatus(201); // Created
    console.log("User created: ", user);
  } catch (err) {
    if (err.code === "P2002") {
      res.status(409).json({ error: "User already exists" });
      return;
    }
    res.status(400).json(err); // Error when creating the user
  }
});


/**
 * Login a user, send back a token and the user's profile
 */
router.post("/logins/", async (req, res) => {
  // If the request does not have a username or password
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: "Missing username and/or password" });
    return;
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
      select: {
        email: true,
        userId: true,
        passwordHash: true,
        profile: {
          select: {
            displayName: true,
          },
        },
      },
    });

    // If the user is not found
    if (!user) {
      res.status(401).json({ error: "Invalid username and/or password" });
      return;
    }

    // If the password is correct
    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
      // send back a token and the user's profile
      const token = createToken(user.userId);
      res.json({ email: user.email, token: token, profile: user.profile });
      console.log("User logged in with token: ", token);
    // If the password is incorrect
    } else {
      res.status(401).json({ error: "Invalid username and/or password" });
    }
  } catch (err) {
    // if there is an error when finding the user
    res.status(400).json(err);
  }
});


/**
 * TODO: update a user (password, email, etc.)
 */


/**
 * delete a user (and their profile, goals, etc.)
 */
router.delete("/:userId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  console.log("Deleting user: ", req.userId);

  try {
    // Delete the user's tasks
    const deleteTasks = prisma.task.deleteMany({
      where: { 
        goal: {
          userId: req.userId,
        },
      },
    });

    // Delete the user's habit commits
    const deleteHabitCommits = prisma.habitCommit.deleteMany({
      where: {
        habit: {
          goal: {
            userId: req.userId,
          },
        },
      },
    });

    // Delete the user's habits
    const deleteHabits = prisma.habit.deleteMany({
      where: {
        goal: {
          userId: req.userId,
        },
      },
    });

    // Delete the user's goals
    const deleteGoals = prisma.goal.deleteMany({
      where: {
        userId: req.userId,
      },
    });

    // Delete the user's saved quotes
    const deleteSavedQuotes = prisma.savedQuote.deleteMany({
      where: {
        userId: req.userId,
      },
    });

    // Delete the user's profile
    const deleteProfile = prisma.profile.delete({
      where: {
        userId: req.userId,
      },
    });

    // Delete the user
    const deleteUser = prisma.user.delete({
      where: {
        userId: req.userId,
      },
    });

    // Delete all the user's data in a transaction
    const transaction = await prisma.$transaction([
      deleteTasks,
      deleteHabitCommits,
      deleteHabits,
      deleteGoals,
      deleteSavedQuotes,
      deleteProfile,
      deleteUser,
    ]);

    console.log("User deleted: ", transaction);

    res.sendStatus(204); // No Content
  } catch (err) {
    if (err.code === "P2025") {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(400).json(err); // Error when deleting the user
  }
});


/**
 * TODO: update a users profile (display name, etc.)
 */

module.exports = router;