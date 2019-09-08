// routes/restaurant.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

// homepage
router.get("/", (req, res) => {
  res.redirect("/restaurants");
});

module.exports = router;
