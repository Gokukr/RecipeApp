const pool = require('../dbconfig');

const getRecipeRequests = () => {
  return pool.query("select * from recipe");
}

module.exports = getRecipeRequests;
