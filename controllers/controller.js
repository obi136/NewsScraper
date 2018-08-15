var mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var cheerio = require("cheerio");
var request = require("request");
var app = express();
var Promise = require("bluebird");
var axios = require("axios");
// var db = require("../models");

mongoose.Promise = Promise;

var articles = require("../models/articles");
var comments = require("../models/comments");

app.get("/", function (req, res) {
    articles.find({})
        .then(function (dbArticle) {
            // console.log(dbArticle)
            res.render("index", dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        });
});


app.get("/scrape", function (req, res) {
    return axios.get("http://www.echojs.com/").then(function (res) {
        var $ = cheerio.load(res.data);

        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            articles.create(result)
                .then(function (dbArticle) {
                    // console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });

        });

        // res.send("Scrape Complete");
    });
});

app.get("/articles", function (req, res) {
    articles.find({})
        .then(function (dbArticle) {
            console.log("********************************");
            // console.log(dbArticle);
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        });
});

app.get("/articles/:id", function (req, res) {
    articles.findOne({
            _id: req.params.id
        }).populate("comment")
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/comments", function (req, res) {
    comments.find({})
        .then(function (dbArticle) {
            //    console.log("********************************");
            // console.log(dbArticle);
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        });
});

app.post("/comments/:id", function (req, res) {

    var newComment = {
        articleId: req.params.id,
        name: "name",
        comment: req.body.comment
    }
    console.log(newComment);
    comments.create(
        newComment
    ).then(function (found, err) {
        if (err) {
            console.log(err);
        } else {
            console.log(found);
            res.json(found);
        }
    });
});

// app.post("/commentsAdd/:id", function (req, res) {
//     comments.create({
//         _id: req.params.id,
//         comment: req.body.comment
//     }).then(function (err, add) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Comment Added");
//         }
//     })
// });

app.post("/comments/:id", function (req, res) {
    comments.remove({
        _id: req.params.id
    }).then(function (err, removed) {
        if (err) {
            console.log(err);
        } else {
            //console.log("Comment Removed");
        }
    });
});

app.get("/saved", function (req, res) {
    articles.find({ saved: true })
        .then(function (dbArticle) {
            res.render("saved", {articles: dbArticle});
        })
        .catch(function (err) {
            res.json(err)
        });
})



module.exports = app;