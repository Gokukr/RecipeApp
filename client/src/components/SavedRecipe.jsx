import React from "react";
import { useParams } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import RecipeContainer from "./RecipeContainer";
import {searchSavedRecipe} from '../api';
import SearchBar from "./SearchBar";

function SavedRecipe() {
  const { userId } = useParams();
  const [recipes,setRecipes] = React.useState([]);
  const [showAll, setShowAll] = React.useState(true);
  const [searchText,setSearchText] = React.useState("");
  const [filter, setFilter] = React.useState({
    rating : [], 
    mealType : [], 
    course : [], 
    cuisine : []
  });

  const getRecipes = async (id, text , filter) => {
    const res = await searchSavedRecipe(id, text, filter);
    setRecipes(res.data.rows);
  };

  const setItems = (txt, filter) => {
    setSearchText(txt);
    setFilter(filter);
  }

  React.useEffect(() => {
    getRecipes(userId, searchText,filter)
  },[userId, searchText,filter]);

  return (
    <div className="App">
      <Header />
      <div>
        <div className="flex-1 flex flex-col items-center justify-center gap-26 max-w-full text-center text-13xl text-darkslategray-100 font-open-sans">
          {/* <div className="inline-block mq450:text-lgi mq750:text-7xl mt-8">
            <h1>Saved Recipes</h1>
          </div> */}
          <SearchBar onSearch={setItems} allRecipe={setShowAll} placeholder={"Search aved Recipes..."}/>
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