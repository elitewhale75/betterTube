var express = require('express');
var router = express.Router();
var {isLoggedIn} = require('../middleware/auth');
var db = require("../conf/database");

module.exports = router;

router.post('/create', isLoggedIn, async function(req,res,next){
    var {postId, comment} = req.body;
    var{userId, username} = req.session.user;
    try {
        var[insertResult, _] = await db.execute(
            `insert into comments(content, fk_authorId, fk_post) values (?,?,?);`,
            [`${comment}`, userId , postId]);

            if(insertResult && insertResult.affectedRows == 1 ){
                res.status(201).json({
                    insertResult: insertResult.insertId,
                    username: username, 
                    comment: comment
                });
            }else{
                req.flash("error", "Could not insert comment");
                return req.session.save(function (error) {});
            }
    } catch (error) {
        console.log("idiot")
        next(error);
    }
});