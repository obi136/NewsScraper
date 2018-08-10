var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var db = require("../models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongodb://heroku_h6vd5g5r:Jerry246Fall824@ds119052.mlab.com:19052/heroku_h6vd5g5r
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var mongooseConnect = mongoose.connection;

mongooseConnect.on('error', console.log("Error connecting to Mongoose"));
mongooseConnect.once('open', function() {
    console.log("Connection to Mongo DB successful");
});



module.exports = app;