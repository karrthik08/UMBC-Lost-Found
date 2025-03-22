// src/components/HomePage.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Card, CardContent } from "@material-ui/core";
import SearchBar from "..components/SearchBar"; // Import SearchBar

const items = [
  { id: 1, name: "Black Wallet", status: "Lost", location: "Library" },
  { id: 2, name: "Red Umbrella", status: "Found", location: "Cafeteria" },
  { id: 3, name: "iPhone 13", status: "Lost", location: "Gym" },
];

const HomePage = () => {
  const [filteredItems, setFilteredItems] = useState(items);

  const filterItems = (query) => {
    if (query === "") {
      setFilteredItems(items);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="container">
      <h1 className="center mt-6 mb-6">Lost & Found Items</h1>

      {/* Search bar component */}
      <SearchBar filterItems={filterItems} />

      {/* Display items */}
      <div className="mt-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="card mt-6">
            <div className="card-content">
              <h2 className="card-title">{item.name}</h2>
              <p className="card-text">Status: {item.status}</p>
              <p className="card-text">Location: {item.location}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6">Report an Item</button>
    </div>
  );
};

export default HomePage;
