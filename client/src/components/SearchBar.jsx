// SearchBar.js
import React, { useState } from "react";
import search from "../assets/Search.png";
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
      <form className="w-[331px] rounded-3xs bg-darkslategray-300 flex flex-row items-end justify-between pt-[13px] pb-3.5 pr-4 pl-9 box-border gap-[20px] max-w-full mt-8">
        <input
          className="w-[280px] font-open-sans text-base bg-transparent text-whitesmoke"
          placeholder="Search"
          type="text"
          value={query}
          onChange={handleChange}
        />
        {/* <button type="submit">
          <img className="h-[23px] w-[22.7px]" alt="" src={search} />
        </button> */}
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
      className="ml-auto bg-darkslategray-300 hover:bg-darkslategray-500 text-white font-open-sans py-2 px-4 rounded"
      style={{ letterSpacing: "0.05em" }}
      onClick={onClick}
    >
      Filter
    </button>
  );
};

export default SearchBar;
