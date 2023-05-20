var express = require('express');
var router = express.Router();
var multer = require('multer');
const { makeThumbnail, usePolicyCheck, getPostByID, getCommentsForPostByID, getPostForUserById } = require('../middleware/posts');
var db = require('../conf/database');
const { isLoggedIn, isMyProfile } = require('../middleware/auth');

//Taken from FFMPEG for disk storage video 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/videos/uploads')
    },
    filename: function (req, file, cb) {
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`)
    }
})

const upload = multer({ storage: storage })

//Route Handler for post video
router.post("/create",
    isLoggedIn,
    upload.single("post-video"),
    makeThumbnail,
    async function (req, res, next) {

        var { post_title, post_description } = req.body;
        var { path, thumbnail } = req.file;
        var { userId } = req.session.user;

        try {
            var [insertResult, _] = await db.execute(
                `INSERT INTO posts(title, description, video, thumbnail, fk_userId)
            VALUE (?,?,?,?,?);`,
                [post_title, post_description, path, thumbnail, userId]
            );
            if (insertResult && insertResult.affectedRows == 1) {
                var { insertId } = insertResult
                req.flash("success", "Your post was created!");
                return req.session.save(function (error) {
                    return res.redirect(`/posts/viewpost/${insertId}`);
                })
            } else {
                next(new Error('Post could not be created'));
            }
        } catch (error) {
            next(error);
        }
        res.end();
    });

//View Post
router.get("/viewpost/:id(\\d+)", getPostForUserById, getCommentsForPostByID, async function (req, res, next) {
    res.render('viewpost', { title: `${res.locals.currentPost.title}` });
})

//Search for a post
router.get("/search", async function (req, res, next) {
    var { searchValue } = req.query;

    try {
        var [rows, _] = await db.execute(
            `select id,title,thumbnail, concat_ws(' ', title, description) 
        as haystack from posts having haystack like ?;`,
            [`%${searchValue}%`]
        );

        if (rows && rows.length == 0) {
            //Still try to return something
        } else {
            res.locals.posts = rows;
            res.render('index');
        }
    } catch (error) {
        next(error);
    }
});

router.post("/delete", async function (req, res, next) {
    var { postId } = req.body;
    console.log(req.body);
    try {
        var [rows, _] = await db.execute(
            `delete from comments where fk_post = ?;`
            , [postId]);
        var[rows2, _ ] = await db.execute(`
        delete from posts where id = ?;`,
        [postId]);
    } catch (error) {
        next(error);
    }

    return res.redirect(`/users/profile/${req.session.user.userId}`);
});

module.exports = router;