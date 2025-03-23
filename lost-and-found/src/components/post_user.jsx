// src/components/PostUser.jsx
import React from "react";
import "../assets/post_user.css";

const PostUser = () => {
  const openPopup = () => {
    alert("Open popup with more details!");
  };

  return (
    <div className="post-container">
      {/* Left Side: Icons */}
      <div className="post-icons">
        {/* Like Button */}
        <div className="like-icon">
          <img src="/assets/like-icon.png" alt="Like" />
          <span className="tooltip">Paw this! - because you LIKE this post</span>
        </div>
        {/* Profile Icon */}
        <div className="profile-icon">
          <img src="/assets/user-avatar.png" alt="User" />
          <span className="tooltip">Posted by: Lavanya</span>
        </div>
      </div>

      {/* Right Side: Post Content */}
      <div className="post-content">
        <h3 className="post-title">Lost Car & Office Keys</h3>
        <p className="post-category">FYI</p>
        <p className="post-description">
          Lost car and office keys were found in the "all gender bathroom" 
          located in the Chemistry building on the 2nd floor. 
          <span className="read-more" onClick={openPopup}>
            Continue...
          </span>
        </p>
        <p className="post-meta">February 19, 2025 • 12:01 PM • 0 comments</p>
      </div>
    </div>
  );
};

export default PostUser;
