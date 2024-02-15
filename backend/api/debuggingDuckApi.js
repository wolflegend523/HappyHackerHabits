const router = require("express").Router();

router.get("/", async (req, res) => {
  res.json({ message: "Hello from debugging duck!" });
});

module.exports = router;