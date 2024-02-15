const pool = require('../database')

async function getSavedRecipes(
  userId, 
  searchText="",
  filter){
    const filterQryConstruct = (filter,value) => ` and r.${filter} = '${value}'`;
    const ratingQry = (value) => `and r.rating >= ${value}`
    const qry = `select * 
      from recipe r JOIN favorites f ON r.id = f.recipe_id 
      where f.user_id = '${userId}'
        and r.name ilike '%${searchText}%' 
        ${filter.rating ? ratingQry('rating',filter.rating) : ""} 
        ${filter.mealType ? filterQryConstruct('meal_type',filter.mealType) : ""} 
        ${filter.course ? filterQryConstruct('course_type',filter.course) : ""} 
        ${filter.cuisine ? filterQryConstruct('cuisine',filter.cuisine) : ""}`;

  const res = pool.query(qry);
  return res;
}

module.exports = getSavedRecipes;