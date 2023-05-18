var express = require('express');
var router = express.Router();
var {isLoggedIn} = require('../middleware/auth');

module.exports = router;

router.post('/create', isLoggedIn, function(req,res,next){
    res.status(201).json(req.body);
});