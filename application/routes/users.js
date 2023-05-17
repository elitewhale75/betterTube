var express = require('express');
var router = express.Router();
var db = require('../conf/database');


/* GET localhost:3000/users */
router.post('/registration', async function(req, res, next) { 
  console.log(req.body);
  res.end();
});

module.exports = router;
