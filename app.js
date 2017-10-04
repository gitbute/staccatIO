var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Teacher = require("./models/teacher"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    methodOverride = require("method-override");
    flash = require("connect-flash");

//Requireing routes
var commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index"),
    teacherRoutes = require("./routes/teachers")

//BECAUSE: DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
// DEPRECATED: mongoose.connect("mongodb://localhost/staccatio");
mongoose.connect("mongodb://localhost/staccatio", {
    useMongoClient: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//Seeding
// seedDB();

//Passport Config
app.use(require("express-session")({
    secret: "Mozart had a baby with Bach!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//New Middleware for EVERY ROUTE to pass trough currentUser to every route

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Use the routes, first parameter appends the routenames in front that they have in common.
app.use("/", indexRoutes);
app.use("/teachers/:id/comments", commentRoutes);
app.use("/teachers/", teacherRoutes);

app.listen("80", function () {
    console.log("StaccatIO has started!");
});