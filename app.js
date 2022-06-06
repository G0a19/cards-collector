const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const fetch = require("node-fetch");
const cheerio = require("cheerio");

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("upload", "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

async function getCard() {
  const call = await fetch("https://www.psacard.com/cert/64300969");
  const response = await call.text();
}

getCard();

// mongoose
//   .connect(
//     `mongodb+srv://cardsCollector:${process.env.USER_PASS}@cardscollector.qqxwzj9.mongodb.net/?retryWrites=true&w=majority`,
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => {
//     app.listen(port);
//     console.log("in");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
