const got = require("got");
const axios = require("axios").default;
const mongoose = require("mongoose");
const Psa = require("../models/psa");
const cheerio = require("cheerio");
var FormData = require("form-data");
const errorHttp = require("./../models/errorHttp");

const [getPsaImages] = require("./psa/getPsaImages");
const [setNewCard] = require("./psa/setNewCard");

const updateCard = async function (id, res = false) {
  try {
    const { body, statusCode } = await got.get(
      "https://www.psacard.com/cert/" + id
    );
    const $ = cheerio.load(body);
    const pop = $(".text-xlarge").find(".text-light").html();
    const higherPop = $(".text-xlarge").find(".text-info").html() ?? 0;
    let cardDetailes = {
      id: id,
      cardName: "",
      year: "",
      cardSet: "",
      grade: "",
      number: "",
      pop: {
        inThisGrade: pop,
        Higher: higherPop,
      },
      images: [],
    };
    $("th").each(function () {
      if ($(this).html() == "Card Number")
        cardDetailes.number = $(this).next().html();
      if ($(this).html() == "Grade") cardDetailes.grade = $(this).next().html();
      if ($(this).html() == "Player")
        cardDetailes.cardName = $(this).next().html();
      if ($(this).html() == "Year") cardDetailes.year = $(this).next().html();
      if ($(this).html() == "Brand")
        cardDetailes.cardSet = $(this).next().html();
    });
    const script = $('script:contains("getPSACertImages")').html();
    const scriptArray = String(script).split(" ");
    let scriptId = scriptArray.find((script) =>
      script.includes("getPSACertImages")
    );
    scriptId = scriptId ? scriptId.match(/(\d+)/)[0] : "";
    const form = new FormData();
    form.append("certID", scriptId);
    cardDetailes.images = await getPsaImages(form);
    await setNewCard(cardDetailes);
    return await cardDetailes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = [updateCard];
