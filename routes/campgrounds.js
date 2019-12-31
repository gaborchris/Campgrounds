var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var Campground = require('../models/campground');

router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campground/index", {campgrounds: allCampgrounds});
        }
    });
});

router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("campground/new");
});

router.post("/",middleware.isLoggedIn,  function(req, res){
    var newCampground = req.body.campground;
    newCampground.author = {
        id: req.user._id,
        username: req.user.username
    }
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }

    });
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campground/show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwner, function (req, res) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("/campgrounds");
            }
            else {
                    res.render("campground/edit", { campground: foundCampground });
            }
        });
});

router.put("/:id", middleware.checkCampgroundOwner, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOwner, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect("/campgrounds");
    });
});

module.exports = router;