const express = require("express");

const router = express.Router();
const TaskController = require("../controllers/taskController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/tasks", verifyToken, (req, res) => {
  TaskController.createTask(req, res);
});

module.exports = router;
