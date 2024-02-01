const Chapter = require("../models/Chapter");

const ChapterController = {
  createChapter: async (req, res) => {
    const { title, userid } = req.query;

    try {
      const newChapter = await Chapter.create({
        title,
        user_id: userid,
      });
      res.status(201).json(newChapter);
    } catch (err) {
      console.error();
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ChapterController;
