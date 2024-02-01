const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: process.env.DBNAME,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
