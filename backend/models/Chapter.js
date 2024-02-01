const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Chapter = sequelize.define("chapter", {
  chapter_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_revised_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  confidence_rating: {
    type: DataTypes.ENUM("good", "average", "bad"),
    defaultValue: "average",
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Chapter;
