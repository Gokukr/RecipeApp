import React from "react";
import axios from "axios";
import ManageRecipes from "./ManageRecipes";
import Header from "./Header";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

const UpdateRecipe = () => {
  const location = useLocation();
  const recipe = location.state.recipe;

  const Navigate = useNavigate();
  const id = recipe.id;

  const updateRecipe = async (recipe) => {
    const notify = (message) => toast(message);

    const updatedRecipe = { ...recipe, id };
    try {
      const response = await axios.put(
        "http://localhost:1200/api/manage/update",
        updatedRecipe
      );
      notify("Recipe updated successfully!");
      setTimeout(() => {
        Navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };
  return (
    <div>
      <Header />
      <ToastContainer />
      <ManageRecipes handleSubmit={updateRecipe} recipe={recipe} />
      <Footer />
    </div>
  );
};
export default UpdateRecipe;
