const router = require("express").Router();
const pool = require("../dbconfig");

// Add a recipe
router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      description,
      imageUrl,
      selectedIngredients,
      instructions,
      preparationTime,
      cookingTime,
      servings,
      difficultyLevel,
      cuisineType,
      mealType,
      courseType,
      status,
      userId,
    } = req.body;
    const newRecipe = await pool.query(
      `INSERT INTO recipe 
        (name, description, image, ingredients, instructions, preparation_time, cooking_time, total_time, servings, difficulty, cuisine, meal_type, status, course_type, user_id) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
        RETURNING *`,
      [
        name,
        description,
        imageUrl,
        selectedIngredients,
        instructions,
        preparationTime,
        cookingTime,
        parseInt(preparationTime) + parseInt(cookingTime),
        servings,
        difficultyLevel,
        cuisineType,
        mealType,
        status,
        courseType,
        userId,
      ]
    );

    res.json(newRecipe.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a recipe
router.put("/update", async (req, res) => {
  try {
    const {
      name,
      description,
      imageUrl,
      selectedIngredients,
      instructions,
      preparationTime,
      cookingTime,
      servings,
      difficultyLevel,
      cuisineType,
      mealType,
      courseType,
      id,
    } = req.body;
    const updatedRecipe = await pool.query(
      `UPDATE recipe
      SET
          name = $1,
          description = $2,
          image = $3,
          ingredients = $4,
          instructions = $5,
          preparation_time = $6,
          cooking_time = $7,
          total_time = $8,
          servings = $9,
          difficulty = $10,
          cuisine = $11,
          meal_type = $12,
          course_type = $13
      WHERE
          id = $14
      RETURNING *;
      `,
      [
        name,
        description,
        imageUrl,
        selectedIngredients,
        instructions,
        preparationTime,
        cookingTime,
        parseInt(preparationTime) + parseInt(cookingTime),
        servings,
        difficultyLevel,
        cuisineType,
        mealType,
        courseType,
        id,
      ]
    );

    res.json(updatedRecipe.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete recipe
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecipe = await pool.query(
      "DELETE FROM recipe WHERE id = $1",
      [id]
    );
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

// Update recipe Status
router.put("/status", async (req, res) => {
  try {
    const { recipeStatus, recipeId } = req.body;
    console.log(recipeStatus, recipeId)
    const updatedStatus = await pool.query(
      `UPDATE recipe SET status = $1 WHERE id = $2 RETURNING *; `,
      [
        recipeStatus,
        recipeId,
      ]
    );
    res.json(updatedStatus.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
