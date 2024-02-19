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
      <div className="mx-30p my-2 sm:my-10 px-4 py-6 rounded-xl bg-gray-300">
        {recipe ? (
          <div>
            <div className="mx-5 flex items-center px-8 py-6 flex flex-row bg-gradient-to-r from-slate-400 to-slate-900 w-[95%] rounded-xl">
              <img
                src={recipe.image}
                alt="RecipeIMG"
                width={250}
                height={250}
                className="rounded-lg"
              />
              <div className="w-90p pl-7 text-yellow-500 text-left">
                <h2 className="font-bold text-[30px]">{recipe.title}</h2>
                <p className="pl-5 text-[20px]">
                  {recipe.cuisine}, {recipe.meal_type}, {recipe.courseType}
                </p>
                <p className="pl-5 text-[20px]">
                  Total Time: {recipe.time} mins
                </p>
                <div className="pl-5 text-[20px] tracking-wide">
                  Rating:
                  {Array.from(
                    { length: Math.floor(recipe.rating) },
                    (_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill text-yellow-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    )
                  )}
                </div>
                <p className="pl-5 text-[20px]">
                  Difficulty: {recipe.difficulty}
                </p>
              </div>
            </div>
            {userRole === "admin" && (
              <div className="flex justify-end gap-4 mt-4s">
                <button
                  onClick={handleEdit}
                  className="mt-3 bg-blue-500 text-white ml-4 text-[20px] px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                {showDeleteModal && <DeleteRecipe recipeId={recipeId} />}
                <button
                  onClick={handleDelete}
                  className="mt-3 bg-red-500 text-white mr-4 text-[20px] px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}

            {}
            <button
              onClick={handleAddToFavourites}
              className="bg-green-300 text-white ml-5 text-[20px] px-4 py-2 rounded-md hover:bg-green-700 mt-4"
            >
              Add to Favourites
            </button>
            <div className="text-3xl tracking-wide">
              <p className="leading-8 ml-5 mt-4 text-3xl rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                <b className="text-yellow-500 ">Description: </b>
                {recipe.description}
                <br />
                <b className="text-yellow-500 ">Preparation Time:</b>
                {recipe.preparationTime} mins
                <br />
                <b className="text-yellow-500 ">Cooking Time:</b>
                {recipe.cookingTime} mins
                <br />
                <b className="text-yellow-500 ">Servings:</b> {recipe.servings}
              </p>
              <div className="ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] px-5 py-3 ">
                <h3 className="text-yellow-500 font-bold">Ingredients:</h3>
                <div className="leading-8 ml-5 mt-4 rounded-lg w-[95%] px-5 py-3 bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  {Array.isArray(recipe.ingredients) ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="border rounded-lg">
                        {ingredient}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 border rounded-lg">
                      No ingredients available
                    </div>
                  )}
                </div>
              </div>

              <div className="ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] px-5 py-3 ">
                <h3 className="text-yellow-500 font-bold">Instructions:</h3>
                <ol className="leading-8 ml-5 mt-4 rounded-lg bg-gray-100 w-[95%] pl-10 pr-0 py-3">
                  {Array.isArray(recipe.instructions) &&
                  recipe.instructions.length > 0 ? (
                    recipe.instructions.map((step, index) => (
                      <li key={index} className="py-1">
                        {step}
                      </li>
                    ))
                  ) : (
                    <li>No instructions available</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <p className="ml-5 mt-4 rounded-lg bg-gray-100 w-[85%] px-10 py-4">
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
