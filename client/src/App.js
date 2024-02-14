import React from "react";
import {Routes, Route} from "react-router-dom"
import SavedRecipe from "./Pages/SavedRecipe";

function App() {
  return (
    <Routes >
      <Route path="/api/:user_id/saved-recipes" element={<SavedRecipe/>}/>
    </Routes>
  );
}

export default App;
