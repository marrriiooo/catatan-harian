import React from "react";

function SearchBar({ keyword, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
