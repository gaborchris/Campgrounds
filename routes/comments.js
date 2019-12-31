var express = require("express");
var router = express.Router({ mergeParams: true });
var middleware = require("../middleware/index");
var Campground = require("../models/campground")
var Comment = require("../models/comment")

// Comments New
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comment/new", { campground: campground })
        }
    });
});

// Comments Save
router.post("/", middleware.isLoggedIn, function (req, res) {
    //lookup campground
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //save comment
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });


        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwner, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id, function (err, comment) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    res.render("comment/edit", { campground: campground, comment: comment });
                }
            })
        }

    })
});

router.put("/:comment_id", middleware.checkCommentOwner, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, comment) {
        if (err) {
            console.log(err)
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }

    });
});

router.delete("/:comment_id", middleware.checkCommentOwner, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            console.log(err)
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;