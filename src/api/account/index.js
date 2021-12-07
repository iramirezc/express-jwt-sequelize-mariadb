const express = require("express");
const AccountController = require("../../controllers/account");
const router = express.Router();

// POST /api/account/signup
router.post("/signup", AccountController.signup);

module.exports = router;
