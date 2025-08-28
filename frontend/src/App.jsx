import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Collaborate from "./pages/Collaborate";
import Learn from "./pages/Learn";
import UploadPage from "./pages/Upload";
import Profilepage from "./pages/Profilepage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/collaborate" element={<Collaborate />} />
        <Route path="/profile" element={<Profilepage />} />
      
      </Routes>
    </Router>
  );
}
