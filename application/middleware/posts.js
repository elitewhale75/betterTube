var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;

module.exports = {
    makeThumbnail: function (req, res, next) {
        if (!req.file) {
            next(new Error('File upload failed'));
        } else {
            try {
                var destinationOfThumbnail = `public/images/uploads/thumbnail-${
                    req.file.filename.split(".")[0]}.png`
                    console.log(pathToFFMPEG);
                var thumbnailCommand = `${pathToFFMPEG} -i ${req.
                    file.path} -ss 00:00:01 -vframes 1 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }

        }
    },

    getPostForUserById: function(req,res,next){

    },

    getPostByID: function(req,res,next){

    },

    getCommentsForPostByID: function(req,res,next){

    },
    
    getRecentPosts: function(req,res,next){

    }
}