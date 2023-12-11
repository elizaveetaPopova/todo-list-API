const express = require("express");
const {
  getTasks,
  getTask,
  deleteTask,
  deleteTasks,
  addTask,
  updateTask,
} = require("../controllers/task-controller");

const router = express.Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.delete("/tasks/:id", deleteTask);
router.delete("/tasks", deleteTasks);
router.post("/tasks", addTask);
router.patch("/tasks/:id", updateTask);

module.exports = router;
