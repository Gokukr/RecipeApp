import axios from "axios";
import ManageRecipes from "./ManageRecipes";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddRecipe = () => {
  const userId = Cookies.get("user_id");
  const notify = (message) => toast(message);
  const Navigate = useNavigate();

  const addRecipe = async (recipe) => {
    const newRecipe = { ...recipe, userId };
    try {
      const response = await axios.post(
        "http://localhost:1200/api/manage/add",
        newRecipe
      );
      console.log(newRecipe);
      notify("Recipe added successfully!");
      setTimeout(() => {
        Navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error adding recipe:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <ManageRecipes handleSubmit={addRecipe} />
      <Footer />
    </div>
  );
};

export default AddRecipe;
