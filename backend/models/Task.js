const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Chapter = require("./Chapter");

const Task = sequelize.define("task", {
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  time_estimate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Task.belongsTo(Chapter, { foreignKey: "chapter_id" });

module.exports = Task;
