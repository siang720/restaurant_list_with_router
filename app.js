const express = require("express");
const port = 3000;
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// setting static file
app.use(express.static("public"));

// template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
const Restaurant = require("./models/restaurant");

// homepage
app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

// list all restaurants
app.get("/restaurants", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);
    return res.render("index", { restaurants: restaurants });
  });
});

// create page
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});

// restaurant detail
app.get("/restaurants/:id", (req, res) => {
  res.send("detail");
});

// create
app.post("/restaurants", (req, res) => {
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
app.get("/restaurants/:id/edit", (req, res) => {
  res.send("edit page");
});

// edit
app.put("/restaurants/:id", (req, res) => {
  console.log("Now it is editing");
});

// delete
app.delete("/restaurants/:id/delete", (req, res) => {
  console.log("Now it is delete");
});

app.get("/search", (req, res) => {
  res.send("search results");
});

app.listen(port, () => {
  console.log("App is running");
});
