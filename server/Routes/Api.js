const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwtgenerator = require("../JwtToken/jwtgenerator");
const Authorize = require("../middleware/authorization");
const pool = require("../db");

router.post("/register", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      address,
      gender,
      phonenumber,
      password,
    } = req.body;
    const registration = await pool.query(
      "select * from user_data where email = $1",
      [email]
    );
    if (registration.rows.length > 0) {
      return res.status(401).send("User already exist");
    }
    const a = 10;
    const b = await bcrypt.genSalt(a);
    const bcryptPassword = await bcrypt.hash(password, b);
    const role = "user";
    const newUser = await pool.query(
      "insert into user_data(first_name,last_name,email,address,gender,role,phone_number,password) values ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        firstname,
        lastname,
        email,
        address,
        gender,
        role,
        phonenumber,
        bcryptPassword,
      ]
    );
    const newUserQuery = await pool.query(
      "SELECT * FROM user_data WHERE email = $1",
      [email]
    );
    const token = jwtgenerator(newUserQuery.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const status = await pool.query(
      "select * from user_data where email = $1",
      [email]
    );
    if (status.rows.length == 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    const passwordStatus = await bcrypt.compare(
      password,
      status.rows[0].password
    );
    if (!passwordStatus) {
      return res.status(401).json("Password or Email is in correct");
    }
    const token = jwtgenerator(status.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/verify", Authorize, async (req, res) => {
  try {
    //res.json(req.user);
    res.json(true);
  } catch {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
