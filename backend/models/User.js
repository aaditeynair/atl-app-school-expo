const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Chapter = require("./Chapter");
const Session = require("./Session");

const User = sequelize.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Chapter, { foreignKey: "user_id" });
User.hasMany(Session, { foreignKey: "user_id" });

module.exports = User;
