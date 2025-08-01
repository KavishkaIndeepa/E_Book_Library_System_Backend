const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // base64 or URL
  pdf: { type: String, required: true }, // base64
  price: { type: String, required: true },
  category: { type: String },
  story: { type: String },
  description: { type: String },
  author: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'added', 'rejected'],
    default: 'pending',
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  meta: {
    sku: String,
    tags: String,
    format: String,
    pages: Number,
    publishYear: Number,
    language: String,
    country: String,
    availability: String,
  },
});

// bookSchema.index({ status: 1 });
bookSchema.index({ status: 1, userId: 1 });

module.exports = mongoose.model('Book', bookSchema);
