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
                console.log(pathToFFMPEG);
                var thumbnailCommand = `${pathToFFMPEG} -i ${req.
                    file.path} -ss 00:00:01 -y -s 640x360 -vframes 1 ${destinationOfThumbnail}`;
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
        console.log("finding by id")
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
        console.log(post);

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

    getPostByID: async function (req, res, next) {

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

    getRecentPosts: function (req, res, next) {

    }
}