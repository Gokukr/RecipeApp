const pool = require('../database')

const recipeExists = async (recipeId) => {
  try {
    await pool.query('SELECT * FROM recipe WHERE id = $1',[recipeId]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function saveRecipe(userId, recipeId, saveDate){
  try {
    const hasRecipe = await recipeExists(recipeId);
    if(hasRecipe){
      await pool.query('INSERT INTO favorites(user_id, recipe_id, Date_added, notes) values ($1, $2 ,$3, $4)',[userId, recipeId, saveDate, "..."]);
      return "success";
    }
    return "failure";
  } catch (error) {
    console.error(error);
  }
}

module.exports = saveRecipe;