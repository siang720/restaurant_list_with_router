// routes/restaurant.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

// list all restaurants
router.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);
    return res.render("index", { restaurants: restaurants });
  });
});

// create page
router.get("/new", (req, res) => {
  res.render("new");
});

// restaurant detail
router.get("/:id", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("detail", { restaurant: restaurant });
  });
});

// create
router.post("/", (req, res) => {
  // create restaurant object
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  });

  // save to database
  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

// edit page
router.get("/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("edit", { restaurant: restaurant });
  });
});

// edit
router.put("/:id", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.name = req.body.name;
    restaurant.name_en = req.body.name_en;
    restaurant.category = req.body.category;
    restaurant.image = req.body.image;
    restaurant.location = req.body.location;
    restaurant.phone = req.body.phone;
    restaurant.google_map = req.body.google_map;
    restaurant.rating = req.body.rating;
    restaurant.description = req.body.description;
    restaurant.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});

// delete
router.delete("/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

// 設定 /restaurants 路由
module.exports = router;
