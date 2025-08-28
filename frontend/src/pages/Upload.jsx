import React, { useState } from "react";
import { Upload } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [progress, setProgress] = useState(0);

  // ✅ Cloudinary details
  const CLOUD_NAME = "dmoykhwpa"; // your Cloudinary cloud name
  const UPLOAD_PRESET = "unsigned_upload"; // your unsigned upload preset
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;

  const tags = ["Carnatic", "Western", "Jazz", "Rock", "Pop", "Hindustani", "Electronic", "Fusion"];
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files.length > 0) setFile(e.dataTransfer.files[0]); };

  const handleUpload = async () => {
    if (!file || !title || !description || !tag || !difficulty) {
      alert("Please fill all the fields and select a file before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("resource_type", "video"); // important for video

    try {
      // ✅ Upload video to Cloudinary
      const res = await axios.post(UPLOAD_URL, formData, {
        onUploadProgress: (progressEvent) => {
          const prog = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(prog);
        },
      });

      const videoUrl = res.data.secure_url;
      console.log("✅ Video uploaded at:", videoUrl);

      // ✅ Send metadata to backend
      await axios.post("http://localhost:8080/api/video", {
        title,
        description,
        tag,
        difficulty,
        fileUrl: videoUrl,
      });

      alert("✅ Video uploaded successfully!");
      setFile(null);
      setTitle("");
      setDescription("");
      setTag("");
      setDifficulty("");
      setProgress(0);

    } catch (error) {
      console.error("Cloudinary upload failed:", error.response?.data || error);
      alert("Upload failed. Please check your preset and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      <div className="max-w-2xl mx-auto text-center mt-14 px-6">
        <h2 className="text-3xl font-semibold mb-3">Upload Video</h2>
        <p className="text-gray-600 mb-6">Share your performance and help others learn new techniques & genres.</p>

        {/* Drag & Drop */}
        <div
          className={`border-2 ${dragging ? "border-black" : "border-gray-300"} border-dashed rounded-xl p-8 cursor-pointer transition-colors duration-300`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto text-gray-500 mb-3" />
          <p className="text-gray-500">{file ? `Selected: ${file.name}` : "Drag and drop your video file here"}</p>
        </div>

        {/* File Input */}
        <div className="mt-6">
          <label
            htmlFor="file-upload"
            className="bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {file && <p className="mt-4 text-sm text-gray-600">Selected File: <span className="font-medium">{file.name}</span></p>}

        {progress > 0 && (
          <div className="mt-4">
            <p>Uploading: {progress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-black h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* Metadata Inputs */}
        <div className="mt-6 text-left">
          <label className="block text-gray-700 font-medium mb-1">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none" placeholder="Enter your video title" />
        </div>

        <div className="mt-4 text-left">
          <label className="block text-gray-700 font-medium mb-1">Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none" placeholder="Describe your video" rows="3" />
        </div>

        <div className="mt-4 text-left">
          <label className="block text-gray-700 font-medium mb-1">Select Tag/Genre:</label>
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none">
            <option value="">-- Select Tag --</option>
            {tags.map((t, index) => <option key={index} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="mt-4 text-left">
          <label className="block text-gray-700 font-medium mb-1">Difficulty Level:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none">
            <option value="">-- Select Difficulty --</option>
            {difficultyLevels.map((d, index) => <option key={index} value={d}>{d}</option>)}
          </select>
        </div>

        <button onClick={handleUpload} className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">Upload Video</button>
      </div>
    </div>
  );
}
