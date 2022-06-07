const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
var cors = require("cors");

const Psa = require("./router/psa");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

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

app.use("/verification", Psa);

// app.listen(port);

mongoose
  .connect(
    `mongodb+srv://cardsCollector:${process.env.USER_PASS}@cardscollector.qqxwzj9.mongodb.net/cardsCollector?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port);
    console.log("in");
  })
  .catch((err) => {
    console.log(err);
  });
