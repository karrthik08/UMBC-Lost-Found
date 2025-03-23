import React from "react";
import { Link } from "react-router-dom";
import "../assets/style.css"; // Ensure this is linked properly

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/lost">Lost</Link></li>
        <li><Link to="/found">Found</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/post">Post</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
