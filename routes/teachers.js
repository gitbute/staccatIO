var express = require("express");
var router = express.Router();
var Teacher = require("../models/teacher")
//index.js automatically required if found and directory is specified
var middleware = require("../middleware")

router.get("/", function (req, res) {
    Teacher.find({}, function (err, allTeachers) {
        if (err) {
            console.log(err);
        } else {
            res.render("teachers/index", { teachers: allTeachers });
        }
    });
});

router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newTeacher = { name: name, image: image, description: description, author: author };
    Teacher.create(newTeacher, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/teachers");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("teachers/new");
});

router.get("/:id", function (req, res) {
    Teacher.findById(req.params.id).populate("comments").exec(function (err, foundTeacher) {
        if (err) {
            console.log(err);
        } else {
            res.render("teachers/show", { teacher: foundTeacher });
        }
    });
});

//Edit Teacher Route
router.get("/:id/edit", middleware.checkTeacherOwnership, function (req, res) {
    Teacher.findById(req.params.id, function (err, foundTeacher) {
        res.render("teachers/edit", { teacher: foundTeacher });
    });
});

//Update Teacher Route
router.put("/:id", middleware.checkTeacherOwnership, function (req, res) {
    Teacher.findByIdAndUpdate(req.params.id, req.body.teacher, function (err, updatedTeacher) {
        if (err) {
            res.redirect("/teachers");
        } else {
            res.redirect("/teachers/" + req.params.id);
        };
    });
});

//Destroy Teacher Route
router.delete("/:id", middleware.checkTeacherOwnership, function (req, res) {
    Teacher.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/teachers")
        } else {
            res.redirect("/teachers")
        }
    });
});

module.exports = router;