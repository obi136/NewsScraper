var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");



var app = express();

var PORT = process.env.PORT || 3000;

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

var MONGODB_URI;

if (process.env.MONGODB_URI) {
    MONGODB_URI = "mongodb://heroku_h6vd5g5r:Jerry246Fall824@ds119052.mlab.com:19052/heroku_h6vd5g5r";
} else {
    MONGODB_URI = "mongodb://localhost/mongoHeadlines";
}

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB

app.get("/scrape", function (req, res) {
    request("http://www.echojs.com/", function (error, response, html) {
        var $ = cheerio.load(response.data);

        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });

        });

        res.send("Scrape Complete");
    });
});

app.get("/articles", function (req, res) {
    article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        });
});

app.get("/articles/:id", function (req, res) {
    article.findOne({
            _id: req.params.id
        }).populate("note")
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/articles/:id", function (req, res) {
    note.create(req.body)
        .then(function (dbNote) {
            return article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            })
        })
        .then(function (updatedArticle) {
            res.json(updatedArticle);
        })
});

mongoose.connect(MONGODB_URI).then(function () {
    app.listen(PORT, function () {
        console.log("App running on port " + PORT + ".");
    });
});