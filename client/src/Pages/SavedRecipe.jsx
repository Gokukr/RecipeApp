import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeContainer from "../components/RecipeContainer";
import {searchSavedRecipe} from '../api';
import { useParams } from "react-router";
import SearchBar from "../components/SearchBar";

function SavedRecipe() {
  const { userId} = useParams();
  const [recipes,setRecipes] = React.useState([]);

  const handleSearch = (query) => {
    getRecipes(userId,query);
  };

  // const handleFilter = (filters) => {
  //   // setFilterOptions(filters);
  //   applyFiltersAndSetResults(filters);
  // };

  // const applyFiltersAndSetResults = (filters) => {
  //   const filteredData = applyFilters(recipes, filters);
  //   setSearchResults(filteredData);
  // };

  const getRecipes = async (id, text) => {
    const res = await searchSavedRecipe(id,text);
    setRecipes(res.data.rows);
  }
  React.useEffect(() => {
    getRecipes(userId,"")
  },[userId]);

  return (
    <div className="App">
      <Header />
      <div>
        <div className="flex-1 flex flex-col items-center justify-center gap-26 max-w-full text-center text-13xl text-darkslategray-100 font-open-sans">
          <div className="inline-block mq450:text-lgi mq750:text-7xl mt-8">
            <h1>Saved Recipes</h1>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <RecipeContainer
          data = {recipes}
        />
      </div>    
      <Footer />
    </div>
  );
}

export default SavedRecipe;
