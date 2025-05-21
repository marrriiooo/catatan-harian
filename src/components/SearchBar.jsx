import React from "react";
import PropTypes from "prop-types";

// jadi ini bagian dimana  kita bisa mencari data dengan memasukan nama judul di kolom pencarian

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

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
