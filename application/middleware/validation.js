var validator = require('validator');
var db = require('../conf/database');

module.exports = {
    usernameCheck: function(req,res,next){
        var {username} = req.body;

        if(!validator.isLength(username, {min:3})){
            req.flash("error", ` Username must be 3 or more characters`);
        }

        if(!/[a-zA-Z]/.test(username.charAt(0))){
            req.flash("error", ` Username must begin with a character`);
        }
        //If there were any flash errors, send back to registration form
        if(req.session.flash.error){
            req.session.save()
            res.redirect('/registration');
        }else{
            next();
        }
    },
    passwordCheck: function(req,res,next){
        var {password} = req.body;
        if(!validator.isLength(password, {min:8}))
        req.flash("error", ` Password must be 8 or more characters`);

        if(!validator.isStrongPassword(password, {minUpperCase: 1}))
        req.flash("error", 
        ` Password must contain at least 1 or more upper case characters`);

        if(!validator.isStrongPassword(password, {minNumbers: 1 }))
        req.flash("error", 
        ` Password must contain at least 1 or more numbers`);

        if(!validator.isStrongPassword(password, {minSymbols: 1}))
        req.flash("error", 
        ` Password must contain at least 1 or more symbols`);

        if(req.session.flash.error){
            req.session.save(function(error){
                return res.redirect('/registration');
              });
        }else{
            next();
        }
    },
    emailCheck: function(req,res,next){
        var {email} = req.body;

        if(!validator.isEmail(email)){
            req.flash("error", ` Not a valid email`);
        }
        //If there were any flash errors, send back to registration form
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    tosCheck: function(req,res,next){
        var{tos} = req.body;
        if(tos != "on"){
            req.flash("error", ` Please agree to terms of service.`)
        }
        //If there were any flash errors, send back to registration form
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    ageCheck: function(req,res,next){
        var{age_req} = req.body;
        if(age_req != "on"){
            req.flash("error", ` You are not old enough to create an account`)
        }
        //If there were any flash errors, send back to registration form
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    isUsernameUnique: async function(req,res,next){
        var{username} = req.body;
        try {
            var [rows, fields] = await db.execute(
                `select id from users where username =?;`
                ,[username]);
            if(rows && rows.length > 0){
                req.flash("error", ` ${username} is already taken`)
                return res.redirect('/registration');
            }else{
                next();
            }
        } catch (error) {
            next(error);
        }
    },
    isEmailUnique: async function(req,res,next){
        var {email} = req.body;

        try {
            var [rows, fields] = await db.execute(
                `select id from users where email =?;`
                ,[email]);
            if(rows && rows.length > 0){
                req.flash("error", ` ${email} is already taken`)
                return res.redirect('/registration');
            }else{
                next();
            }
        } catch (error) {
            next(error);
        }
    },
    isPasswordConfirmed: async function(req,res,next){
        var{password, confirmPassword} = req.body;
        if(password != confirmPassword)
        req.flash("error", ' Please Confirm Password');

        //If there were any flash errors, send back to registration form
        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
}