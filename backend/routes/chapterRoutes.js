const express = require("express");

const router = express.Router();
const ChapterController = require("../controllers/chapterController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/chapters", verifyToken, (req, res) => {
  ChapterController.createChapter(req, res);
});

router.get("/chapters/", verifyToken, (req, res) => {
  ChapterController.getAllUserChapter(req, res);
});

module.exports = router;
