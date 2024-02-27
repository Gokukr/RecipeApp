import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "./Rating";
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DeleteRecipe from "./DeleteRecipe";
function DetailRecipe() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const userId = Cookies.get("user_id");
  const [userRole, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() =>
  {
    const token = Cookies.get("token");
    axios
    .get("http://localhost:1200/api/is-verify", {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
    .then((response) => {
      console.log(response.data);
      setVerify(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
      navigate("/");
    });
  },[])

  useEffect(() => {
    if(verify)
    {
    const url = `http://localhost:1200/api/detail/user-profile/${userId}`;
    axios.get(url).then((response) => {
      setUser(response.data.role);
    });
  }
  }, [userId,verify]);
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    if(verify)
    {
    const isValidUUID =
      recipeId &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        recipeId
      );

    if (!isValidUUID) {
      navigate("/dashboard");
      return;
    } else {
      axios
        .get(`http://localhost:1200/api/detail/recipes/${recipeId}`)
        .then((response) => {
          setError(response.data.error);
          if (error) {
            navigate("/dashboard");
          }
          setRecipe(response.data);
        })
        .catch((error) => {
          navigate("/dashboard");
          console.error(error);
        });
    }
  }
  }, [recipeId, error, navigate,verify]);

  const handleEdit = () => {
    navigate("/edit-recipe", { state: { recipe } });
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const [fav, setfav] = useState(false);
  useEffect(() => {
  if(verify) {
    axios
      .get(`http://localhost:1200/api/detail/favourites/${userId}/${recipeId}`)
      .then((response) => {
        setfav(response.data.fav);
      });
    }
  }, [userId, recipeId]);
  console.log("value of fav is : ");
  console.log(fav);
  const handleAddToFavourites = () => {
    if(verify)
    {
    try {
      const res = axios.post(
        `http://localhost:1200/api/${userId}/save-a-recipe`,
        { recipeId: recipeId, date: new Date() }
      );
      console.log(res);
    } catch (error) {
      console.error("Error checking or adding recipe to favourites:", error);
    }
    window.location.reload();
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div class="bg-white">
      <Header />
      <div class=" mx-40 mb-10 sm:my-10 px-4 pb-6 rounded-xl bg-white font-sans">
        {recipe ? (
          <div>
            <h2 class="font-bold ml-3 text-[60px]">{recipe.title}</h2>
            <div className="rating-container flex justify-between">
              <div className="pl-5 text-[20px] tracking-wide">
                {Array.from(
                  { length: Math.floor(recipe.rating) },
                  (_, index) => (
                    <svg
                      key={index}
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill text-yellow-500 pl-2"
                      viewBox="0 0 16 16"
                      stroke="black"
                      stroke-width="1"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  )
                )}
                {Array.from(
                  { length: 5 - Math.floor(recipe.rating) },
                  (_, index) => (
                    <svg
                      key={index}
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill text-white pl-2"
                      viewBox="0 0 16 16"
                      stroke="black"
                      stroke-width="1"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  )
                )}
              </div>
              <button
                onClick={handleAddToFavourites}
                className="button-fav bg-transparent"
              >
                <svg width="18" height="18" viewBox="0 0 512 512">
                  <path
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                    stroke="black"
                    stroke-width="20"
                    fill={fav ? "#ff0000" : "#FFffff"}
                  />
                </svg>
              </button>
            </div>
            <hr class="h-0.5 bg-gray-300 ml-3"></hr>
            <div class="pl-5 text-black text-left">
              <p class="font-bold text-[20px]">{recipe.description}</p>
            </div>

            {/* <hr class="h-1 bg-gray-300 mb-3 ml-3"></hr> */}
            <div class="overflow-hidden position-relative ml-5">
              <img
                src={recipe.image}
                alt="RecipeIMG"
                class="w-[100%] rounded-xl"
              />
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
                  className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
            <div class="flex justify-between  text-center ml-5 mt-5 font-medium px-4 rounded-md ">
              <div class=" text-black w-full">
                <h3>Servings</h3>
                <p>{recipe.servings}</p>
              </div>
              <div class="text-black w-full">
                <h3>Preparation Time</h3>
                <p>{recipe.preparationTime} MINS</p>
              </div>
              <div class="text-black w-full">
                <h3>Cooking Time</h3>
                <p>{recipe.cookingTime} MINS</p>
              </div>
              <div class=" text-black w-full">
                <h3>Cuisine</h3>
                <p>{recipe.cuisine}</p>
              </div>
              <div class="text-black w-full">
                <h3>Meal_type</h3>
                <p>{recipe.meal_type}</p>
              </div>
              <div class="text-black w-full">
                <h3>Difficulty</h3>
                <p>{recipe.difficulty}</p>
              </div>
            </div>
            {/* border-solid border-2 border-gray-500 */}
            <div class="ml-5 mt-4 rounded-lg px-5 py-3 text-black ">
              <strong class="text-[30px]">Ingredients</strong>

              <ul class="list list-disc px-0 list-inside">
                {Array.isArray(recipe.ingredients) ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <li class="flex items-center mb-2">
                      <svg
                        class="mt-1 mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="4"
                          stroke="black"
                          stroke-width="1"
                          fill="none"
                        />
                      </svg>
                      <span class="pt-2 text-[18px]">{ingredient}</span>
                    </li>
                  ))
                ) : (
                  <li>No ingredients available</li>
                )}
              </ul>
            </div>
            {/* <p>{recipe.instructions}</p> */}
            {/* <p>{recipe.instruction}</p> */}
            {/* border-solid border-2 border-gray-500 */}
            <div class="ml-5 mt-4 rounded-lg px-5 py-3 text-black ">
              <div class="mb-2">
                <strong class="text-[30px] ">Instructions</strong>
              </div>

              <ul class="list list-disc px-0 list-inside">
                {Array.isArray(recipe.instructions) ? (
                  recipe.instructions.map((instruction, index) => (
                    <li class="flex flex-wrap flex-row my-2">
                      {/* <svg class="mt-1 mr-2" width="20" height="20" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="8" stroke="black" stroke-width="1" fill="#FF642F" />
                      </svg> */}
                      <span class=" top-2 left-0 w-6 h-6  bg-orange-500 font-medium rounded-full text-white text-center flex justify-center items-center">
                        {index + 1}
                      </span>
                      <span class="pl-3 pb-2 w-[95%] text-[18px] flex flex-wrap break-words">
                        {instruction}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No instructions available</li>
                )}
              </ul>
            </div>
            <Rating recipeId={recipeId} />
          </div>
        ) : (
          <p class="ml-5 mt-4 rounded-lg bg-gray-100 w-[85%] px-10 py-4">
            Recipe not found
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DetailRecipe;
