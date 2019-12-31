var middlewareObj = {}

middlewareObj.checkCampgroundOwner = function(req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                req.flash("error","Campground not found.")
                res.redirect("back");
            }
            else {
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                }
                else {
                    req.flash("error", "You do not have permissions for that.")
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                req.flash("error","Comment not found.")
                res.redirect("back");
            }
            else {
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                }
                else {
                    req.flash("error", "You do not have permissions for that.")
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "Please Log In First");
        res.redirect("/login");
    }
}


module.exports = middlewareObj;