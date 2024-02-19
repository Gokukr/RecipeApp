import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./index.css";
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

  const handleAddToFavourites = () => {
    // const userId='cded7396-c732-11ee-993a-505a65b0ab55';
    try {
      const res = axios.post(
        `http://localhost:1200/api/${userId}/save-a-recipe`,
        { recipeId: recipeId, date: new Date() }
      );
      console.log(res);
      //   const { data: isFavourite } = axios.get(
      //     `http://localhost:1200/api/detail/favourites/${userId}/${recipeId}`
      //   );

      //   if (!isFavourite) {
      //     // Recipe is not already a favourite, proceed with adding:
      //     axios.post(
      //       `http://localhost:1200/api/detail/favourites/${userId}/${recipeId}`
      //     );
      //     console.log("Recipe added to favourites successfully.");
      //   } else {
      //     console.log("Recipe already exists in favourites.");
      //   }
    } catch (error) {
      console.error("Error checking or adding recipe to favourites:", error);
    }
  };

  return (
    <>
      <Header />
      <div class="mx-30p my-2 sm:my-10 px-4 py-6 rounded-xl bg-gray-300">
        {recipe ? (
          <div>
            <div class="mx-5 px-8 py-6 flex flex-row bg-gradient-to-r from-white to-slate-900 w-[95%] rounded-xl">
              <img
                src={recipe.image}
                alt="RecipeIMG"
                class="w-48 h-36 rounded-lg"
              />
              <div class="w-90p pl-5 text-yellow-500 text-left">
                <h2 class="font-bold p-5 text-[20px]">{recipe.title}</h2>
                <p class="pl-5 text-[15px]">{recipe.cuisine}</p>
                <p class="pl-5 text-[15px]">{recipe.meal_type}</p>
              </div>
            </div>
            {userRole === "admin" && (
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white ml-4 font-medium px-4 py-2 rounded-md hover:bg-blue-700"
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
            <button
              onClick={handleAddToFavourites}
              className="bg-green-300 text-white ml-5 font-medium px-4 py-2 rounded-md hover:bg-green-700 mt-4"
            >
              Add to Favourites
            </button>
            <div class="">
              <p class="ml-5 mt-4  rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                Rating: {recipe.rating}
              </p>
              <p class="ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                Difficulty: {recipe.difficulty}
              </p>
              <p class="ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                Cooking Time: {recipe.time} mins
              </p>
              <h3 class="ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] px-5 py-3 text-yellow-500 font-bold">
                Ingredients:
              </h3>
              <ol class="ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                {Array.isArray(recipe.ingredients) ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <li>
                      {index} : {ingredient}
                    </li>
                  ))
                ) : (
                  <li>No ingredients available</li>
                )}
              </ol>

              <h3 class="ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] px-5 py-3 text-yellow-500 font-bold">
                Instructions:
              </h3>
              <p class="ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                {recipe.instructions}
              </p>
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
    </>
  );
}

export default Detailrecipe;
