import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from './Logo';
import "../assets/style.css"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Logo />
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <div className="nav-links">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/lost" onClick={toggleMenu}>Lost</Link>
          <Link to="/found" onClick={toggleMenu}>Found</Link>
          <Link to="/messages" onClick={toggleMenu} className="icon-link message-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span className="badge message-badge">0</span>
          </Link>
          <Link to="/Notification" onClick={toggleMenu} className="icon-link notification-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="badge notification-badge">0</span>
          </Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
