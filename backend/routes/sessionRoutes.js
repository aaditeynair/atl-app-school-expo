const express = require("express");

const router = express.Router();
const SessionController = require("../controllers/sessionController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/sessions", verifyToken, (req, res) => {
  SessionController.createSession(req, res);
});

router.get("/sessions", verifyToken, (req, res) => {
  SessionController.getUserSessions(req, res);
});

module.exports = router;
