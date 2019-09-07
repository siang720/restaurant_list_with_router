const express = require("express");
const port = 3000;
const app = express();
const mongoose = require("mongoose");

// connect to database
mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });
// get connection object
const db = mongoose.connection;

// connection fail
db.on("error", () => {
  console.log("mongodb error!");
});

// connection success
db.once("open", () => {
  console.log("mongodb connected!");
});

// require restaurant model
const restaurant = require("./models/restaurant");

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log("App is running");
});
