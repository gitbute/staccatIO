//middleware goes here
var Teacher = require("../models/teacher");
var Comment = require("../models/comment");

var middlewareObj = {};


middlewareObj.checkTeacherOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Teacher.findById(req.params.id, function (err, foundTeacher) {
            if (err) {
                res.redirect("back");
            } else {
                //cant do === cause first id is object and _id is string
                if (foundTeacher.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that!");
                    res.redirect("back");
                };
            };
        });

    }
    else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                //cant do === cause first id is object and _id is string
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that!");
                    res.redirect("back");
                };
            };
        });

    }
    else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;