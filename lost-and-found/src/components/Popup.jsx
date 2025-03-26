import React from "react";
import "../assets/style.css";

const Popup = ({ post, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <span className="close-btn" onClick={onClose}>&times;</span>

        <div className="post-header">
          <img src="https://via.placeholder.com/50" alt="User Avatar" />
          <h3>{post.title}</h3>
        </div>

        <div className="post-content">
          <p><strong>ITEM:</strong> {post.category}</p>
          <p><strong>Date:</strong> {new Date(post.timestamp).toDateString()}</p>
          <p><strong>DESCRIPTION:</strong> {post.description}</p>
        </div>

        <div className="comment-section">
          <h4>Comments</h4>
          <textarea className="comment-box" placeholder="Post a comment..."></textarea>
        </div>

        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default Popup;
