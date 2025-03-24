import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      <div className="logo-container">
        <div className="logo-letter">
          <div className="logo-l-shape"></div>
        </div>
        <div className="logo-text">LOST & FOUND</div>
      </div>
    </Link>
  );
};

export default Logo;
