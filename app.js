var express = require("express"),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
flash = require('connect-flash'),
passport = require('passport'),
LocalStrategy = require('passport-local')
methodOverride = require('method-override');
Campground = require('./models/campground'),
Comment = require("./models/comment"),
User = require("./models/user"),
Seed = require("./seeds");
require('dotenv').config();

app.use(require('express-session')({
    secret: "Kona is the best dog and we love her!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
});

// Seed();

var mongo_url = process.env.MONGOATLAS_URI;
mongoose.connect(mongo_url, 
    {useUnifiedTopology: true, useNewUrlParser: true}, function(err){
        if(err){console.log(err.message)}
        else{
        console.log("Connected to DB");
        }
    });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var commentRoutes = require("./routes/comments"),
campgroundRoutes = require("./routes/campgrounds"),
authRoutes = require("./routes/auth"),
indexRoutes = require("./routes/index");


app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});
