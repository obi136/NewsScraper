$(document).ready(function(){


    $.getJSON("/scrape", function(data){

    });

    $(document).on("click", "#articlesID", function(){
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
                $("#articlesID").append("<p data-id=" + data[i]._id + ">" + data[i].title + "</p>" + "<p> <a href=" + dataLink + " class='link'>" + dataLink + "</a>" + "</p>");
                
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

