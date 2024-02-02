const express = require("express");

const router = express.Router();
const TaskController = require("../controllers/taskController");

router.post("/tasks", (req, res) => {
  TaskController.createTask(req, res);
});

module.exports = router;
