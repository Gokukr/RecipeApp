const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"Tcka!2003",
    host:"172.27.16.1",
    port:5432,
    database:"Recipe_app"
});

// const result = pool.query("select * from favorites");

pool.connect().
  then(() => console.log("Connected to DB")).
  catch((err) => console.log(`Connection denied -- ${err}`));

module.exports=pool;