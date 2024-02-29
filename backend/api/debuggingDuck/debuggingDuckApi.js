const router = require("express").Router();

// TODO: replace this with the actual debugging duck API

/**
 * Get the debugging ducks welcome message
 */
router.get("/", async (req, res) => {
  res.json({ message: "Hello from debugging duck!" });
});

module.exports = router;