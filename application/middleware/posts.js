var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require("../conf/database");

module.exports = {
    makeThumbnail: function (req, res, next) {
        if (!req.file) {
            next(new Error('File upload failed'));
        } else {
            try {
                var destinationOfThumbnail = `public/images/uploads/thumbnail-${req.file.filename.split(".")[0]}.png`
                var thumbnailCommand = `${pathToFFMPEG} -i ${req.
                    file.path} -ss 00:00:03 -y -s 640x360 -vframes 1 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }

        }
    },

    getPostForUserById: async function (req, res, next) {
        var { id } = req.params;
        try {
            //Find Post and Username in DB
            var [rows, _] = await db.execute(
                `select u.username, video, title, description, p.id, p.datePosted
                from posts p 
                join users u 
                on p.fk_userId = u.id
                where p.id=?;`,
                [id]);

        } catch (error) {
            next(error);
        }

        const post = rows[0];

        if (!post) {
            req.flash("error", "Post does not exist");
            return req.session.save(function (error) {
                return res.redirect(`/`);
            });
        } else {
            res.locals.currentPost = post;
            next();
        }
    },

    getPostByUserId: async function (req, res, next) {
        var {userId} = req.session.user;
        try {
            var[rows, _] = await db.execute(
                `select * from posts where fk_userId=?`,
                [userId]
            )
            res.locals.posts = rows;
            next();
        }catch(err){
            next(err);
        }
    },
    getCommentsForPostByID: async function (req, res, next) {
        var { id } = req.params;

        try {
            //Find Post and Username in DB
            var [rows, _] = await db.execute(
                `select u.username, c.content, c.createdAt
                from comments c 
                join users u 
                on u.id = c.fk_authorId
                where c.fk_post=?;`,
                [id]);

        } catch (error) {
            next(error);
        }

        res.locals.currentPost.comments = rows;
        next();
    },

    getRecentPosts: async function (req, res, next) {
        try {
            var[rows, _] = await db.execute(
                `select * from posts order by datePosted desc limit 2;`
            )
            res.locals.posts = rows;
            next();
        } catch (error) {
            next();
        }
    }
}