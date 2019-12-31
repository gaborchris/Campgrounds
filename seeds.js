var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    { name: "clouds", image: "https://images-na.ssl-images-amazon.com/images/I/71L6vhF8ruL._SX355_.jpg", description: "Lorem ipsum dolor amet mlkshk hot chicken small batch yr. Pabst stumptown cred blog copper mug mlkshk. Flannel sriracha thundercats, palo santo woke tote bag church-key scenester poutine letterpress. Williamsburg hoodie cloud bread sustainable edison bulb 8-bit live-edge squid vinyl four loko taiyaki pour-over man braid poke microdosing. Selfies glossier small batch, aesthetic banjo godard kale chips fashion axe bitters single-origin coffee kickstarter activated charcoal chillwave wayfarers taiyaki." },
    { name: "clouds", image: "https://media.istockphoto.com/photos/healthy-green-trees-in-forest-of-spruce-fir-and-pine-picture-id541152916?k=6&m=541152916&s=612x612&w=0&h=EHN4NvaIyXrbv71bAORYojmIHTnZIDRyBgAY9TJRJ48=", description: "Next level brunch put a bird on it, XOXO enamel pin venmo cliche activated charcoal small batch chillwave vexillologist post-ironic glossier. Thundercats retro sartorial knausgaard. 90's chartreuse cliche whatever chicharrones, selfies stumptown pitchfork kickstarter craft beer helvetica tbh street art ethical lo-fi. Gastropub actually thundercats, hoodie health goth fanny pack hell of pabst cornhole copper mug flannel shaman. Health goth meh fingerstache, small batch aesthetic tote bag lo-fi asymmetrical occupy disrupt whatever. Swag viral flannel brunch marfa tumeric selfies gochujang." },
    { name: "clouds", image: "https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80", description: "Artisan fam try-hard, pug 8-bit jean shorts leggings franzen locavore. Prism food truck hot chicken, everyday carry gluten-free swag VHS flexitarian beard butcher gastropub dreamcatcher etsy fixie chicharrones. Affogato selfies cray vaporware. Blue bottle fanny pack authentic, echo park distillery tacos mlkshk jean shorts vaporware taiyaki williamsburg craft beer quinoa. Franzen deep v swag DIY man braid. Dreamcatcher taiyaki pitchfork flannel locavore tbh seitan blog af drinking vinegar. Health goth tumblr polaroid, ethical artisan put a bird on it keytar gastropub street art coloring book 8-bit prism cold-pressed." }
]

function seedDB() {
    Campground.deleteMany({}, function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log("removed campgrounds");
    //         comment.deletemany({}, function () {
    //             data.foreach(function (seed) {
    //                 campground.create(seed, function (err, data) {
    //                     if (err) {
    //                         console.log(err);
    //                     } else {
    //                         console.log("added campground");
    //                         // console.log(data);
    //                         comment.create({ text: "this place is good", author: "homer" }, function (err, comment) {
    //                             if (err) {
    //                                 console.log(err);
    //                             } else {
    //                                 data.comments.push(comment);
    //                                 data.save();
    //                             }
    //                         });
    //                     }
    //                 });
    //             });
    //         });
    //     }
    });
}

module.exports = seedDB;
