const router = require("express").Router();
const pool = require("../db");

// Add a recipe
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      description,
      imageUrl,
      ingredients,
      instruction,
      preparationTime,
      cookingTime,
      servings,
      difficultyLevel,
      cuisineType,
      mealType,
      courseType,
    } = req.body;
    // const userId =
    const newRecipe = await pool.query(
      `INSERT INTO recipe 
        (name, description, image, ingredients, instruction, preperation_time, cooking_time, total_time, servings, difficulty, cuisine, meal_type, status, course_type) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
        RETURNING *`,
      [
        name,
        description,
        imageUrl,
        ingredients,
        instruction,
        preparationTime,
        cookingTime,
        preparationTime + cookingTime,
        servings,
        difficultyLevel,
        cuisineType,
        mealType,
        1,
        courseType,
      ]
    );

    res.json(newRecipe.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all ingredients
router.get("/ingredients", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Ingredients");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all cuisines
router.get("/cuisines", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cuisine_type");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add new ingredient
router.post("/ingredients/add", async (req, res) => {
  try {
    const { ingredient_name, category } = req.body;
    const newIngredient = await pool.query(
      `INSERT INTO ingredients (Ingredient_name, Category) VALUES ($1, $2) RETURNING *`,
      [ingredient_name, category]
    );

    res.json(newIngredient.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
