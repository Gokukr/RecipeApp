const pool = require('../database')

async function searchSavedRecipe(userId, searchText){
  const res = pool.query(`select * from recipe r JOIN favorites f ON r.id = f.recipe_id where f.user_id = $1 and r.name ilike '%${searchText}%'`,[userId]);
  return res;
}

module.exports = searchSavedRecipe;