const Wishlist = require("../models/Wishlist");

// Add to Wishlist
const addToWishlist = async (req, res) => {
  const { bookId } = req.body;
  try {
    const exists = await Wishlist.findOne({ userId: req.user.id, bookId });
    if (exists) return res.status(400).json({ msg: "Already in wishlist" });

    const item = new Wishlist({ userId: req.user.id, bookId });
    await item.save();
    res.status(201).json({ msg: "Added to wishlist" });
  } catch (err) {
    console.error("Add to wishlist error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({
      userId: req.user.id,
      bookId: req.params.bookId,
    });
    res.json({ msg: "Removed from wishlist" });
  } catch (err) {
    console.error("Remove wishlist error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get User Wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.id }).populate("bookId");
    res.json(wishlist);
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
