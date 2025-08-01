const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const {
  addToCart,
  getUserCart,
  removeItemFromCart,
} = require('../controllers/cartController');

// Add book to cart
router.post('/add', verifyToken, addToCart);

// Get user's cart
router.get('/', verifyToken, getUserCart);

// Remove book from cart
router.delete('/remove/:bookId', verifyToken, removeItemFromCart);

module.exports = router;
