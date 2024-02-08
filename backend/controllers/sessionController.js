const Session = require("../models/Session");

const SessionController = {
  createSession: async (req, res) => {
    const { userId } = req;
    const { title } = req.query;

    try {
      const newSession = await Session.create({
        title,
        user_id: userId,
      });
      res.status(201).json(newSession);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getUserSessions: async (req, res) => {
    const { userId } = req;

    try {
      const allSessions = await Session.findAll({
        order: [["updatedAt", "DESC"]],
        where: { user_id: userId },
      });
      return res.status(200).json({ allSessions });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getSession: async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    try {
      const session = await Session.findOne({
        where: { session_id: id },
        include: "tasks",
      });
      if (session === null) {
        return res.status(404).json({ error: "Session doesn't exist" });
      }

      if (session.user_id !== userId) {
        return res
          .status(401)
          .json({ error: "Session doesn't belong to user" });
      }

      return res.status(200).json({ session });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = SessionController;
