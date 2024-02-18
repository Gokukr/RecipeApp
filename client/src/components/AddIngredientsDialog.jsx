import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddIngredientsDialog = ({ existingIngredients, onClose }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientCategory, setIngredientCategory] = useState("");
  const [error, setError] = useState("");

  const notify = (message) => toast(message);

  const addIngredients = async () => {
    if (!ingredientName || !ingredientCategory) {
      setError("Please fill out all fields.");
      return false;
    }
    if (existingIngredients.includes(ingredientName)) {
      setError("Ingredient already exists!");
      return false;
    }
    try {
      await axios.post("http://localhost:1200/api/manage/ingredients/add", {
        ingredientName: ingredientName,
        category: ingredientCategory,
      });
      notify("Ingredient added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding new ingredient", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addIngredients();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-darkslategray-300 p-6 rounded-md">
        <h2 className="text-whitesmoke font-semibold mb-4">
          Add new ingredient
        </h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-whitesmoke font-open-sans">
              Name of the ingredient
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="ingredientName"
                id="ingredientName"
                autoComplete="ingredientName"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={ingredientName}
                onChange={(e) =>
                  setIngredientName(
                    e.target.value
                      .toLowerCase()
                      .replace(/\b\w/g, (s) => s.toUpperCase())
                  )
                }
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-whitesmoke font-open-sans">
              Category
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="ingredientCategory"
                id="ingredientCategory"
                autoComplete="ingredientCategory"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={ingredientCategory}
                onChange={(e) => setIngredientCategory(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-whitesmoke text-darkslategray-300 px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-darkslategray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIngredientsDialog;
