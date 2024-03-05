const pool = require("../dbconfig");

const getRecipeRequests = () => {
  return pool.query("select * from recipe where status = 'Pending'");
};

const handleRecipeRequest = (id, status) => {
  pool.query("UPDATE recipe SET status=$1 WHERE id=$2", [status, id]);
  return "Updated successfully";
};

module.exports = {
  getRecipeRequests,
  handleRecipeRequest,
};
