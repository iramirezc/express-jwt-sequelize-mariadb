const express = require("express");
const AuthController = require("../../controllers/auth");
const router = express.Router();

// POST /api/auth/login
router.post("/login", AuthController.login);

module.exports = router;
