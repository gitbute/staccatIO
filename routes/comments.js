var express = require("express");
var router = express.Router({ mergeParams: true });
var Teacher = require("../models/teacher");
var Comment = require("../models/comment");
//index.js automatically required if found and directory is specified
var middleware = require("../middleware")


//Comments New
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Teacher.findById(req.params.id, function (err, foundTeacher) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { teacher: foundTeacher });
        }
    });
});


//Comments Create
router.post("/", middleware.isLoggedIn, function (req, res) {
    Teacher.findById(req.params.id, function (err, foundTeacher) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {
                    //add username + id to comment
                    newlyCreated.author.id = req.user._id;
                    newlyCreated.author.username = req.user.username;
                    //save comment
                    newlyCreated.save();
                    //the rest
                    foundTeacher.comments.push(newlyCreated);
                    foundTeacher.save();
                    req.flash("success", "Successfully added comment!")
                    res.redirect("/teachers/" + foundTeacher._id);
                };
            });
        };
    });
});
//Edit Comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", { comment: foundComment, teacher_id: req.params.id });
        }
    });
});

//Update Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/teachers/" + req.params.id);
        };
    });
});

//Destroy Comment Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!")
            res.redirect("/teachers/" + req.params.id);
        }
    });
});

module.exports = router;