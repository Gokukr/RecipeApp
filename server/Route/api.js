const express = require('express');
const router = express.Router();
const savedRecipe = require('./SavedRecipes')

function init(){
  router.use('/api',savedRecipe);
  return router;
}

module.exports = init();