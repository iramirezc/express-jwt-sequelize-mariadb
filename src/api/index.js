const express = require("express");
const router = express.Router();

// Router /api/auth
router.use("/auth", require("./auth"));

// Router /api/users
router.use("/users", require("./users"));

// GET /api/health
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "OK",
  });
});

module.exports = router;
