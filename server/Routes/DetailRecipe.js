const router = require("express").Router();
const pool = require("../dbconfig");

router.get("/user-profile/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  pool.query(
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
            fname: user.first_name,
            lname: user.last_name,
            about: user.about,
            address: user.address
          });
        }
      }
    }
  );
});

router.get("/favourites/:userId/:recipeId", async (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;
  pool.query(`select * from favorites where user_id = $1 and recipe_id = $2`, [userId, recipeId], (error, result) => {
    if (error) {
      res.status(500).json({ error: "Internal error" });
    } else {
      if (result.rows.length === 0) {
        res.json({ fav: false });
      } else {
        res.json({ fav: true });
      }
    }
  });
});

router.post("/favourites/:userId/:recipeId", async (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM favorites WHERE user_id = $1 AND recipe_id = $2`,
      [userId, recipeId]
    );

    if (!rows.length) {
      await pool.query(
        `INSERT INTO favorites (user_id, recipe_id) VALUES ($1, $2)`,
        [userId, recipeId]
      );
      res
        .status(201)
        .json({ message: "Recipe added to favourites successfully" });
    } else {
      res.status(409).json({ message: "Recipe already exists in favourites" });
    }
  } catch (error) {
    console.error("Error adding recipe to favourites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(`/Password/:oldPass/:userId`, (req, res) => {
  const pass = req.params.oldPass;
  const userId = req.params.userId;
  pool.query(`select * from user_data where id = $1`, [userId],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: " Error verifying password" });
      } else {
        const passwordStatus = bcrypt.compare(
          pass,
          result.rows[0].password
        );
        if (!passwordStatus) {
          res.status(401).json("Password Not Correct");
        }
        else {
          res.json({
            msg: true,
          });
        }
      }
    }
  );
});

router.put(`/changePassword/:newPass/:userId`, async (req, res) => {
  const password = req.params.newPass;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const newPassword = await bcrypt.hash(password, salt);
  const userId = req.params.userId;
  pool.query(`update user_data set password = $1 where id = $2`, [newPassword, userId],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: " Error changing password" });
      } else {
        res.json({
          msg: "Password Changed Successfully",
        });
      }
    }
  );
});

router.get("/recipe-count/:id", (req, res) => {
  const userId = req.params.id;
  pool.query(`select count(*) from recipe where user_id = $1`, [userId], (error, result) => {
    if (error) {
      console.error("Error fetching user-data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(result);
      const num = result.rows[0];
      res.json({
        count: num.count,
      });
    }
  });
});

router.put("/recipe/update/:recipeId/:newRating/:total", (req, res) => {
  const recipe_id = req.params.recipeId;
  const rating = req.params.newRating;
  const total = req.params.total;
  pool.query(
    `update recipe set rating = $1, total_ratings = $2 where id = $3`,
    [rating, total, recipe_id],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({
          msg: "ratings updated",
        });
      }
    }
  );
});

router.get("/recipes/:id", (req, res) => {
  //   const recipeId = "23d5525f-9701-4ad3-8e36-eb8ab4802875";
  const recipeId = req.params.id;
  console.log(recipeId);
  pool.query(
    `SELECT * FROM recipe WHERE id = $1`,
    [recipeId],
    (error, result) => {
      if (error) {
        console.error("Error fetching recipe:", error);
        // res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.rows.length === 0) {
          // res.status(404).json({ error: "Recipe not found" });
          console.error(error);
        } else {
          const recipe = result.rows[0];
          //console.log(recipe);
          res.json({
            id: recipe.id,
            title: recipe.name,
            image: recipe.image,
            rating: recipe.rating,
            cuisine: recipe.cuisine,
            time: recipe.total_time,
            meal_type: recipe.meal_type,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            count: recipe.total_ratings,
            instructions: recipe.instructions,
            description: recipe.description,
            preparationTime: recipe.preparation_time,
            cookingTime: recipe.cooking_time,
            servings: recipe.servings,
            courseType: recipe.course_type,
          });
        }
      }
    }
  );
});

router.put("/edit-profile", async (req, res) => {
  try {
    const {
      id,
      phone,
      fName,
      lName,
      about,
      gender,
      address,
    } = req.body;
    const updatedProfile = await pool.query(

      `UPDATE user_data
      SET
        first_name = $1,
        last_name = $2,
        address = $3,
        gender = $4,
          phone_number = $5,
          about = $6
      WHERE
          id = $7
      RETURNING *;
      `,
      [
        fName,
        lName,
        address,
        gender,
        phone,
        about,
        id,
      ]
    ); res.json(updatedProfile.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
