const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const seedData = require("./restaurant.json");

mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected!");

  for (var i = 0; i < seedData.results.length; i++) {
    Restaurant.create({
      id: seedData.results[i].id,
      name: seedData.results[i].name,
      name_en: seedData.results[i].name_en,
      category: seedData.results[i].category,
      image: seedData.results[i].image,
      location: seedData.results[i].location,
      phone: seedData.results[i].phone,
      google_map: seedData.results[i].google_map,
      rating: seedData.results[i].rating,
      description: seedData.results[i].description
    });
  }

  console.log("done");
});
