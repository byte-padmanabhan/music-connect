import React from "react";
import { Upload, Music, Users, Bot } from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center font-sans">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center mt-16 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Carnatic & Western fusion
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Learn, collaborate, create.</p>

        <div className="mt-6 flex justify-center gap-4">
        <Link
          to="/learn"
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Start Learning
        </Link>

          <Link
          to="/upload"
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Upload Music
        </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto mt-14 px-6">
        <h2 className="text-xl font-semibold mb-6">Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition">
            <Upload className="w-7 h-7 mx-auto mb-3" />
            <p className="font-medium">Upload your music</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition">
            <Bot className="w-7 h-7 mx-auto mb-3" />
            <p className="font-medium">Get AI-guided suggestions</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition">
            <Users className="w-7 h-7 mx-auto mb-3" />
            <p className="font-medium">Collaborate with other musicians</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition">
            <Music className="w-7 h-7 mx-auto mb-3" />
            <p className="font-medium">Explore music fusion examples</p>
          </div>
        </div>

        {/* About Us Section */}
        <section className="w-full max-w-5xl mx-auto mt-20 px-6 text-center">
          <h2 className="text-2xl font-semibold mb-6">About Us</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            ChordSense was born from a simple idea:{" "}
            <span className="font-medium">
              what if you could learn a new genre while staying true to your
              roots?
            </span>
            Imagine being a Carnatic musician curious about Western harmonies, or
            a guitarist who wants to explore ragas. By blending traditions with
            modern sounds, we help you{" "}
            <span className="font-medium">
              create music that is both authentic and globally resonant.
            </span>
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            Our platform makes this possible through guided learning,
            AI-powered suggestions, and collaboration with musicians across
            genres. Whether you want to experiment, grow your skills, or create
            the next big hit,{" "}
            <span className="font-medium">
              ChordSense is your space to learn, collaborate, and innovate.
            </span>
          </p>
        </section>
      </section>
    </div>
  );
}
