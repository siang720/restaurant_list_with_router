// routes/restaurant.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

// search
router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);
    return res.render("index", {
      restaurants: restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
      }),
      keyword: keyword
    });
  });
});

module.exports = router;
