const Psa = require("./../../models/psa");

const checkDataBaseCard = async function (id) {
  let card;
  try {
    card = await Psa.findOne({ cardId: id });
  } catch (err) {
    console.log(err);
  }
  return card;
};

module.exports = [checkDataBaseCard];
