const express = require("express");

const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/login", (req, res) => {
  AuthController.login(req, res);
});

router.get("/check-auth", (req, res) => {
  AuthController.authenticateUser(req, res);
});

module.exports = router;
