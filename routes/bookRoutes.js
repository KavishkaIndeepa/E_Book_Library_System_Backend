const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const {
  addBook,
  getUserBooks,
  getBooks,
  updateBook,
  deleteBook,
  approveBook,
  rejectBook,
  getBookById,
  getAllBooks,
  getAllPendingBooks,
} = require("../controllers/bookController");

router.post('/',verifyToken, addBook);
router.get('/user/pending', verifyToken, getUserBooks);
router.get('/pending', verifyToken, getAllPendingBooks);
router.get('/', getBooks);
router.get('/all', getAllBooks)
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.patch('/approve/:id', approveBook);
router.patch('/reject/:id', rejectBook);
router.get('/:id', getBookById);




module.exports = router;
