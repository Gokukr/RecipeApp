import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
// import AddIngredientsDialog from "./AddIngredientsDialog";
// import IngredientCheckbox from "./IngredientCheckbox";
import "react-toastify/dist/ReactToastify.css";
import data from "../data.json";

const ManageRecipes = ({ handleSubmit, recipe }) => {
  const Navigate = useNavigate();

  const { difficultyLevels, courseTypes, cuisineTypes } = data;
  const [name, setName] = useState(recipe ? recipe.title : "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );
  const [imageUrl, setImageUrl] = useState(recipe ? recipe.image : "");

  const [preparationTime, setPreparationTime] = useState(
    recipe ? recipe.preparationTime : ""
  );
  const [cookingTime, setCookingTime] = useState(
    recipe ? recipe.cookingTime : ""
  );
  const [servings, setServings] = useState(recipe ? recipe.servings : "");
  const [difficultyLevel, setDifficultyLevel] = useState(
    recipe ? recipe.difficulty : difficultyLevels[0]
  );
  const [cuisineType, setCuisineType] = useState(
    recipe ? recipe.cuisine : cuisineTypes[0]
  );
  const [mealType, setMealType] = useState(
    recipe ? recipe.meal_type : "Non-veg"
  );
  const [courseType, setCourseType] = useState(
    recipe ? recipe.courseType : courseTypes[0]
  );
  const [instructions, setInstructions] = useState(
    recipe ? recipe.instructions : [""]
  );
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients : [""]
  );
  // const [ingredients, setIngredients] = useState([]);
  // const [selectedIngredients, setSelectedIngredients] = useState(
  //   recipe ? recipe.ingredients : []
  // );
  // useEffect(() => {
  //   fetchIngredients();
  // }, []);

  // const fetchIngredients = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:1200/api/manage/ingredients"
  //     );
  //     setIngredients(response.data);
  //   } catch (error) {
  //     console.error("Error fetching ingredients", error);
  //   }
  // };

  // const [showAddIngredientDialog, setshowAddIngredientDialog] = useState(false);
  // const handleAddIngredient = () => {
  //   setshowAddIngredientDialog(true);
  //   fetchIngredients();
  // };

  // const handleCloseDialog = () => {
  //   setshowAddIngredientDialog(false);
  //   fetchIngredients();
  // };

  // const handleIngredientChange = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedIngredients([...selectedIngredients, value]);
  //   } else {
  //     setSelectedIngredients(
  //       selectedIngredients.filter((ingredient) => ingredient !== value)
  //     );
  //   }
  // };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
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
    const selectedIngredients = ingredients;
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
    <div className="bg-bg py-20">
      <div className="lg:mx-32 md:mx-28 sm:mx-20 xs:mx-10 font-sans bg-white drop-shadow-2xl tracking-wider sm:tracking-normal">
        <form onSubmit={handleFormSubmit} className=" xs:p-10 lg:p-20 mr-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="grid xs:grid-cols-1 lg:grid-cols-6 gap-x-12 gap-y-8 md:grid-cols-1 md:gap-7 sm:grid-cols-1">
                <div className="md:col-span-2 sm:col-span-2 lg:col-span-5 xs:col-span-2">
                  <label
                    htmlFor="recipename"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Recipe Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="recipename"
                      id="recipename"
                      autoComplete="recipename"
                      className="block w-full box-border border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6 bg-textbg"
                      placeholder="Recipe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 lg:col-span-1 flex items-center space-x-3 md:col-span-2 sm:col-span-2 xs:col-span-2">
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

                <div className="col-span-2">
                  <label
                    htmlFor="preparation-time"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Preparation Time (mins)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="preparation-time"
                      autoComplete="preparation-time"
                      id="preparation-time"
                      className="block w-full box-border border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6 bg-textbg"
                      value={preparationTime}
                      onChange={(e) => setPreparationTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="cooking-time"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
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
                      className="block w-full box-border border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6 bg-textbg"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="servings"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Servings
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="servings"
                      id="servings"
                      autoComplete="servings"
                      className="block w-full box-border border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6 bg-textbg"
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="cuisine-type"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Cuisine Type
                  </label>
                  <div className="mt-2">
                    <select
                      name="cuisine-type"
                      id="cuisine-type"
                      className="cursor-pointer block w-full border-0 py-1.5 text-gray-900 font-sans shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6 bg-textbg"
                      value={cuisineType}
                      onChange={(e) => setCuisineType(e.target.value)}
                    >
                      {cuisineTypes.map((cuisineType) => (
                        <option value={cuisineType}> {cuisineType}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="course-type"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Course Type
                  </label>
                  <div className="mt-2">
                    <select
                      name="course-type"
                      id="course-type"
                      className="cursor-pointer block w-full border-0 font-sans py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6 bg-textbg"
                      value={courseType}
                      onChange={(e) => setCourseType(e.target.value)}
                    >
                      {courseTypes.map((courseType) => (
                        <option value={courseType}> {courseType}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="difficulty"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Difficulty Level
                  </label>
                  <div className="mt-2">
                    <select
                      className="cursor-pointer block w-full border-0 font-sans py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-100 sm:text-sm sm:leading-6 bg-textbg"
                      value={difficultyLevel}
                      onChange={(e) => setDifficultyLevel(e.target.value)}
                    >
                      {difficultyLevels.map((level) => (
                        <option value={level}> {level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="lg:col-span-6 md:col-span-2 sm:col-span-2 xs:col-span-2">
                  <label
                    htmlFor="image"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    autoComplete="image"
                    className="block w-full box-border border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-textbg focus:ring-primary-100 sm:text-sm sm:leading-6 placeholder:font-sans"
                    placeholder="https://www.image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="lg:col-span-6 md:col-span-2 sm:col-span-2 xs:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      autoComplete="description"
                      rows={3}
                      className="block w-full box-border border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-textbg focus:ring-primary-100 sm:text-sm sm:leading-6 placeholder:font-sans"
                      placeholder="Some information about the recipe, maybe some tips."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 md:col-span-2 sm:col-span-2 xs:col-span-2">
                  <label
                    htmlFor="ingredients"
                    className="block text-sm text-text font-medium leading-6 text-gray-900"
                  >
                    Ingredients
                  </label>
                  {/* <div className="mt-2 flex flex-wrap">
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
                  </div> */}
                  <div className="mt-2">
                    {ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="mb-5 p-1 ring-1 ring-inset ring-gray-300 shadow-sm bg-textbg hover:ring-2 hover:ring-inset hover:ring-primary-100 sm:text-sm sm:leading-6 placeholder:font-san"
                      >
                        <div className="relative">
                          <input
                            type="text"
                            value={ingredient}
                            className="block w-11/12 py-1.5 px-3 border-0 pl-3 text-gray-900 placeholder:text-gray-400 bg-textbg sm:text-sm sm:leading-6 placeholder:font-sans focus:ring-0"
                            onChange={(e) =>
                              handleIngredientChange(index, e.target.value)
                            }
                            required
                          />
                          <div className="absolute inset-y-0 right-5 pl-3 flex items-center ">
                            <button
                              type="button"
                              className="bg-textbg "
                              onClick={() => handleRemoveIngredient(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#FF095C"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2 xs:col-span-2">
                  <button
                    type="button"
                    className="cursor-pointer bg-white w-full px-2 py-3 hover:bg-primary-100 hover:text-white text-black font-bold border border-text shadow-3xl"
                    // onClick={handleAddIngredient}
                    onClick={handleAddIngredient}
                  >
                    Add Ingredient
                  </button>
                  {/* {showAddIngredientDialog && (
                    <AddIngredientsDialog
                      existingIngredients={ingredients.map(
                        (ingredient) => ingredient.ingredient_name
                      )}
                      onClose={handleCloseDialog}
                    />
                  )} */}
                </div>

                <div className="mt-3 lg:col-span-6 md:col-span-2 sm:col-span-2 xs:col-span-2">
                  <label className="block text-sm text-text font-medium leading-6 text-gray-900">
                    Instructions
                  </label>
                  <div className="mt-2">
                    {instructions.map((instruction, index) => (
                      <div
                        key={index}
                        className="mb-5 p-1 ring-1 ring-inset ring-gray-300 shadow-sm bg-textbg hover:ring-2 hover:ring-inset hover:ring-primary-100 sm:text-sm sm:leading-6 placeholder:font-san"
                      >
                        <div className="relative">
                          <input
                            type="text"
                            value={instruction}
                            className="block w-11/12 py-1.5 px-3 border-0 pl-3 text-gray-900 placeholder:text-gray-400 bg-textbg sm:text-sm sm:leading-6 placeholder:font-sans focus:ring-0"
                            onChange={(e) =>
                              handleInstructionChange(index, e.target.value)
                            }
                            required
                          />
                          <div className="absolute inset-y-0 right-5 pl-3 flex items-center ">
                            <button
                              type="button"
                              className="bg-textbg "
                              onClick={() => handleRemoveInstruction(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#FF095C"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-1 md:col-span-2 sm:col-span-2 xs:col-span-2">
                  <button
                    type="button"
                    className="cursor-pointer bg-white w-full px-5 py-3 hover:bg-primary-100 text-black font-bold border border-text shadow-3xl"
                    onClick={handleAddInstruction}
                  >
                    Add Step
                  </button>
                </div>
                <div className="lg:col-span-6"></div>
                <button
                  type="button"
                  className="text-white font-semibold leading-6 px-10 py-2 bg-gray-400 hover:text-black cursor-pointer lg:col-span-3 md:col-span-2 sm:col-span-2 shadow-md font-sans text-base xs:col-span-2"
                  onClick={() => {
                    Navigate(-1);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-100 font-semibold text-white hover:bg-primary-300 px-10 py-2 shadow-md cursor-pointer lg:col-span-3 md:col-span-2 sm:col-span-2 font-sans text-base xs:col-span-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageRecipes;
