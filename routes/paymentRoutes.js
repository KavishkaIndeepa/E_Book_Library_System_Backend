const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  getCards,
  addCard,
  updateCard,
  deleteCard,
} = require("../controllers/paymentController");

router.get("/", verifyToken, getCards);
router.post("/", verifyToken, addCard);
router.put("/:id", verifyToken, updateCard);
router.delete("/:id", verifyToken, deleteCard);

module.exports = router;
