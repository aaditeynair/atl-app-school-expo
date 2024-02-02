const Task = require("../models/Task");

const TaskController = {
  createTask: async (req, res) => {
    const { chapterId, timeEstimate, sessionId } = req.query;

    try {
      const newTask = await Task.create({
        chapter_id: chapterId,
        time_estimate: timeEstimate,
        session_id: sessionId,
      });
      res.status(201).json(newTask);
    } catch (err) {
      console.error();
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = TaskController;
