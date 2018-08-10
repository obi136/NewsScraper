var mongoose = require("mongoose");

var MONGODB_URI = mongoose.connect;

MONGODB_URI("mongodb://heroku_h6vd5g5r:Jerry246Fall824@ds119052.mlab.com:19052/heroku_h6vd5g5r", function(err){
    if(err){
        throw(err);
        mongoose.connect("mongodb://localhost/mongoHeadlines");
    }
    else {
        console.log("Connected To Mongo DB");
    }
});
