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
  getTask: async (req, res) => {
    const { userId } = req;
    const { id } = req.params;
    try {
      const task = await Task.findOne({
        where: { task_id: id },
      });

      if (task === null) {
        return res.status(404).json({ error: "Task doesn't exist" });
      }

      const chapter = await task.getChapter();
      if (chapter.user_id !== userId) {
        return res.status(401).json({ error: "Task doesn't belong to user" });
      }

      return res.status(200).json({ task, chapter });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateTask: async (req, res) => {
    const { userId } = req;
    const { id } = req.params;
    const { completed, confidenceRating, date } = req.query;

    try {
      const task = await Task.findOne({
        where: { task_id: id },
      });

      if (task === null) {
        return res.status(404).json({ error: "Task doesn't exist" });
      }

      const chapter = await task.getChapter();
      if (chapter.user_id !== userId) {
        return res.status(401).json({ error: "Task doesn't belong to user" });
      }

      task.completed = completed;
      chapter.confidence_rating = confidenceRating;
      chapter.last_revised_date = date;

      await task.save();
      await chapter.save();

      return res.status(200).json({ task, chapter });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = TaskController;
