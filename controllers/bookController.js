const sendEmail = require("../utils/sendEmail");
const Book = require("../models/Book");
const User = require("../models/User");

exports.addBook = async (req, res) => {
  try {
    const bookData = req.body;

     // Check if user is admin or not
    if (req.user.role === "admin") {
      bookData.status = "added"; // admin directly adds book
    } else {
      bookData.status = "pending"; // regular user requires approval
    }
    bookData.userId = req.user.id;

    const newBook = new Book(bookData);
    await newBook.save();
    res.status(201).json({ msg: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("Add Book Error:", err);
    res.status(500).json({ msg: "Failed to add book" });
  }
};

// exports.getAllBooks = async (req, res) => {
//   try {
//     const filter = {};
//     if (req.query.status) {
//       filter.status = req.query.status;
//     }
//     const books = await Book.find(filter);
//     res.json(books);
//   } catch (err) {
//     console.error("Get All Books Admin Error:", err);
//     res.status(500).json({ msg: "Failed to get books" });
//   }
// };
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // No filter applied
    res.json(books);
  } catch (err) {
    console.error("Get All Books Admin Error:", err);
    res.status(500).json({ msg: "Failed to get books" });
  }
};


// exports.getBooksByAdmin = async (req, res) => {
//   try {
//     const { status } = req.query;
//     const query = {};

//     if (status) {
//       query.status = status;
//     }

//     const books = await Book.find(query).sort({ createdAt: -1 });
//     res.json({ books });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch books" });
//   }
// };

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find({ status: "added" })
        .select("title image price category")
        .skip(skip)
        .limit(limit),
      Book.countDocuments({ status: "added" })
    ]);

    res.json({ books, total });
  } catch (err) {
    console.error("Get Books Error:", err);
    res.status(500).json({ msg: "Failed to get books" });
  }
};


exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) return res.status(404).json({ msg: "Book not found" });
    res.json({ msg: "Book updated", book: updatedBook });
  } catch (err) {
    console.error("Update Book Error:", err);
    res.status(500).json({ msg: "Failed to update book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Book not found" });
    res.json({ msg: "Book deleted" });
  } catch (err) {
    console.error("Delete Book Error:", err);
    res.status(500).json({ msg: "Failed to delete book" });
  }
};

// Approve Book

exports.approveBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status: "added" },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let user = null;
    if (book.userId) {
      user = await User.findById(book.userId);
    }

    if (user && user.email) {
      await sendEmail(
        user.email,
        "Book Approved",
        `<p>Hi ${user.name},</p><p>Your book titled "<strong>${book.title}</strong>" has been <span style="color:green;"><strong>approved</strong></span> and is now available in the library.</p>`
      );
    }

    res.status(200).json({ message: "Book approved", book });
  } catch (error) {
    console.error("Approve Book Error:", error);
    res.status(500).json({ message: "Failed to approve book" });
  }
};

// Reject Book
exports.rejectBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let user = null;
    if (book.userId) {
      user = await User.findById(book.userId);
    }


    // Only send email if the book has a userId
    if (user && user.email) {
      await sendEmail(
        user.email,
        "Book Rejected",
        `<p>Hi ${user.name},</p><p>Your book titled "<strong>${book.title}</strong>" has been <span style="color:green;"><strong>Rejected</strong></span> and is not available in the library.</p>`
      );
    }

    res.status(200).json({ message: "Book rejected", book });
  } catch (error) {
    console.error("Reject Book Error:", error);
    res.status(500).json({ message: "Failed to reject book" });
  }
};





exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error("Get Book By ID Error:", err);
    res.status(500).json({ msg: "Failed to get book" });
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const books = await Book.find({ userId, status: 'pending' });
   res.json({ books });
  } catch (err) {
    console.error("Get User Books Error:", err);
    res.status(500).json({ msg: "Failed to fetch user's pending books" });
  }
};

exports.getAllPendingBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: 'pending' });
    res.json({ books });
  } catch (err) {
    console.error("Failed to fetch pending books", err);
    res.status(500).json({ msg: "Failed to fetch pending books" });
  }
};
