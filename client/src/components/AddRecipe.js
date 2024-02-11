import React, { useState, useEffect } from "react";
import axios from "axios";
// import { PhotoIcon } from "@heroicons/react/24/solid";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [cuisineType, setCuisineType] = useState("");
  const [mealType, setMealType] = useState("");
  const [courseType, setCourseType] = useState("");

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

  useEffect(() => {
    fetchIngredients();
    fetchCuisineTypes();
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

  const handleIngredientChange = (e) => {
    const selectedIngredientId = e.target.value;
    console.log(selectedIngredientId);
    const selectedIngredient = ingredients.find(
      (ingredient) => ingredient.id === selectedIngredientId
    );
    if (selectedIngredientId === "other") {
      const newIngredientName = prompt("Enter the name of the new ingredient:");
      const newIngredientCategory = prompt(
        "Enter the category of the new ingredient:"
      );

      if (newIngredientName && newIngredientCategory) {
        axios
          .post("http://localhost:1200/api/manage/ingredients/add", {
            ingredient_name: newIngredientName,
            category: newIngredientCategory,
          })
          .then((response) => {
            const newIngredient = response.data;
            setSelectedIngredients([...selectedIngredients, newIngredient]);
          })
          .catch((error) => {
            console.error("Error adding new ingredient", error);
          });
      }
    }
    if (selectedIngredient) {
      setSelectedIngredients([...selectedIngredients, selectedIngredient]);
    }
  };

  const fetchCuisineTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1200/api/manage/cuisines"
      );
      setCuisineTypes(response.data);
    } catch (error) {
      console.error("Error fetching cuisines", error);
    }
  };

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const newRecipe = {
      name,
      description,
      imageUrl,
      ingredients: selectedIngredients.map((ingredient) => ingredient.id),
      instruction,
      preparationTime,
      cookingTime,
      servings,
      difficultyLevel,
      cuisineType,
      mealType,
      courseType,
      // user_id,
    };

    try {
      const response = await axios.post(
        "http://localhost:1200/api/add",
        newRecipe
      );
      console.log("Recipe added:", response.data);
      setName("");
      setDescription("");
      setImageUrl("");
      setSelectedIngredients([]);
      setInstruction("");
      setPreparationTime("");
      setCookingTime("");
      setServings("");
      setDifficultyLevel("");
      setCuisineType("");
      setMealType("");
      setCourseType("");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
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
                    defaultValue={""}
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
                {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div> */}
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
                      <option key={cuisineType.id} value={cuisineType.name}>
                        {cuisineType.name}
                      </option>
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

              <div className="sm:col-span-2">
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredients
                </label>
                <div className="mt-2">
                  <select
                    onChange={handleIngredientChange}
                    name="ingredients"
                    id="ingredients"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {ingredients.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.ingredient_name}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="selected-ingredients"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Selected Ingredients
                </label>
                <div className="mt-2">
                  <ul className="text-s flex leading-5 text-gray-700">
                    {selectedIngredients
                      .filter((ingredient, index) => {
                        return (
                          selectedIngredients.indexOf(ingredient) === index
                        );
                      })
                      .map((ingredient) => (
                        <li key={ingredient.id}>
                          {ingredient.ingredient_name + " - "}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Instructions
                </label>
                <div className="mt-2">
                  <textarea
                    id="instructions"
                    name="instructions"
                    rows={7}
                    autoComplete="instructions"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-6 flex items-center justify-center gap-x-6">
                  <button
                    type="button"
                    midnight-blue
                    className="rounded-md text-base font-semibold leading-6 text-midnight-blue shadow-md px-10 py-2 hover:bg-red-600 hover:text-zinc-950 bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-midnight-blue px-10 py-2 text-base font-semibold text-white shadow-md hover:text-zinc-950 hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export default AddRecipe;
