const express =  require("express");
const getSavedRecipesById = require('./getSavedRecipe');
const saveRecipe = require('./saveRecipe');
const router = express.Router();

function init(){
  router.get("/:userId/saved-recipes",async (req,res) => {
    const userId = req.params.userId;
    const recipes = await getSavedRecipesById(userId);
    res.send(recipes)
  });

  router.post("/:userId/save-recipe", async (req,res) => {
    const userId = req.params.userId;
    const recipeId = req.body.recipeId;
    const date = req.body.date;
    const result = await saveRecipe(userId, recipeId, date);
    res.send(result);
  });
  
  return router;
}

module.exports = init();