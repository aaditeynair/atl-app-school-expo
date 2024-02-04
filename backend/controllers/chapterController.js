const Chapter = require("../models/Chapter");

const ChapterController = {
  createChapter: async (req, res) => {
    const { title, userId } = req.query;

    try {
      const newChapter = await Chapter.create({
        title,
        user_id: userId,
      });
      res.status(201).json(newChapter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllUserChapter: async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    try {
      const allChapters = await Chapter.findAll({ where: { user_id: userId } });
      return res.status(200).json({ allChapters });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ChapterController;
