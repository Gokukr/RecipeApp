const express =  require("express");
const getSavedRecipesById = require('../../Middleware/getSavedRecipe');
const saveRecipe = require('../../Middleware/saveRecipe');
const searchSavedRecipe = require ('./../../Middleware/searchSavedRecipe');
const router = express.Router();

function init(){
  router.get("/:userId/saved-recipes", async (req,res) => {
    const result = await getSavedRecipesById(req.params.userId);
    res.send(result)
  });

  router.post("/:userId/save-a-recipe", async (req,res) => {
    const result = await saveRecipe(
      req.params.userId, 
      req.body.recipeId,
      req.body.date
    );
    res.send(result);
  });

  router.get("/:userId/saved-recipes/search", async (req,res) => {
    const result = await searchSavedRecipe(
      req.params.userId,
      req.body.searchText      
    )
    res.send(result);
  })

  return router;
}

module.exports = init();