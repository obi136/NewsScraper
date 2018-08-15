$(document).ready(function(){


    $.getJSON("/scrape", function(data){

    });

    $(document).on("click", "#scrapeNew", function(){
        console.log("click");
        $.getJSON("/articles", function(data){
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var dataLink = data[i].link
                var lastChar = dataLink[dataLink.length -1];
                if(lastChar === "/"){
                    console.log("found slash");
                    dataLink[(dataLink.length -1)] = "";
                }
                $("#articlesID").html("New Articles Found");
                $("#articlesNew").append("<h3 data-id=" + data[i]._id + ">" + data[i].title + "</h3>" + "<p> <a href=" + dataLink + " class='link'>" + dataLink + "</a>" + "</p>" + "<p> <input type='text' id='commentText' class='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default'> <button type='button' id='addComment' data-value='" + data[i]._id + "'class='btn btn-primary btn-lg btn-block'>Post Comment</button> </p>" + "<p> <button type='button' id='saveArticle' data-value2='" + data[i]._id + "'class='btn btn-warning btn-lg btn-block'>Save Article</button> </p>");                
            }
        });
    });

    $(document).on("click", "#clearArticlesButton", function(){
        console.log("clickCLEARBTn");
        var emptyDiv1 = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4 id='articlesID'>No New Articles</h4>",
                "</div>"
            ].join("")
        );

        var emptyDiv2 = $(
            [
                "<div class='card text-whote bg-dark'>",
                "<div class='card-header text-center' id='articlesNew'>",
                "</div>"
            ].join("")
        );
        $("#articlesID").html(emptyDiv1);
        $("#articlesNew").html(emptyDiv2);
    });

    $(document).on("click", "#clearArticlesTop", function(){
        console.log("clickCLEARTOP");
        var emptyDiv1 = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4 id='articlesID'>No New Articles</h4>",
                "</div>"
            ].join("")
        );

        var emptyDiv2 = $(
            [
                "<div class='card text-whote bg-dark'>",
                "<div class='card-header text-center' id='articlesNew'>",
                "</div>"
            ].join("")
        );
        $("#articlesID").html(emptyDiv1);
        $("#articlesNew").html(emptyDiv2);
    });

    $(document).on("click", "#addComment", function(){
       var articleId = $(this).attr("data-value");
        
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

    $(document).on("click", "#saveArticle", function(){
        var savedArticleId = $(this).attr("data-value2");

        $.ajax({
            method: "PUT",
            url: "/saved",
            data: savedArticleId
        }).then(function(data){
            console.log(data);
        });
        $("#articlesNew").append("<h3 data-id=" + data[i]._id + ">" + data[i].title + "</h3>" + "<p> <a href=" + dataLink + " class='link'>" + dataLink + "</a>" + "</p>" + "<p> <input type='text' id='commentText' class='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default'> <button type='button' id='addComment' data-value='" + data[i]._id + "'class='btn btn-primary btn-lg btn-block'>Post Comment</button> </p>");
    })
})

