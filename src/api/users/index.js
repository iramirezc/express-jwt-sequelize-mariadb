const express = require("express");
const UserController = require("../../controllers/users");
const router = express.Router();

// GET /api/users
router.get("/", UserController.getAll);

module.exports = router;
