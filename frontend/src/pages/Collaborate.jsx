import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function CollaborationPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Handle autoplay: only play the video fully visible
  useEffect(() => {
    const handleScroll = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;
        const rect = video.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isVisible) video.play().catch(() => {});
        else video.pause();
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videos]);

  if (loading) return <p className="text-center mt-10">Loading videos...</p>;

  return (
    
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <Navbar/>
      <h2 className="text-3xl font-bold mt-6 mb-6">Here's your daily ear rot</h2>
      
      <div className="w-full max-w-md flex flex-col gap-8">
        {videos.map((video, idx) => (
          <div
            key={idx}
            className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden shadow-lg"
          >
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              src={video.fileUrl}
              className="w-full h-full object-cover"
              
              loop
              playsInline
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 via-black/0 text-white">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm mb-1">{video.description}</p>
              <div className="flex justify-between text-xs text-gray-300">
                <span>{video.tag}</span>
                <span>{video.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
