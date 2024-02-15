const router = require("express").Router();

router.get("/", function (req, res) {
  res.json({ message: "Hello from debugging duck!" });
});

module.exports = router;