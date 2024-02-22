const pool = require('../dbconfig')

const allRecipes = async (searchText = "", filter) =>{

    const arrayReduce = (arr) => {
      let out = "";
      arr.map(item => out += `,'${item}'`);
      return out.substring(1);
    }
    const filterQryConstruct = (filter, value) => ` and ${filter} IN (${value ? arrayReduce(value):""})`;
    const ratingQry = (value) => `and rating >= ${value}`;
    
    const qry = `select * from recipe 
      where name ilike '%${searchText}%' 
        ${filter.rating ? `and rating >= ${filter.rating[0]}` : ""} 
        ${filter.mealType ? (Array.isArray(filter.mealType) ? filterQryConstruct("meal_type", filter.mealType) : `and meal_type = '${filter.mealType}'`) : "" } 
        ${filter.course ? (Array.isArray(filter.course) ? filterQryConstruct("course_type", filter.course) : `and course_type = '${filter.course}`) : "" } 
        ${filter.cuisine ? (Array.isArray(filter.cuisine) ? filterQryConstruct("cuisine", filter.cuisine) : `and cuisine = '${filter.cuisine}'`) : ""}`;
    
    const result = await pool.query(qry);
    
    return result;
}

module.exports = allRecipes;