const User = require("../models/User");

const UserController = {
  // getUserById: async (req, res) => {
  //   const userId = req.params.id;
  //
  //   try {
  //     const user = await User.findByPk(userId);
  //
  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }
  //
  //     return res.status(200).json(user);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },

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

  // ... other CRUD operations for users
};

module.exports = UserController;
