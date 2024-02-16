const router = require("express").Router();
const pool = require("../db");

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
      userId,
    } = req.body;
    const newRecipe = await pool.query(
      `INSERT INTO recipe 
        (name, description, image, ingredients, instructions, preperation_time, cooking_time, total_time, servings, difficulty, cuisine, meal_type, status, course_type, user_id) VALUES 
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
        "Accepted",
        courseType,
        userId,
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
    const result = await pool.query(
      "SELECT * FROM Ingredients ORDER BY ingredient_name ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all cuisines
router.get("/cuisines", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM cuisine_type ORDER BY name ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add new ingredient
router.post("/ingredients/add", async (req, res) => {
  try {
    const { ingredientName, category } = req.body;
    const newIngredient = await pool.query(
      `INSERT INTO ingredients (Ingredient_name, Category) VALUES ($1, $2) RETURNING *`,
      [ingredientName, category]
    );
    res.json(newIngredient.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
