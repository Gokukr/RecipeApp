const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "584265",
  host: "localhost",
  port: 5432,
  database: "recipe_app",
});

module.exports = pool;
