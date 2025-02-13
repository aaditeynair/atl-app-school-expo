const express = require("express");

const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/users", (req, res) => {
  UserController.createUser(req, res);
});

module.exports = router;
