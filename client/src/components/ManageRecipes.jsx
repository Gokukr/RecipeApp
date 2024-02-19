import React, { useState, useEffect } from "react";
import axios from "axios";
import AddIngredientsDialog from "./AddIngredientsDialog";
import IngredientCheckbox from "./IngredientCheckbox";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ManageRecipes = ({ handleSubmit, recipe, back }) => {
  const [name, setName] = useState(recipe ? recipe.title : "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );
  const [imageUrl, setImageUrl] = useState(recipe ? recipe.image : "");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(
    recipe ? recipe.ingredients : []
  );
  const [preparationTime, setPreparationTime] = useState(
    recipe ? recipe.preparationTime : ""
  );
  const [cookingTime, setCookingTime] = useState(
    recipe ? recipe.cookingTime : ""
  );
  const [servings, setServings] = useState(recipe ? recipe.servings : "");
  const [difficultyLevel, setDifficultyLevel] = useState(
    recipe ? recipe.difficulty : "Beginner"
  );
  const [cuisineType, setCuisineType] = useState(
    recipe ? recipe.cuisine : "north Indian"
  );
  const [mealType, setMealType] = useState(
    recipe ? recipe.meal_type : "Non-veg"
  );
  const [courseType, setCourseType] = useState(
    recipe ? recipe.courseType : "Juice"
  );
  const [instructions, setInstructions] = useState(
    recipe ? recipe.instructions : [""]
  );

  const difficultyLevels = [
    "Beginner",
    "Easy",
    "Intermediate",
    "Advanced",
    "Expert",
  ];

  const courseTypes = [
    "Juice",
    "Dessert",
    "Gravy",
    "Main Course",
    "Salad",
    "Starter",
    "Snack",
    "Soup",
  ];

  const cuisineTypes = [
    "north Indian",
    "Continental",
    "Chinese",
    "Japanese",
    "Italian",
  ];

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1200/api/manage/ingredients"
      );
      setIngredients(response.data);
    } catch (error) {
      console.error("Error fetching ingredients", error);
    }
  };

  const [showAddIngredientDialog, setshowAddIngredientDialog] = useState(false);
  const handleAddIngredient = () => {
    setshowAddIngredientDialog(true);
    fetchIngredients();
  };

  const handleCloseDialog = () => {
    setshowAddIngredientDialog(false);
    fetchIngredients();
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIngredients([...selectedIngredients, value]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((ingredient) => ingredient !== value)
      );
    }
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const recipeSubmit = {
      name,
      description,
      imageUrl,
      selectedIngredients,
      instructions,
      preparationTime,
      cookingTime,
      servings,
      difficultyLevel,
      cuisineType,
      mealType,
      courseType,
    };
    handleSubmit(recipeSubmit);
  };
  return (
    <div className="m-10">
      <ToastContainer />
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="recipename"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name of the recipe
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="recipename"
                    id="recipename"
                    autoComplete="recipename"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Recipe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="px-10 sm:col-span-2 flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Non-veg
                </span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={mealType}
                    checked={mealType === "Veg" ? true : false}
                    className="sr-only peer"
                    onChange={(e) => {
                      setMealType(e.target.checked ? "Veg" : "Non-veg");
                    }}
                  />
                  <div className="relative w-11 h-6 bg-red-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span className="pl-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Veg
                  </span>
                </label>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    autoComplete="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  autoComplete="image"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="https://www.image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="preparation-time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Preparation Time (mins)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="preparation-time"
                    autoComplete="preparation-time"
                    id="preparation-time"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={preparationTime}
                    onChange={(e) => setPreparationTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="cooking-time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cooking Time (mins)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    autoComplete="cooking-time"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    name="cooking-time"
                    id="cooking-time"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="servings"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Servings
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="servings"
                    id="servings"
                    autoComplete="servings"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="cuisine-type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cuisine Type
                </label>
                <div className="mt-2">
                  <select
                    name="cuisine-type"
                    id="cuisine-type"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={cuisineType}
                    onChange={(e) => setCuisineType(e.target.value)}
                  >
                    {cuisineTypes.map((cuisineType) => (
                      <option value={cuisineType}> {cuisineType}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="course-type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course Type
                </label>
                <div className="mt-2">
                  <select
                    name="course-type"
                    id="course-type"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={courseType}
                    onChange={(e) => setCourseType(e.target.value)}
                  >
                    {courseTypes.map((courseType) => (
                      <option value={courseType}> {courseType}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Difficulty Level
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                  >
                    {difficultyLevels.map((level) => (
                      <option value={level}> {level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredients
                </label>
                <div className="mt-2 flex flex-wrap">
                  {ingredients.map((ingredient) => (
                    <IngredientCheckbox
                      key={ingredient.id}
                      ingredient={ingredient}
                      isChecked={selectedIngredients.includes(
                        ingredient.ingredient_name
                      )}
                      onChange={handleIngredientChange}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="flex items-center mx-auto bg-darkslategray-300 hover:bg-darkslategray-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddIngredient}
                >
                  Add
                </button>
                {showAddIngredientDialog && (
                  <AddIngredientsDialog
                    existingIngredients={ingredients.map(
                      (ingredient) => ingredient.ingredient_name
                    )}
                    onClose={handleCloseDialog}
                  />
                )}
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Instructions
                </label>
                <div className="mt-2">
                  {instructions.map((instruction, index) => (
                    <div key={index}>
                      <div className="flex">
                        <label className="block m-1 text-sm font-medium leading-6 text-gray-600">
                          Step{index + 1}:
                        </label>
                        <button
                          type="button"
                          className="bg-gainsboro px-3 "
                          onClick={() => handleRemoveInstruction(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={instruction}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          handleInstructionChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-3 p-2 bg-gainsboro px-3"
                  onClick={handleAddInstruction}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="#2c3e50"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </button>
              </div>

              <div className="col-span-full">
                <div className="mt-6 flex items-center justify-center gap-x-6">
                  <button
                    type="button"
                    className="rounded-md text-base font-semibold leading-6 text-darkslategray-300 shadow-md px-10 py-2 hover:bg-red-600 hover:text-zinc-950 bg-white"
                    onClick={() => {
                      window.location = back;
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-darkslategray-300 px-10 py-2 text-base font-semibold text-white shadow-md hover:text-zinc-950 hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageRecipes;
