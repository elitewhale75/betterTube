var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
var{isLoggedIn, isMyProfile} = require('../middleware/auth');
const { usernameCheck, isUsernameUnique, isEmailUnique, passwordCheck, emailCheck, isPasswordConfirmed, ageCheck, tosCheck} = require('../middleware/validation');


//Register Form Route Handler Insert into DB
router.post(
'/registration',
usernameCheck, 
passwordCheck,
isPasswordConfirmed,
ageCheck,
tosCheck,
emailCheck,
isUsernameUnique,
isEmailUnique,
async function(req, res, next) {

  var {username,email,password} = req.body;
  try{
    //Encrypy Password
    var hashedPassword = await bcrypt.hash(password,3);

  }catch(error){
    next(error);
  }
  
  //Insert into DB
  var[resultObject, fields] = await db.execute(
    `INSERT INTO USERS (username, email, password)
    VALUE
    (?,?,?);`, 
    [username, email, hashedPassword]);

  //Respond
  if(resultObject && resultObject.affectedRows == 1){
    //Redirect to a page after a successful registration
    return res.redirect('/login'); 
  }else{
    return res.redirect('/registration');
  }
});

//Login Request Handler
router.post('/login', async function(req, res, next){
  const {username,password} = req.body;

  if(!username || !password)
    return res.redirect('/login');
  else{
    try {
      // Username check from DB Take off Password When Using Bcrypt
      var [rows, fields] = await db.execute
        (`select id,username,password,email from users where username =?;`, 
        [username]
      );
      
      var user = rows[0];
      if(!user){
        req.flash("error", `Log in Failed: Invalid username/password`);
        req.session.save(function(error){
          return res.redirect('/login');
        });
        
      }else{
        var passwordsMatch = await bcrypt.compare(password, user.password)
        if(passwordsMatch){
          req.session.user={
            userId: user.id,
            email: user.email,
            username: user.username
          };
          req.flash("success",`You are now logged in`);
          req.session.save(function(error){
            return res.redirect('/');
          });
        }
        else{
          return res.redirect('/login');
        }
          
      }
    } catch (error) {
      next(error);
    }
  }
});

router.get("/profile/:id(\\d+)", isLoggedIn, isMyProfile, function(req,res){
  res.render('profile' , { title: 'User Profile'});
})  

// Logout
router.post('/logout', function(req,res,end){
  req.session.destroy(function(err){
    if(err){
      next(err);
    }
    return res.redirect('/');
  });
});

module.exports = router;
