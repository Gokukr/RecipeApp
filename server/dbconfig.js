const { Pool } = require("pg");

//db connection
const pool = new Pool({
  user: "postgres",
<<<<<<< HEAD
  host: "localhost",
  database: "recipe_app",
  password: "123456",
=======
  host: "",
  database: "Recipe_app",
  password: "",
>>>>>>> 8e72b8a9addac477ac585389638effed9fe0e18d
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
