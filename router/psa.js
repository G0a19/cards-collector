const express = require("express");
const mongoose = require("mongoose");
const Psa = require("../models/psa");
const middleware = require("./../middleware/middleware");
const errorHttp = require("./../models/errorHttp");

const [updateCard] = require("./../functions/psa");
const [checkDataBaseCard] = require("./../functions/psa/checkDataBaseCard");

const router = express.Router();

router.get("/psa/:id", async function (req, res, next) {
  const id = req.params.id;
  const card = await checkDataBaseCard(id);
  if (card) {
    return res.status(201).json(card.toObject({ getters: true }));
  }
  const cardDetailes = await updateCard(id);
  await res.status(201).json(cardDetailes);
});

module.exports = router;
