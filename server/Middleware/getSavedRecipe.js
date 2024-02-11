const pool = require('../database')

async function getSavedRecipesById(id) {
  try {
    const result = await pool.query("SELECT * FROM recipe r JOIN favorites f ON r.id = f.recipe_id WHERE f.user_id = $1",[id]);
    return {
      status:"success",
      recipe:result.rows
    };
  } catch (error) {
    return {
      status:"failure"      
    };
  }
}

module.exports = getSavedRecipesById;