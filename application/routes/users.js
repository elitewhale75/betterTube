var express = require('express');
var router = express.Router();
var db = require('../conf/database');


//Register Form Route Handler
router.post('/registration', async function(req, res, next) {

  //Username Check
  var {username,email,password} = req.body;
  try{
    var [rows, fields] = await db.execute(`select id from users where username =?;`, [username]);
    if(rows && rows.length > 0){
      console.log(username + " already exists");
      return res.redirect('/registration');
    }

    //Email Check These two would be better as middleware functions
    var [rows, fields] = await db.execute(`select id from users where email =?;`, [email]);
    if(rows && rows.length > 0){
      console.log(email + " already in use");
      return res.redirect('/registration');
    }
  }catch(error){
    next(error);
  }
  
  //Insert into DB
  var[resultObject, fields] = await db.execute(`INSERT INTO USERS (username, email, password)
  VALUE
  (?,?,?);`, [username, email, password]);

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
  var {username,password} = req.body;

  try {
    
    // Username check from DB Take off Password When Using Bcrypt
    var [rows, fields] = await db.execute(`select id from users where username =? 
    AND password =?;`, [username,password]);

    if(rows && rows.length == 0){
      console.log(username + "doesn't exists");
      return res.redirect('/registration');
    }else{
      return res.redirect('/');
    }
  } catch (error) {
    next(error);
  }

  res.end();
});

module.exports = router;
