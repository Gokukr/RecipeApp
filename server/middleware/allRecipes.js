const pool = require('../dbconfig')

const allRecipes = async (searchText = "", filter) =>{
    const filterQryConstruct = (filter, value) => ` and ${filter} = '${value}'`;
    const ratingQry = (value) => `and rating >= ${value}`;
    const qry = `select * from recipe 
      where name ilike '%${searchText}%' 
        ${filter.rating ? ratingQry("rating", filter.rating) : ""} 
        ${filter.mealType ? filterQryConstruct("meal_type", filter.mealType) : "" } 
        ${filter.course ? filterQryConstruct("course_type", filter.course) : "" } 
        ${filter.cuisine ? filterQryConstruct("cuisine", filter.cuisine) : ""}`;
    const result = await pool.query(qry);
    return result;
}

module.exports = allRecipes;