import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Ensure single import
import Post from "./components/Post";
import Home from "./pages/Home";
import Lost from "./pages/Lost";
import Found from "./pages/Found";
import Contact from "./pages/Contact";
import About from "./pages/About";


function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* ✅ Navbar should be included only once here */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lost" element={<Lost />} />
            <Route path="/found" element={<Found />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
