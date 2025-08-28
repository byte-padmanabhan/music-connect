import React, { useState } from "react";
import axios from "axios";
import { Brain, Send } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Learn() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Replace with your Gemini API key
  const API_KEY = "AIzaSyCqMLoAuuowdzD8M6MqQcvYj7y4-AFrwb4";
   const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";


  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${GEMINI_URL}?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: input }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const aiReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't find an answer.";

      setMessages([...newMessages, { role: "ai", content: aiReply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "ai", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      <Navbar/>

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mt-14 px-6">
        <h2 className="text-3xl font-semibold mb-3">Learn with AI</h2>
        <p className="text-gray-600 text-lg">
          Ask anything about Carnatic, Western, or Fusion music and get instant answers powered by AI.
        </p>
      </div>

      {/* Chat Section */}
      <div className="max-w-3xl mx-auto mt-10 bg-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-gray-700" />
          <h3 className="text-lg font-semibold">AI Music Tutor</h3>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
          {loading && <p className="text-gray-500 text-sm">Thinking...</p>}
        </div>

        {/* Input Box */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about music theory, ragas, chords..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
