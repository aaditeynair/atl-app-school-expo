const User = require("../models/User");

const UserController = {
  createUser: async (req, res) => {
    const { username, email, password } = req.query;

    try {
      const newUser = await User.create({ username, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
