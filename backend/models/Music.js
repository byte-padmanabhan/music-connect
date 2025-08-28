const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true },
  difficulty: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('Music', MusicSchema);
