var express = require('express');
var router = express.Router();
var{isLoggedIn, isMyProfile} = require('../middleware/auth');

/* GET home page. */
//localhost:3000
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', name:"Vignesh" });
});

router.get("/login", function(req,res){
  res.render('login', { title: 'Login'});
})

// , script: 'public/js/validation.js'
router.get("/registration", function(req,res){
  res.render('registration', { title: "Registration Form"});
})

router.get("/postvideo", isLoggedIn, function(req,res){
  res.render('postvideo', { title: 'Post Video'});
})

//Make Title the name of the video  
router.get("/viewpost/:id(\\d+)", function(req,res){
  res.render('viewpost' , { title: 'View Post'});
})

module.exports = router;
