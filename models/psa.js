const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const psaSchema = new Schema({
  cardName: { type: String, required: true },
  cardSet: { type: String, required: true, unique: true },
  grade: { type: String, required: true },
  cardId: { type: String, required: true },
  images: [{ type: String }],
  numberOfCard: { type: String, required: true },
  pop: {
    Higher: { type: String, required: true },
    inThisGrade: { type: String, required: true },
  },
});

module.exports = mongoose.model("Psa", psaSchema);
