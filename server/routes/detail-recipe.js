const router = require("express").Router();
const pool = require("../dbconfig");

// router.get("/user-profile/:id", (req, res) => {
//   const userId = req.params.id;
//   console.log(userId);

//   pool.query(
//     `select * from user_data where id= $1`,
//     [userId],
//     (error, result) => {
//       if (error) {
//         console.error("Error fetching user-data", error);
//         res.status(500).json({ error: "Internal error" });
//       } else {
//         if (result.rows.length === 0) {
//           res.status(404).json({ error: "User not found" });
//         } else {
//           const user = result.rows[0];
//           console.log(user);
//           res.json({
//             id: user.id,
//             name: user.first_name + " " + user.last_name,
//             email: user.email,
//             gender: user.gender,
//             role: user.role,
//             phone: user.phone_number,
//             pass: user.password,
//           });
//         }
//       }
//     }
//   );
// });

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
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.rows.length === 0) {
          res.status(404).json({ error: "Recipe not found" });
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
            instructions: recipe.instruction,
          });
        }
      }
    }
  );
});

module.exports = router;
