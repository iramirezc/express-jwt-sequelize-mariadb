const express = require("express");
const AuthController = require("../../controllers/auth");
const router = express.Router();
const { authenticated } = require("../../middleware");

// POST /api/auth/signUp
router.post("/signUp", AuthController.signUp);

// POST /api/auth/signIn
router.post("/signIn", AuthController.signIn);

// GET /api/auth/whoami
router.get("/whoami", authenticated, AuthController.whoami);

module.exports = router;
