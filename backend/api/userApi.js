const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');

// Secret for encoding and decoding JWTs
const secret = process.env.JWT_SECRET;
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
            display_name: req.body.displayName || req.body.email,
          },
        },
      },
    });

    res.sendStatus(201); // Created
    console.log("User created: ", user);
  } catch (err) {
    res.status(400).json(err); // Error when creating the user
  }
});


/**
 * Login a user
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
      include: { profile: true },
    });

    // If the user is not found
    if (!user) {
      res.status(401).json({ error: "Invalid username and/or password" });
      return;
    }

    // If the password is correct
    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
      // send back a token and the user's profile
      const token = jwt.encode({ id: user.id }, secret);
      res.json({ token: token, profile: user.profile });
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

module.exports = router;