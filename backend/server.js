require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

app.use("/api", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running app on port ${port}`);
});
