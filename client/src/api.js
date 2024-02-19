import axios from 'axios';

const base = 'http://localhost:1200/api';

// export async function getSavedRecipesById(id){
//   const url = `${base}/${id}/saved-recipes`;
//   const res = await axios.get(url);
//   return res;
// };

export async function searchSavedRecipe(
  userId,
  text,
  { rating,
    mealType,
    course,
    cuisine }) {
  const url = `${base}/${userId}/saved-recipes`;
  // debugger;
  const res = await axios.get(url, {
    params: {
      searchText: text,
      rating: rating,
      mealType: mealType,
      course: course,
      cuisine: cuisine
    }
  });
  return res;
}

export async function saveRecipe(userId, recipeId, date) {
  const url = `${base}/${userId}/save-recipe`;
  const res = await axios.post(url, recipeId, date);
  return res;
}
