const express = require("express");
const AuthController = require("../../controllers/auth");
const router = express.Router();
const { authenticated } = require("../../middleware");

// POST /api/auth/login
router.post("/login", AuthController.login);

// GET /api/auth/whoami
router.get("/whoami", authenticated, AuthController.whoami);

module.exports = router;
