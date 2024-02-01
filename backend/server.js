require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Running app on port 3000");
});
