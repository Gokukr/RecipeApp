const { Pool } = require("pg");

//db connection
const pool = new Pool({
  user: "postgres",
  host: "",
  database: "recipe_app",
  password: "",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
