var express = require('express');
var router = express.Router();
var {isLoggedIn} = require('../middleware/auth');
var db = require("../conf/database");

module.exports = router;

router.post('/create', isLoggedIn, async function(req,res,next){
    var {postId, comment} = req.body;
    try {
        var[rows, _] = await db.execute(
            `insert into comments(content, fk_authorId, fk_post) values (?,?,?);`,
            [`${comment}`, req.session.user.userId , postId]);
    } catch (error) {
        console.log("idiot")
        next(error);
    }
    res.status(201).json(req.body);
});