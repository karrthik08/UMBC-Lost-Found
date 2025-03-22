// src/components/SearchBar.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa"; // Search Icon

const SearchBar = ({ filterItems }) => {
  const [query, setQuery] = useState("");

  // Function to handle search
  const handleSearch = () => {
    filterItems(query);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search lost or found items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <Button className="bg-gray-800 text-white" onClick={handleSearch}>
        <FaSearch />
      </Button>
    </div>
  );
};

export default SearchBar;
