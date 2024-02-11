const express = require('express');
const router = express.Router();
const middleware = require('../Middleware')

function init(){
  router.use('/api',middleware);
  return router;
}

module.exports = init();