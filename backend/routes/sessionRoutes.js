const express = require("express");

const router = express.Router();
const SessionController = require("../controllers/sessionController");

router.post("/sessions", (req, res) => {
  SessionController.createSession(req, res);
});

module.exports = router;
