import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Container from "./Container";
import Card from "./Card";
import FilterDialog from "./FilterDialog";
import applyFilters from "./Filter";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    meal_type: "",
    course_type: "",
    cuisine: "",
    minRating: 0,
  });
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [searchUsed, setSearchUsed] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1200/api/getdata");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(searchResults);

  const handleSearch = async (query) => {
    if (query.trim() !== "") {
      setSearchUsed(true);
      try {
        const response = await axios.get("http://localhost:1200/api/getdata");
        const searchData = response.data.filter((recipe) =>
          recipe.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(searchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSearchResults([]);
      setSearchUsed(false);
    }
  };

  const handleFilter = (filters) => {
    setFilterOptions(filters);
    const filteredData = applyFilters(searchResults, filters);
    //console.log(filteredData);
    setSearchResults(filteredData);
  };

  const handleCloseFilterDialog = () => {
    setShowFilterDialog(false);
  };

  const handleFilterClick = () => {
    setShowFilterDialog(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-26 max-w-full text-center text-13xl text-darkslategray-100 font-open-sans relative">
      <div className="inline-block mq450:text-lgi mq750:text-7xl mt-8">
        <b>Explore</b>
        <span>{` `}</span>
        <b>{`variety of Cuisines `}</b>
      </div>
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      {searchUsed && (
        <Container>
          {searchResults.map((recipe, index) => (
            <Card
              key={index}
              foodName={recipe.name}
              imageUrl={recipe.image}
              timeTaken={`${recipe.total_time} mins`}
              id={recipe.id}
            />
          ))}
        </Container>
      )}
      {showFilterDialog && (
        <FilterDialog
          onClose={handleCloseFilterDialog}
          onApply={handleFilter}
        />
      )}
    </div>
  );
};

export default Search;
