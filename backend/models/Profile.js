const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  interests: { type: String, required: true },
  hobbies: { type: String },
  genre: { type: String, required: true },
  musicStyle: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
