const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cardHolder: String,
  cardNumber: String,
  expiry: String,
  cvv: String,
});

module.exports = mongoose.model("Card", cardSchema);