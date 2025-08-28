const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Video = require('./models/Video');
const Profile = require('./models/Profile');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ------------------- VIDEO ROUTES -------------------

// Save video metadata
app.post('/api/video', async (req, res) => {
  try {
    const { title, description, tag, difficulty, fileUrl } = req.body;
    if (!title || !description || !tag || !difficulty || !fileUrl) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    const video = new Video({ title, description, tag, difficulty, fileUrl });
    await video.save();
    res.status(201).json({ message: '✅ Video metadata saved!', video });
  } catch (err) {
    console.error('❌ Save error:', err);
    res.status(500).json({ message: 'Failed to save metadata', error: err.message });
  }
});

// Get all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
});

// ------------------- PROFILE ROUTES -------------------

// Save or update profile
app.post('/api/profile', async (req, res) => {
  try {
    const { nickname, interests, hobbies, genre, musicStyle } = req.body;

    if (!nickname || !interests || !genre || !musicStyle) {
      return res.status(400).json({ message: 'Required fields are missing!' });
    }

    // Check if profile exists
    let profile = await Profile.findOne({ nickname });
    if (profile) {
      profile.interests = interests;
      profile.hobbies = hobbies;
      profile.genre = genre;
      profile.musicStyle = musicStyle;
      await profile.save();
    } else {
      profile = new Profile({ nickname, interests, hobbies, genre, musicStyle });
      await profile.save();
    }

    res.status(201).json({ message: '✅ Profile saved!', profile });
  } catch (err) {
    console.error('❌ Profile save error:', err);
    res.status(500).json({ message: 'Failed to save profile', error: err.message });
  }
});

// Get profile (return null if none exists)
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne(); // fetch first profile
    if (!profile) return res.json(null);
    res.json(profile);
  } catch (err) {
    console.error('❌ Fetch profile error:', err);
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
});

// ------------------- SERVER -------------------
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
