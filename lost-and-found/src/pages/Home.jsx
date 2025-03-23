// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component
import "../assets/style.css"; // Import global styles
import PostList from "../components/PostList";

<PostList />


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to Lost & Found Portal</h1>
        <p>Easily report lost & found items and connect with owners.</p>

        <div className="home-links">
          <Link to="/lost" className="home-button">View Lost Items</Link>
          <Link to="/found" className="home-button">View Found Items</Link>
          <Link to="/post" className="home-button">Post an Item</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
