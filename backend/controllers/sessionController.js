const Session = require("../models/Session");

const SessionController = {
  createSession: async (req, res) => {
    const { title, userid } = req.query;

    try {
      const newSession = await Session.create({
        title,
        user_id: userid,
      });
      res.status(201).json(newSession);
    } catch (err) {
      console.error();
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = SessionController;
