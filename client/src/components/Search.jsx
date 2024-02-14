// Search.js
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Container from "./Container";
import Card from "./Card";
import data from "../data";
import applyFilters from "./Filter";
import { useEffect } from "react";


const Search = () => {
  const[role,SetRole] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    mealType: "",
    course: "",
    cuisine: "",
    minRating: 0,
  });
  const handleSearch = (query) => {
    if (query.trim() !== "") {
      const filteredData = data.filter((recipe) =>
        recipe.foodName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredData);
    } else {
      setSearchResults([]);
    }
  };

  const handleFilter = (filters) => {
    setFilterOptions(filters);
    applyFiltersAndSetResults(filters);
  };

  const applyFiltersAndSetResults = (filters) => {
    const filteredData = applyFilters(data, filters);
    setSearchResults(filteredData);
  };
  useEffect(() =>
{
  SetRole("user");
},[]) 

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-26 max-w-full text-center text-13xl text-darkslategray-100 font-open-sans relative">
    {role === 'admin' && (
    <div className="absolute top-0 right-0 mr-4 mt-4">
    <button className="bg-darkslategray-100 hover:darkslategray-80 text-white font-bold py-2 px-4 rounded">Add Recipe</button>
    </div>
    )}
  
    <div className="inline-block mq450:text-lgi mq750:text-7xl mt-8">
      <b>Explore</b>
      <span>{` `}</span>
      <b>{`variety of Cuisines `}</b>
    </div>
    <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
    <Container>
      {searchResults.map((recipe, index) => (
        <Card key={index} {...recipe} />
      ))}
    </Container>
  </div>
  
  
  );
};

export default Search;
