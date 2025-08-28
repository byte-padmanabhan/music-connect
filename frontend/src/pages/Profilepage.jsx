import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Profilepage() {
  const [profile, setProfile] = useState(null); // store all profile data
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true); // toggle between edit & view mode

  const genres = ["Carnatic", "Western", "Jazz", "Rock", "Pop", "Hindustani", "Electronic", "Fusion"];
  const musicStyles = ["Solo", "Collaboration", "Remix", "Instrumental", "Vocal", "Electronic Production"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/profile", profile);
      setEditing(false); // switch to display mode after saving
      alert("✅ Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetch existing profile data
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/profile");
        if (res.data) {
          setProfile(res.data);
          setEditing(false); // show display mode if profile exists
        } else {
          // initialize empty profile object for editing
          setProfile({
            nickname: "",
            interests: "",
            hobbies: "",
            genre: "",
            musicStyle: "",
          });
          setEditing(true); // show form for new profile
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfile({
          nickname: "",
          interests: "",
          hobbies: "",
          genre: "",
          musicStyle: "",
        });
        setEditing(true);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Profile</h2>

        {editing ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/** Nickname */}
            <div>
              <label className="block font-medium mb-1">Nickname:</label>
              <input
                type="text"
                value={profile.nickname}
                onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your nickname"
                required
              />
            </div>

            {/** Interests */}
            <div>
              <label className="block font-medium mb-1">Interests:</label>
              <input
                type="text"
                value={profile.interests}
                onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="E.g., music theory, production, performance"
                required
              />
            </div>

            {/** Hobbies */}
            <div>
              <label className="block font-medium mb-1">Hobbies:</label>
              <input
                type="text"
                value={profile.hobbies}
                onChange={(e) => setProfile({ ...profile, hobbies: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="E.g., violin, guitar, songwriting"
              />
            </div>

            {/** Genre */}
            <div>
              <label className="block font-medium mb-1">Favorite Genre:</label>
              <select
                value={profile.genre}
                onChange={(e) => setProfile({ ...profile, genre: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
                required
              >
                <option value="">-- Select Genre --</option>
                {genres.map((g, idx) => (
                  <option key={idx} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/** Music Style */}
            <div>
              <label className="block font-medium mb-1">How would you like to make music?</label>
              <select
                value={profile.musicStyle}
                onChange={(e) => setProfile({ ...profile, musicStyle: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
                required
              >
                <option value="">-- Select Style --</option>
                {musicStyles.map((style, idx) => (
                  <option key={idx} value={style}>{style}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <p><strong>Nickname:</strong> {profile.nickname}</p>
            <p><strong>Interests:</strong> {profile.interests}</p>
            <p><strong>Hobbies:</strong> {profile.hobbies || "—"}</p>
            <p><strong>Favorite Genre:</strong> {profile.genre}</p>
            <p><strong>Music Style:</strong> {profile.musicStyle}</p>

            <button
              onClick={() => setEditing(true)}
              className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
