const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const express = require("express");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTask);

module.exports = router;
