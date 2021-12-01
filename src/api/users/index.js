const express = require("express");
const UserController = require("../../controllers/users");
const router = express.Router();

// GET /api/users
router.get("/", UserController.getAll);

// POST /api/users
router.post("/", UserController.createUser);

// GET /api/users/:id
router.get("/:id", UserController.getUserById);

// PUT /api/users/:id
router.put("/:id", UserController.updateUserById);

// DELETE /api/users/:id
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
