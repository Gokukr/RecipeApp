import React from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Footer from "./components/Footer";
// import Card from "./components/Card";
import RecipeContainer from "./components/RecipeContainer";

import {getSavedRecipesById} from './api';

function App() {
  const [recipes,setRecipes] = React.useState([]);

  const getRecipes = async () => {
    const res = await getSavedRecipesById('b7878c9e-12b4-44bd-8eac-c0556ae67bef');
    setRecipes(res);
  }
  React.useEffect(() => {
    getRecipes()
  },[]);

  // debugger;

  return (
    <div className="App">
      <Header />
      <div>
        <Search />
        <RecipeContainer
          data = {recipes.data.recipe}
        />
      </div>    
      <Footer />
    </div>
  );
}

export default App;
