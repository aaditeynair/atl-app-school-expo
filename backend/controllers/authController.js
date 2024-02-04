const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.query;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: "Wrong Email" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Wrong Password" });
      }

      const token = jwt.sign({ userId: user.user_id }, process.env.JWTTOKEN, {
        expiresIn: "1h",
      });

      return res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  authenticateUser: (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWTTOKEN, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { userId } = decoded;

      const user = await User.findByPk(userId);
      return res
        .status(200)
        .json({ user, message: "Authentication successful" });
    });
  },
};

module.exports = AuthController;
