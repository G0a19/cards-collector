const Psa = require("./../../models/psa");

const setNewCard = async function (card, update = false) {
  const newCard = new Psa({
    cardName: card.cardName,
    cardSet: card.cardSet,
    year: card.year,
    grade: card.grade,
    cardId: card.id ?? "0",
    images: card.images,
    numberOfCard: card.number,
    pop: {
      Higher: card.pop.Higher,
      inThisGrade: card.pop.inThisGrade,
    },
    date: new Date().toISOString(),
  });

  if (update) return newCard;

  try {
    await newCard.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = [setNewCard];
