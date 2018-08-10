$(document).ready(function(){

    $.getJSON("/scrape", function(data){

    });

    $(document).on("click", "#getArticles", function(){
        $.getJSON("/articles", function(data){
            for (var i = 0; i < data.length; i++) {
                $("#article").append("<p data-id'" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
            }
        });
    });

    $(document).on("click", "#addComment", function(){
       var articleId = $(this).data("id");

       $.ajax({
           method: "POST",
           url: "/comments/" + articleId,
           data: {
               name: $("#name").val(),
               comment: $("#commentText").val()
           }
       })
       .then(function(data){
           console.log(data);
       });
       $("#name").val("");
       $("#commentText").val("");
    })
})

