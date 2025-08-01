const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  total: { type: Number, required: true },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Card" }, // optional
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
