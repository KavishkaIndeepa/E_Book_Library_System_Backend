const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String }, // base64 or URL
  role: { type: String, default: 'user' },
});

module.exports = mongoose.model('User', userSchema);