const Card = require("../models/Card");

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.addCard = async (req, res) => {
  try {
    const { cardHolder, cardNumber, expiry, cvv } = req.body;
    const newCard = new Card({ cardHolder, cardNumber, expiry, cvv, userId: req.user.id });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ msg: "Failed to save card" });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedCard) return res.status(404).json({ msg: "Card not found" });
    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update card" });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const result = await Card.deleteOne({ _id: req.params.id, userId: req.user.id });
    if (result.deletedCount === 0) return res.status(404).json({ msg: "Card not found" });
    res.json({ msg: "Card deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete card" });
  }
};