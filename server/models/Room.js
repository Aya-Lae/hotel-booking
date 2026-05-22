const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  isAvailable: { type: Boolean, default: true },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);