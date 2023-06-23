const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const finderController = require("../server/controllers/finderController.js");
const favoriteController = require("../server/controllers/favoriteController.js");
const userController = require("../server/controllers/userController.js");
const cookieController = require("../server/controllers/cookieController.js");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

// try {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     .then(console.log("Connected to MongoDB"));
// } catch {
//   (err) => console.log(error);
// }

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

app.use("/find/:location_id/:nature_option",
  finderController.getNatureData,
  (req, res) => {
    res.status(200).json({ results: res.locals.results, date: res.locals.date });
  }
);

app.post("/favorites", favoriteController.checkFav, (req, res) => {
  res.status(200);
});

app.get("/favorites/:id", favoriteController.checkIfFavorite, (req, res) => {
  // res.send(res.locals.isFavorite);
  res.status(200).send(res.locals.isFavorite)
});

// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));
// serve index.html on the route '/'
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

app.listen(3000);
