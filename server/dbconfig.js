const { Pool } = require("pg");

//db connection
const pool = new Pool({
  user: "postgres",
  host: "172.27.16.1",
  database: "Recipe_app",
  password: "Tcka!2003",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
