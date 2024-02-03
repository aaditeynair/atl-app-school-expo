const bcrypt = require("bcrypt");
const User = require("../models/User");

const UserController = {
  createUser: async (req, res) => {
    const { username, email, password } = req.query;

    console.log(username, email, password);
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        try {
          User.create({
            username,
            email,
            password: hashedPassword,
          }).then((user) => {
            res.status(201).json(user);
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ error: "Internal Sever Error during Password Hashing" });
      });
  },
};

module.exports = UserController;
