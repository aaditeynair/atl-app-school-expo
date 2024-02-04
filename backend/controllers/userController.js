const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const UserController = {
  createUser: async (req, res) => {
    const { username, email, password } = req.query;

    User.findOne({ where: { email } })
      .then((u) => {
        if (u === null) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              User.create({
                username,
                email,
                password: hashedPassword,
              })
                .then((user) => {
                  const token = jwt.sign(
                    { userId: user.user_id },
                    process.env.JWTTOKEN,
                    {
                      expiresIn: "1h",
                    },
                  );
                  res.status(201).json({ user, token });
                })
                .catch((error) => {
                  console.error(error);
                  res.status(500).json({ error: "Internal Server Error" });
                });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({
                error: "Internal Sever Error during Password Hashing",
              });
            });
        } else {
          res.status(401).json({ error: "Email already in use" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = UserController;
