require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const taskRoutes = require("./routes/taskRoutes");

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
app.use("/api", chapterRoutes);
app.use("/api", sessionRoutes);
app.use("/api", taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running app on port ${port}`);
});
