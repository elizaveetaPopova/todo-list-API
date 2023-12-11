const express = require("express");
const {
  getTasks,
  getTask,
  deleteTask,
  addTask,
  updateTask,
} = require("../controllers/task-controller");

const router = express.Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.delete("/tasks/:id", deleteTask);
router.post("/tasks", addTask);
router.patch("/tasks/:id", updateTask);

module.exports = router;
