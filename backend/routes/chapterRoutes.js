const express = require("express");

const router = express.Router();
const ChapterController = require("../controllers/chapterController");

router.post("/chapters", (req, res) => {
  ChapterController.createChapter(req, res);
});

module.exports = router;
