// SearchBar.js
import React, { useState } from "react";
// import search from "../assets/Search.png";
import FilterDialog from "./FilterDialog";

const SearchBar = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState("");
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    onSearch(inputValue);
  };

  const handleFilterClick = () => {
    setShowFilterDialog(true);
  };

  const handleCloseFilterDialog = () => {
    setShowFilterDialog(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <form className="w-[280px] align-items-center  rounded-3xs bg-darkslategray-300 flex flex-shrink-0 flex-row items-end justify-between box-border max-w-full h-12">
      <input
        className="w-[280px] h-4 p-4 rounded-3xs focus:outline-none font-open-sans text-base bg-transparent text-whitesmoke flex-grow-1"
        placeholder="Search"
        type="text"
        value={query}
        onChange={handleChange}
      />
      </form>
      <FilterButton onClick={handleFilterClick} />
      {showFilterDialog && (
        <FilterDialog onClose={handleCloseFilterDialog} onApply={onFilter} />
      )}
    </div>
  );
};

const FilterButton = ({ onClick }) => {
  return (
    <button
      className="ml-auto bg-darkslategray-300 hover:bg-darkslategray-500 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      Filter
    </button>
  );
};

export default SearchBar;