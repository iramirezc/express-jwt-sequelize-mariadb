const express = require("express");
const UsersController = require("../../controllers/users");
const router = express.Router();

// GET /api/users
router.get("/", UsersController.getAll);

// POST /api/users
router.post("/", UsersController.createUser);

// GET /api/users/:id
router.get("/:id", UsersController.getUserById);

// PUT /api/users/:id
router.put("/:id", UsersController.updateUserById);

// DELETE /api/users/:id
router.delete("/:id", UsersController.deleteUserById);

module.exports = router;
