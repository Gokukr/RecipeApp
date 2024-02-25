import React from "react";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import "./index.css";
import Dashboard from "./components/Dashboard.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/user-profile.js";
import Detailrecipe from "./components/DetailRecipe.jsx";
import SavedRecipe from "./components/SavedRecipe.jsx";
import AddRecipe from "./components/AddRecipe.jsx";
import UpdateRecipe from "./components/UpdateRecipe.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserProfile />} />
          <Route
            path="user/detail-recipe/:recipeId"
            element={<Detailrecipe />}
          />
          <Route path="/api/:userId/saved-recipes" element={<SavedRecipe />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe" element={<UpdateRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
