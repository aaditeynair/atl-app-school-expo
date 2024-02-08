const express = require("express");

const router = express.Router();
const TaskController = require("../controllers/taskController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/tasks", verifyToken, (req, res) => {
  TaskController.createTask(req, res);
});

router.get("/tasks/:id", verifyToken, (req, res) => {
  TaskController.getTask(req, res);
});

router.put("/tasks/:id", verifyToken, (req, res) => {
  TaskController.updateTask(req, res);
});

module.exports = router;
