const express =  require("express");
const getSavedRecipes = require('../../Middleware/getSavedRecipe');
const saveRecipe = require('../../Middleware/saveRecipe');
// const searchSavedRecipe = require ('./../../Middleware/searchSavedRecipe');
const router = express.Router();

function init(){
  router.get("/:userId/saved-recipes", async (req,res) => {
    let result;
    // if(req.query.searchText){
      result = await getSavedRecipes(
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
  });

  router.post("/:userId/save-a-recipe", async (req,res) => {
    const result = await saveRecipe(
      req.params.userId, 
      req.body.recipeId,
      req.body.date
    );
    res.send(result);
  });

  return router;
}

module.exports = init();