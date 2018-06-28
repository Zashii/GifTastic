var queryURL;
var existingButtons = [];
var arr = ["monkey", "cat", "bird", "snake", "dog"];

//The function that takes in the value of the input box and creates the gifs on screen + the button 
var makeGifs = function(item){
        var didNotExist = true;
        var newButton = $("<button>");
        newButton.html(item);
        newButton.attr("style", "margin-left:5px")
        newButton.attr("data-attribute", item)
        

        for (var i = 0; i < existingButtons.length; i++){
            if (existingButtons[i] == item){
                didNotExist = false;
            }
        }

        if (didNotExist) {
            $("#pastSearches").append(newButton);
            $(".btn-danger").removeClass("btn-danger");
            $(newButton).addClass("btn-danger");
            existingButtons.push(item);
        };

        newButton.on("click", function(){
            $(".btn-danger").removeClass("btn-danger");
            $(this).addClass("btn-danger");
            
            queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=4ZU527S8xWlJTvyDixLk76ikcixmRBqE&limit=20";

            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                
            
            $("#mainWindow").html("");

            for (var i = 0; i < 10; i ++){
                var newGif = $("<img>");
                newGif.attr("data-animate", response.data[i].images.fixed_width_small.url);
                newGif.attr("data-still", response.data[i].images.fixed_width_small_still.url);
                newGif.attr("data-state", "still");
                newGif.attr("src", response.data[i].images.fixed_width_small_still.url);
                newGif.attr("style", "padding-bottom: 30px; height: 125px; width: 150px");
                
                newGif.on("click", function(){
                    if ($(this).attr("data-state") == "still"){
                        $(this).attr("data-state","animate");
                        $(this).attr("src", $(this).attr("data-animate"));
                    } else {
                        $(this).attr("data-state","still");
                        $(this).attr("src", $(this).attr("data-still"));

                    }
                })

                $("#mainWindow").append(newGif);
                $("#mainWindow").append("<span style=\"position: relative; top:45px; right: 115px; text-align: center\">Rating: " + response.data[i].rating + "</span>");
                $("#mainWindow").append("  ");
            };
            });


        });

        if (didNotExist){
            queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=4ZU527S8xWlJTvyDixLk76ikcixmRBqE&limit=20";

                $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {
                    
                $("#mainWindow").html("");
                
                for (var i = 0; i < 10; i ++){
                    var newGif = $("<img>");
                    newGif.attr("data-animate", response.data[i].images.fixed_width_small.url);
                    newGif.attr("data-still", response.data[i].images.fixed_width_small_still.url);
                    newGif.attr("data-state", "still");
                    newGif.attr("src", response.data[i].images.fixed_width_small_still.url);                 
                    newGif.attr("style", "padding-bottom: 30px; height: 125px; width: 150px");

                    newGif.on("click", function(){
                        if ($(this).attr("data-state") == "still"){
                            $(this).attr("data-state","animate");
                            $(this).attr("src", $(this).attr("data-animate"));
                        } else {
                            $(this).attr("data-state","still");
                            $(this).attr("src", $(this).attr("data-still"));

                        }
                    }
                    )

                    $("#mainWindow").append(newGif);
                    $("#mainWindow").append("<span style=\"position: relative; top:45px; right: 115px; text-align: center\">Rating: " + response.data[i].rating + "</span>");
                    $("#mainWindow").append("");
                }
            });
        };
};

//When the document begins
$(document).ready(function(){

    //Create the first 5 buttons
    for (var i = 0; i < arr.length; i++){
        makeGifs(arr[i]);
    }

    //Allow the user to add more buttons when they click the submit button
    $("#add-gif").on("click", function(){
        
        makeGifs($("#animal-input").val());

    });
});
