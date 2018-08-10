var express = require("express");
var path = require("path");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();

app.use(express.static(__dirname + '/public'));
var PORT = process.env.PORT || 3000;

require("./config/connection");

var note = require("./models/note.js");
var article = require("./models/article.js");

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

var routes = require("./controllers/controller");
app.use("/", routes);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + ".");
});