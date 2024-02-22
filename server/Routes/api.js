const router = require("express").Router();
const db = require("../dbconfig");
const path = require("path");
const bcrypt = require("bcrypt");
const jwtgenerator = require("../JwtToken/jwtgenerator");
const Authorize = require("../middleware/authorization");
const allRecipes = require("../middleware/allRecipes");
const mailservice = require("../services/registrationservices");
const getSavedRecipes = require('../middleware/getSavedRecipe');
const saveRecipe = require('../middleware/savedRecipe');

router.get("/recipes/all", async (req,res) => {
  try {
    let result = await allRecipes(
      req.query.searchText,
        {
          mealType:req.query.mealType,
          course:req.query.course,
          cuisine:req.query.cuisine,
          rating:req.query.rating
        }
    );
    res.send(result);
    
  } catch (error) {
    console.log("error recieving reicpes ",error);
    res.send("Server error");
  }
})

router.get("/:userId/saved-recipes", async (req,res) => {
  try {
    let result = await getSavedRecipes(
        req.params.userId,
        req.query.searchText,
        {
          mealType:req.query.mealType,
          course:req.query.course,
          cuisine:req.query.cuisine,
          rating:req.query.rating
        }
      );
    res.send(result);
    
  } catch (error) {
    res.send("Server error")
  }
});

router.post("/:userId/save-a-recipe", async (req,res) => {
  const result = await saveRecipe(
    req.params.userId, 
    req.body.recipeId,
    req.body.date
  );
  res.send(result);
});

router.get("/api/data", (req, res) => {
  const data = { message: "Hello world" };
  res.json(data);
});
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
      repassword,
    } = req.body;
    if (repassword === password) {
      const registration = await db.query(
        "SELECT * FROM user_data WHERE email = $1",
        [email]
      );
      if (registration.rows.length > 0) {
        return res.status(401).send("User already exists");
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const role = "user";
      await db.query(
        "INSERT INTO user_data(first_name, last_name, email, address, gender, role, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
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
      const newUserQuery = await db.query(
        "SELECT * FROM user_data WHERE email = $1",
        [email]
      );
      const newUser = newUserQuery.rows[0];
      console.log(newUser);
      mailservice.sendmail(
        email,
        "Thank You for Signing Up with us",
        `${newUser.first_name} Thank You For your Registration with we keep data safe and Enjoy in the recipe management by Learning New recipes`
      );
      const status = true;
      res.json({ status });
    } else {
      return res.status(401).send("Password Mismatch");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const status = await db.query("select * from user_data where email = $1", [
      email,
    ]);
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
    const user_id = status.rows[0].id;
    const role = status.rows[0].role;
    const body = {
      token,
      role,
      user_id,
    };
    res.json(body);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//for fetching userdata in profile page
router.get("/user-profile/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  db.query(
    `select * from user_data where id= $1`,
    [userId],
    (error, result) => {
      if (error) {
        console.error("Error fetching user-data", error);
        res.status(500).json({ error: "Internal error" });
      } else {
        if (result.rows.length === 0) {
          res.status(404).json({ error: "User not found" });
        } else {
          const user = result.rows[0];
          console.log(user);
          res.json({
            id: user.id,
            name: user.first_name + " " + user.last_name,
            email: user.email,
            gender: user.gender,
            role: user.role,
            phone: user.phone_number,
            pass: user.password,
          });
        }
      }
    }
  );
});

//for ingredients data
// router.post("/insertdata", async (req, res) => {
//   try {
//     const { ingredient_name, category } = req.body;

//     await db.query(
//       "INSERT INTO ingredients (ingredient_name,category) VALUES($1,$2)",
//       [ingredient_name, category]
//     );
//     res.json({ success: true, message: "insertion successfull" });
//     console.log(ingredient_name, category);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

//for meal type table
// router.post("/mealtype", async (req, res) => {
//   try {
//     const { name, description, type } = req.body;
//     await db.query(
//       "INSERT INTO meal_type(name,description,type)VALUES($1,$2,$3)",
//       [name, description, type]
//     );
//     console.log(name);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

//for favorites table
// router.post("/favorites", async (req, res) => {
//   try {
//     const { notes } = req.body;
//     await db.query("INSERT INTO favorites(notes) VALUES($1)", [notes]);
//     console.log(notes);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

router.get("/getdata", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM recipe");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
