const pool = require('../database')

const userExists = async (id) => {
  try {
    await pool.query('SELECT * FROM user_data WHERE id = $1',[id]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const recipeExists = async (id) => {
  try {
    await pool.query('SELECT * FROM recipe WHERE id = $1',[id]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function saveRecipe(userId, recipeId, saveDate){
  try {
    const hasRecipe = await recipeExists(recipeId);
    const hasUser = await userExists(userId);
    if(hasRecipe && hasUser){
      await pool.query('INSERT INTO favorites(user_id, recipe_id, Date_added, notes) values ($1, $2 ,$3, $4)',[userId, recipeId, saveDate, "..."]);
      return {status:"success"};
    }
    return {
      status:"failure",
      hasUser:hasUser,
      hasRecipe:hasRecipe
    };
  } catch (error) {
    console.error(error);
    return {
      status:"failure",
      message:error
    };
  }
}

module.exports = saveRecipe;