const router = require("express").Router();
const { UsersController } = require("../controllers");
const { adminOnly } = require("../middleware");

// GET /api/users
router.get("/", adminOnly, UsersController.getAll);

// POST /api/users
router.post("/", adminOnly, UsersController.createUser);

// GET /api/users/:id
router.get("/:id", adminOnly, UsersController.getUserById);

// PUT /api/users/:id
router.put("/:id", adminOnly, UsersController.updateUserById);

// DELETE /api/users/:id
router.delete("/:id", adminOnly, UsersController.deleteUserById);

module.exports = router;
