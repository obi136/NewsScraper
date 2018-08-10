var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    comment: {
        type: Schema.Types.ObjectId,
        ref: "comment"
    }
  
});

var Article = mongoose.model("Articles", ArticleSchema);

module.exports = Article;