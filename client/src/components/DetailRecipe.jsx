import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "./Rating";
import Header from "./Header";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DeleteRecipe from "./DeleteRecipe";
import { ToastContainer, toast } from "react-toastify";

function Detailrecipe() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const userId = Cookies.get("user_id");
  const role = Cookies.get("role");
  const [userRole, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [recipeStatus, setRecipeStatus] = useState("");
  const notify = (message) => toast(message);
  useEffect(() => {
    if (role === "user") {
      setUser("user");
    } else if (role === "admin" || role === "Admin") {
      setUser("Admin");
    } else {
      const url = `http://localhost:1200/api/detail/User-role/${recipeId}/${userId}`;
      axios
        .get(url)
        .then((response) => {
          setUser(response.data.role);
        })
        .catch((error) => {
          navigate("/dashboard");
          console.error(error);
        });
    }
  }, [role, userRole, recipeId, userId, navigate]);
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:1200/api/detail/recipes/${recipeId}`)
      .then((response) => {
        setError(response.data.error);
        if (error) {
          notify("An Error Occured");
          navigate("/dashboard");
        }
        setRecipe(response.data);
        setRecipeStatus(recipe.status);
      })
      .catch((error) => {
        notify("An Error Occured");
        navigate("/dashboard");
      });
  }, [recipeId, error, navigate]);
  const handleEdit = () => {
    navigate("/edit-recipe", { state: { recipe } });
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const handleRequest = async () => {
    setRecipeStatus("Pending");
    notify("Requested to add recipe");
  };
  const [fav, setfav] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:1200/api/detail/favourites/${userId}/${recipeId}`)
      .then((response) => {
        setfav(response.data.fav);
      });
  }, [userId, recipeId]);
  console.log("value of fav is : ");
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
    window.location.reload();
  };

  const [percentage, setPercentage] = useState("");
  useEffect(() => {
    const rate = Math.floor(recipe.rating);
    const part = (recipe.rating - rate) * 100;
    setPercentage(Math.floor(part) + "%");
  }, [recipe.rating]);

  useEffect(() => {
    if (
      recipeStatus === "Accepted" ||
      recipeStatus === "Inactive" ||
      recipeStatus === "Pending"
    )
      setStatus();
  }, [recipeStatus]);

  const setStatus = async () => {
    const updatedStatus = { recipeStatus, recipeId };
    console.log(updatedStatus);
    try {
      const response = await axios.put(
        "http://localhost:1200/api/manage/status",
        updatedStatus
      );
    } catch (error) {
      console.error("Error setting recipe status:", error.message);
    }
  };
  return (
    <div class="bg-white">
      <Header />
      <div class=" mx-40 mb-10 sm:my-10 px-4 pb-6 rounded-xl bg-white font-open-sans">
        {recipe ? (
          <div>
            <h2 class="font-bold ml-3 text-[60px]">{recipe.title}</h2>
            <div className="rating-container flex justify-between mt-[-10px]">
              <div class="rating-container-rating-tab flex flex-row mt-0 justify-start items-center">
                <p class="pl-5 text-[20px] font-bold tracking-wide">Rating:</p>
                <div className=" tracking-wide pt-1">
                  {Array.from(
                    { length: Math.floor(recipe.rating) },

                    (_, index) => (
                      <svg
                        key={index}
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill text-yellow-500 pl-2"
                        viewBox="0 0 16 17"
                        stroke="black"
                        stroke-width="1"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    )
                  )}

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 17"
                    className="pl-2"
                  >
                    <defs>
                      <linearGradient id="half">
                        <stop offset={percentage} stop-color="rgb(234 179 8)" />
                        <stop offset={percentage} stop-color="white" />
                      </linearGradient>
                    </defs>
                    <g fill="url(#half)" stroke="black" stroke-width="1">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </g>
                  </svg>
                  {Array.from(
                    { length: 4 - Math.floor(recipe.rating) },
                    (_, index) => (
                      <svg
                        key={index}
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill text-white pl-2"
                        viewBox="0 0 16 17"
                        stroke="black"
                        stroke-width="1"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    )
                  )}
                </div>
                <p class="pl-2 text-[20px] font-bold tracking-wide">
                  {recipe.rating}{" "}
                </p>
              </div>

              <button
                onClick={handleAddToFavourites}
                className="button-fav bg-transparent"
              >
                <svg
                  width="35"
                  height="35"
                  viewBox="-16.15 -14.15 500.00 580.00"
                  class="px-1 py-1"
                >
                  <path
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                    stroke="black"
                    stroke-width="20"
                    fill={fav ? "#ff0000" : "#FFffff"}
                  />
                </svg>
              </button>
            </div>
            {/* <div>
          <svg fill="#000000" height="64px" width="64px" version="1.1" id="Capa_1" viewBox="-14.15 -14.15 500.00 500.00" xml:space="preserve" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)" stroke="#000000" stroke-width="0.004717010000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.9434020000000001"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"></path> </g> </g></svg>
          </div> */}
            <hr class="h-0.5 bg-gray-300 ml-3"></hr>
            <div class="pl-5 text-black text-left">
              <p class="mb-10 text-[20px]">{recipe.description}</p>
            </div>

            {/* <hr class="h-1 bg-gray-300 mb-3 ml-3"></hr> */}
            <div class="overflow-hidden position-relative ml-5 width-full">
              <img
                src={recipe.image}
                alt="RecipeIMG"
                class="w-full h-[600px] rounded-xl object-cover"
              />
            </div>
            {/* Admin and their recipes */}
            {role === "admin" && recipe.chef === userId && (
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
            {/* Admin and culinarian recipe */}
            {role === "admin" &&
              recipe.chef !== userId &&
              (recipe.status === "Accepted" ||
                recipe.status === "Inactive") && (
                <div className="flex justify-end gap-4 mt-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">
                      Hide Recipe
                    </span>
                    <input
                      type="checkbox"
                      value={recipeStatus}
                      checked={recipeStatus === "Accepted" ? true : false}
                      className="sr-only peer"
                      onChange={(e) => {
                        setRecipeStatus((prevStatus) =>
                          prevStatus === "Accepted" ? "Inactive" : "Accepted"
                        );
                        notify(`Recipe status modified`);
                      }}
                    />
                    <div className="relative w-11 h-6 bg-red-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span className="pl-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Display recipe
                    </span>
                  </label>
                </div>
              )}
            {/* Culinarian - Pending recipe*/}
            {userRole === "culinarian" && recipe.status === "Pending" && (
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleEdit}
                  className="bg-[#3498db] text-white ml-4 font-medium px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            )}
            {/* Culinarian - Rejected recipe*/}
            {userRole === "culinarian" && recipe.status === "Rejected" && (
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleEdit}
                  className="bg-[#3498db] text-white ml-4 w-24 font-medium px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={handleRequest}
                  className="bg-presgreen text-white ml-4 w-24 font-medium px-4 py-2 rounded-md hover:bg-green-500"
                >
                  Request
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white ml-4 w-24 font-medium px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
            {/* Culinarian - Inactive recipe*/}
            {userRole === "culinarian" && recipe.status === "Inactive" && (
              <div className="flex justify-end gap-4 mt-4 mr-5">
                <button
                  onClick={handleRequest}
                  className="bg-presgreen text-white ml-4 w-24 font-medium px-4 py-2 rounded-md hover:bg-green-500"
                >
                  Request to activate
                </button>
              </div>
            )}

            <div className="px-4 flex justify-between gap-4 text-center ml-5 mt-5 font-medium">
              <div className="bg-white text-black w-full rounded-2xl border border-text border-primary-100 shadow-4xl shadow-red-600">
                <h3>Servings</h3>
                <p>{recipe.servings}</p>
              </div>
              <div className="bg-white text-black w-full rounded-2xl border border-text border-primary-100 shadow-4xl shadow-orange-600">
                <h3>Preparation Time</h3>
                <p>{recipe.preparationTime} MINS</p>
              </div>
              <div className="bg-white text-black w-full rounded-2xl border border-text border-primary-100 shadow-4xl shadow-yellow-600">
                <h3>Cooking Time</h3>
                <p>{recipe.cookingTime} MINS</p>
              </div>

              <div className=" bg-white text-black w-full rounded-xl border border-text border-primary-100 shadow-4xl shadow-green-600">
                <h3>Cuisine</h3>
                <p>{recipe.cuisine}</p>
              </div>
              <div className="bg-white text-black w-full rounded-xl border border-text border-primary-100 shadow-4xl shadow-sky-600">
                <h3>Meal_type</h3>
                <p>{recipe.meal_type}</p>
              </div>
              <div className="bg-white text-black w-full rounded-xl border border-text border-primary-100 shadow-4xl shadow-violet-600">
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
          </div>
        ) : (
          <p class="ml-5 mt-4 rounded-lg bg-gray-100 w-[85%] px-10 py-4">
            Loading...
          </p>
        )}
        <Rating recipeId={recipeId} />
      </div>
    </div>
  );
}

export default Detailrecipe;
