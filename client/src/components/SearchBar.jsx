import React, { useState } from "react";
import search from "../assets/Search.png";
import FilterDialog from "./FilterDialog";

const SearchBar = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState("");
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <div className="relative">
      <div className="flex items-end justify-between gap-8 max-w-full mt-8">
        <form
          className={`rounded-3xs bg-darkslategray-300 flex flex-row items-end justify-start pt-[13px] pb-3.5 pr-4 pl-9 box-border ${
            isSearchFocused ? "border-none" : ""
          }`}
        >
          <input
            className="font-open-sans text-base bg-transparent text-whitesmoke w-72 outline-none border-none"
            placeholder="Search"
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />

          {/* <button type="submit">
            <img className="h-[23px] w-[22.7px]" alt="" src={search} />
          </button> */}
        </form>
        <FilterButton onClick={handleFilterClick} />
      </div>
      {showFilterDialog && (
        <FilterDialog onClose={handleCloseFilterDialog} onApply={onFilter} />
      )}
    </div>
  );
};

const FilterButton = ({ onClick }) => {
  return (
    <button
      className="bg-darkslategray-300 hover:bg-darkslategray-500 text-white font-open-sans py-2 px-4 rounded-lg mt-8 "
      onClick={onClick}
    >
      Filter
    </button>
  );
};

export default SearchBar;
