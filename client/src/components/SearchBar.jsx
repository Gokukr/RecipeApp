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
    <div className="relative">
      <form className="w-[331px] align-items-center rounded-3xs bg-darkslategray-300 flex flex-shrink-0 flex-row items-end justify-between box-border gap-[20px] max-w-full h-12">
        <input
          className="w-[280px] h-4 p-4 rounded-3xs outline-none font-open-sans text-base bg-transparent text-whitesmoke flex-grow-1 "
          placeholder="Search"
          type="text"
          value={query}
          onChange={handleChange}
        />
        <button type="submit"  className="rounded-r-3xs p-4 h-12 w-14 pt-3 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>
        </button>
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