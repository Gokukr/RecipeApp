const { Pool } = require("pg");

//db connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CookBuddy",
  password: "gokul196",
=======
<<<<<<< HEAD
  host: "localhost",
  database: "recipe_app",
  password: "123456",
<<<<<<< HEAD
=======
=======
  host: "",
  database: "Recipe_app",
  password: "",
>>>>>>> 8e72b8a9addac477ac585389638effed9fe0e18d
>>>>>>> 3af1c7fd7843e7da0691608ed0867b16159dfc9f
>>>>>>> 0a13cf194a30ed40ba98df9a19774f538ade8a08
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
