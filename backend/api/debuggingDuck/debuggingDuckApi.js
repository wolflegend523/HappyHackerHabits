const router = require("express").Router();

/**
 * Get the debugging ducks welcome message
 */
router.get("/", async (req, res) => {
  res.json({ message: "Hello from debugging duck!" });
});

module.exports = router;