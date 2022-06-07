const got = require("got");
const axios = require("axios").default;
const mongoose = require("mongoose");
const Psa = require("../models/psa");
const errorHttp = require("./../models/errorHttp");

const getPsaImages = async function (data) {
  try {
    const response = await axios.request({
      url: "https://www.psacard.com/GetPSACertImages",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
    });
    const images = [];
    response.data.PSACertImages.forEach((image) => {
      images.push(image.ImageUrl);
    });
    return images;
  } catch (err) {
    console.log(err);
  }
};

const setNewCard = async function (card, res) {
  const newCard = new Psa({
    cardName: card.cardName,
    cardSet: card.cardSet,
    year: card.year,
    grade: card.grade,
    cardId: card.id ?? "64300969",
    images: card.images,
    numberOfCard: card.number,
    pop: {
      Higher: card.pop.Higher,
      inThisGrade: card.pop.inThisGrade,
    },
    date: new Date().toISOString(),
  });

  try {
    await newCard.save();
  } catch (err) {
    console.log(err);
    return errorHttp(res, "Somthing went wrong please try again later", 404);
  }
};

module.exports = [getPsaImages, setNewCard];
