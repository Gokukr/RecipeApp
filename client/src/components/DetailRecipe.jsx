import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "./Rating";
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DeleteRecipe from "./DeleteRecipe";
function Detailrecipe() {
  const { recipeId } = useParams();
  const userId = Cookies.get("user_id");
  const [userRole, setUser] = useState(null);
  // userId = 'cded7396-c732-11ee-993a-505a65b0ab55';
  useEffect(() => {
    const url = `http://localhost:1200/api/detail/user-profile/${userId}`;
    axios.get(url).then((response) => {
      setUser(response.data.role);
    });
  }, [userId]);
  const [recipe, setRecipe] = useState(null);
  // recipeId='8b66b170-321d-4b45-8e6d-1cb53221fa11';
  useEffect(() => {
    axios
      .get(`http://localhost:1200/api/detail/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
      });
  }, [recipeId]);

  //   const count = {recipe.count};

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/edit-recipe", { state: { recipe } });
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const [fav, setfav]=useState(false);
  useEffect(() => {
    
      axios.get(`http://localhost:1200/api/detail/favourites/${userId}/${recipeId}`)
      .then((response) => {
        setfav(response.data.fav);
      });
  },[userId,recipeId]);
  console.log(fav);
  const handleAddToFavourites = () => {
    // const userId='cded7396-c732-11ee-993a-505a65b0ab55';
    try {
      const res = axios.post(
        `http://localhost:1200/api/${userId}/save-a-recipe`,
        { recipeId: recipeId, date: new Date() }
      );
      console.log(res);
    } catch (error) {
      console.error("Error checking or adding recipe to favourites:", error);
    }
  };

  return (
    <div class="bg-white">
      <Header />
      <div class=" mx-10 mb-2 sm:my-10 px-4 py-6 rounded-xl bg-white">
        {recipe ? (
          <div>
            <div class="mx-5 px-6 py-6 flex flex-row justify-between bg-gradient-to-r from-slate-100 to-slate-400 w-[95%] rounded-xl">
              <img
                src={recipe.image}
                alt="RecipeIMG"
                class="w-48 h-36 rounded-lg"
              />
              <div class="pl-5 text-black text-left mr-40">
                <h2 class="font-bold p-5 text-[20px]">{recipe.title}</h2>
                <p class="font-bold p-5 text-[20px]">{recipe.description}</p>
                <p class="rounded-lg px-5 py-3 font-bold text-[20px]">
                Rating: {recipe.rating}
                </p>
              </div>
              <button
              onClick={handleAddToFavourites}
              className="bg-transparent text-white ml-5 font-medium px-5  mb-24 pb-20"
            >
              <svg  width="18" height="18" viewBox="0 0 16 16" fill="#ffffff">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
              stroke="black"
              fill={fav ? "#ffffff" :"#FF0000"}     
              />
            </svg>
            </button>
            </div>
            {userRole === "admin" && (
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleEdit}
                  className="bg-[#3498db] text-white ml-4 font-medium px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                {showDeleteModal && <DeleteRecipe recipeId={recipeId} />}
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white mr-4 font-medium px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}

            {}
            
            
            <div class="flex justify-between bg-gray-100 ml-5 mt-5 font-medium px-4 py-2 rounded-md border-solid border-2 border-gray-500">
              <div class=" text-black pl-40 w-full">
                <h3>Servings</h3>
                <p>{recipe.servings}</p>             
              </div>
              <div class="text-black pl-40 w-full">
                <h3>Preparation Time</h3>
                <p>{recipe.preparationTime} MINS</p>
              </div>
              <div class="text-black pl-40 w-full">
                <h3>Cooking Time</h3>
                <p>{recipe.cookingTime} MINS</p>
              </div>
            </div>
            <div class="flex justify-between bg-gray-100 ml-5 mt-5 font-medium px-4 py-2 rounded-md border-solid border-2 border-gray-500">
              <div class=" text-black pl-40 w-full">
                <h3>Cuisine</h3>
                <p>{recipe.cuisine}</p>             
              </div>
              <div class="text-black pl-40 w-full">
                <h3>Meal_type</h3>
                <p>{recipe.meal_type}</p>
              </div>
              <div class="text-black pl-40 w-full">
                <h3>Difficulty</h3>
                <p>{recipe.difficulty}</p>
              </div>
            </div>
            <div class="ml-5 mt-4 rounded-lg bg-gray-100 px-5 py-3 text-black font-bold border-solid border-2 border-gray-500">
              <h3>
                Ingredients
                </h3>
              <ol class="ml-5 mt-4 rounded-lg bg-gray-100 px-5 py-3 font-medium ">
                {Array.isArray(recipe.ingredients) ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <li>
                      {ingredient}
                    </li>
                  ))
                  ) : (
                    <li>No ingredients available</li>
                    )}
              </ol>
            </div>
            <div class="ml-5 mt-4 rounded-lg bg-gray-100 px-5 py-3 text-black font-bold border-solid border-2 border-gray-500">

              <h3>
                Instructions
                </h3>
              <ol class="ml-5 mt-4 rounded-lg bg-gray-100 px-5 py-3 font-medium">
                {Array.isArray(recipe.instructions) ? (
                  recipe.ingredients.map((instruction, index) => (
                    <li>
                      {instruction}
                    </li>
                  ))
                ) : (
                  <li>No ingredients available</li>
                )}
              </ol>
            </div>
          </div>
        ) : (
          <p class="ml-5 mt-4 rounded-lg bg-gray-100 w-[85%] px-10 py-4">
            Loading...
          </p>
        )}
        <Rating recipeId={recipeId} />
      </div>
      <Footer />
    </div>
  );
}

export default Detailrecipe;
