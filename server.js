var express = require("express");
var path = require("path");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();

app.use(express.static(__dirname + '/public'));
var PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

var routes = require("./controllers/controller.js");
app.use("/", routes);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + ".");
});