const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Task = require("./Task");

const Session = sequelize.define("session", {
  session_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});

Session.hasMany(Task, { foreignKey: "session_id" });

module.exports = Session;
