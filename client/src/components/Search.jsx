import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
// import Container from "./Container";
// import Card from "./Card";
// import FilterDialog from "./FilterDialog";
// import applyFilters from "./Filter";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
// import RecipeContainer from "./RecipeContainer";

const Search = ({ allRecipe, setData = (a) => a }) => {
  const [role, setRole] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [filterOptions, setFilterOptions] = useState({
  //   cuisine: [],
  //   mealType: [],
  //   courseType: [],
  //   rating: [],
  // });
  // const [showFilterDialog, setShowFilterDialog] = useState(false);
  // const [searchUsed, setSearchUsed] = useState(false);
  // const [originalData, setOriginalData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1200/api/recipes/all");
      setSearchResults(response.data.rows);
      // setOriginalData(response.data); // Store original data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (
    query = "",
    filters = {
      cuisine: [],
      mealType: [],
      courseType: [],
      rating: [],
    }
  ) => {
    try {
      const queryString = (filter, arr) =>
        arr.map((item) => `${filter}=${item}`).join("&");
      const res = await axios.get(
        `http://localhost:1200/api/recipes/all?searchText=${query}&${queryString(
          "rating",
          filters.rating
        )}&${queryString("mealType", filters.mealType)}&${queryString(
          "course",
          filters.courseType
        )}&${queryString("cuisine", filters.cuisine)}`
      );
      // debugger;
      setSearchResults(res.data.rows);
      // JSON.stringify(res.data.rows) === JSON.stringify(b) ? allRecipe(false) : allRecipe(true);
      // debugger;
      setData(res.data.rows);
      // return res.rows;
    } catch (error) {
      console.log(error);
    }

    // if (query.trim() !== "") {
    //   setSearchUsed(true);
    //   try {
    //     const response = await axios.get("http://localhost:1200/api/getdata");
    //     // const searchData = response.data.filter((recipe) =>
    //     //   recipe.name.toLowerCase().includes(query.toLowerCase())
    //     // );
    //     // setSearchResults(searchData);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // } else {
    //   setSearchResults(originalData); // Reset to original data when search query is empty
    //   setSearchUsed(false);
    // }
  };

  // const handleFilter = (filters) => {
  //   setFilterOptions(filters);
  //   applyFiltersAndSetResults(filters);
  // };

  // const applyFiltersAndSetResults = (filters) => {
  //   const filteredData = applyFilters(originalData, filters); // Apply filters to original data
  //   setSearchResults(filteredData);
  // };

  // const handleCloseFilterDialog = () => {
  //   setShowFilterDialog(false);
  // };

  // const handleFilterClick = () => {
  //   setShowFilterDialog(true);
  // };

  useEffect(() => {
    fetchData();

    const type = Cookies.get("role");
    if (type) {
      setRole(type);
    }
    // setRole("user");
  }, []);
  // console.log(searchResults);
  // debugger;

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-26 max-w-full text-center text-13xl text-primary-100 font-open-sans relative">
      {role === "admin" && (
        <div className="absolute top-0 right-0 mr-4 mt-4">
          <Link to="/add-recipe">
            <button className="bg-primary-100 hover:cursor-pointer text-white font-open-sans py-2 px-4 rounded mt-12 mr-12 ">
              Add Recipe
            </button>
          </Link>
        </div>
      )}
      {/* <div className="inline-block mq450:text-primary-300 mq750:text-7xl mt-8">
        <b className="text-primary-300">Explore</b>
        <span>{` `}</span>
        <b className="text-primary-300">{`variety of Cuisines `}</b>
      </div> */}
      <SearchBar onSearch={handleSearch} allRecipe={allRecipe} />

      {/* <RecipeContainer data={searchResults}/> */}
      {/* {searchUsed && (
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
      )} */}
      {/* {showFilterDialog && (
        <FilterDialog
          onClose={handleCloseFilterDialog}
          onApply={handleFilter}
        />
      )} */}
    </div>
  );
};

export default Search;
