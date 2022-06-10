const Psa = require("./../../models/psa");
const [updateCard] = require("./../psa");
const [setNewCard] = require("./../psa/setNewCard");
const schedule = require("node-schedule");

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const syncUpdate = async function () {
  try {
    const cardsIds = [];
    const cards = await Psa.find();
    cards.forEach((card) => cardsIds.push(card.cardId));
    for (let numberOfCard = 0; numberOfCard < cardsIds.length; numberOfCard++) {
      const cardDetailes = await updateCard(cardsIds[numberOfCard], true);
      const psacard = await Psa.findOne({
        cardId: Number(cardsIds[numberOfCard]),
      });
      // update the card
      if (cardDetailes.pop.Higher) psacard.pop.Higher = cardDetailes.pop.Higher;
      if (cardDetailes.pop.inThisGrade)
        psacard.pop.inThisGrade = cardDetailes.pop.inThisGrade;
      psacard.date = new Date().toISOString();
      await psacard.save();
      console.log("card saved");
    }
  } catch (err) {
    console.log(err);
  }
};

// syncUpdate();
const job = schedule.scheduleJob(tomorrow, async function () {
  today = new Date();
  tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  await syncUpdate();
});
