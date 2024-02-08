const Chapter = require("../models/Chapter");

const ChapterController = {
  createChapter: async (req, res) => {
    const { userId } = req;
    const { title } = req.query;

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
    const { userId } = req;
    try {
      const allChapters = await Chapter.findAll({ where: { user_id: userId } });
      return res.status(200).json({ allChapters });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteChapterById: async (req, res) => {
    const { userId } = req;
    const chapterId = req.params.id;

    try {
      const chapter = await Chapter.findOne({
        where: { chapter_id: chapterId },
      });
      if (chapter === null) {
        return res.status(404).json({ error: "Chapter doesn't exist" });
      }

      if (chapter.user_id !== userId) {
        return res
          .status(401)
          .json({ error: "Chapter doesn't belong to user" });
      }

      await Chapter.destroy({ where: { chapter_id: chapter.chapter_id } });
      return res.status(200).json({ message: "Chapter deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getChapterById: async (req, res) => {
    const { userId } = req;
    const chapterId = req.params.id;

    try {
      const chapter = await Chapter.findOne({
        where: { chapter_id: chapterId },
      });
      if (chapter === null) {
        return res.status(404).json({ error: "Chapter doesn't exist" });
      }

      if (chapter.user_id !== userId) {
        return res
          .status(401)
          .json({ error: "Chapter doesn't belong to user" });
      }

      return res.status(200).json({ chapter });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ChapterController;
