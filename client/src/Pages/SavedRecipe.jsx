import React from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeContainer from "../components/RecipeContainer";
import {searchSavedRecipe} from '../api';
import SearchBar from "../components/SearchBar";

function SavedRecipe() {
  const { userId} = useParams();
  const [recipes,setRecipes] = React.useState([]);
  const [searchText,setSearchText] = React.useState("");
  const [filter, setFilter] = React.useState({
    rating : 0, 
    mealType : null, 
    course : null, 
    cuisine : null
  });

  const getRecipes = async (id , text , filter) => {
    const res = await searchSavedRecipe(id, text, filter);
    setRecipes(res.data.rows);
  }

  React.useEffect(() => {
    getRecipes(userId, searchText,filter)
  },[userId,searchText,filter]);

  return (
    <div className="App">
      <Header />
      <div>
        <div className="flex-1 flex flex-col items-center justify-center gap-26 max-w-full text-center text-13xl text-darkslategray-100 font-open-sans">
          <div className="inline-block mq450:text-lgi mq750:text-7xl mt-8">
            <h1>Saved Recipes</h1>
          </div>
          <SearchBar onSearch={setSearchText} onFilter={setFilter}/>
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
