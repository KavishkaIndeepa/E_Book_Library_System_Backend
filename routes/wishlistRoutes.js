const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

router.post("/add", verifyToken, addToWishlist);
router.delete("/remove/:bookId", verifyToken, removeFromWishlist);
router.get("/", verifyToken, getWishlist);

module.exports = router;
