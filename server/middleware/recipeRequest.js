const pool = require("../dbconfig");

const getRecipeRequests = () => {
  return pool.query(
    "select r.id,u.first_name,u.last_name,r.name,r.cuisine,r.total_time,r.image,r.meal_type from recipe r join user_data u on r.user_id = u.id where status = 'Pending'"
  );
};

const handleAcceptRequest = (id, status) => {
  return pool.query("UPDATE recipe SET status=$1 WHERE id=$2", [status, id]);

};


const handleRejectRequest = (id, status, message) => {
  return pool.query("UPDATE recipe SET status=$1,comment=$2 WHERE id=$3", [
    status,
    message,
    id,
  ]);
};

module.exports = {
  getRecipeRequests,
  handleRejectRequest,
  handleAcceptRequest,
};
