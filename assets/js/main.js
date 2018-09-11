var animals = ["Cat", "Dog", "Rat"];


function displayGifInfo() {


    var animal = $(this).attr("data-name");
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=Abb4lfRWr16Xt4c0gx47pcmppApoEVXJ&limit=10";
   // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // YOUR CODE GOES HERE!!!
        var result = response.data;

        var $animalview = $('#animal-view');    
        $animalview.empty();
        for(var i=0;i<result.length;i++){
            var still = result[i].images.fixed_height_still.url;
            var animated = result[i].images.fixed_height.url;

            
            var newDiv = $("<div class='col-12 col-md-6 col-lg-4 span6 animalimg'>");
            
            var newTitle = $("<h5>");
            newTitle
                .addClass("giftxt")
                .text(result[i].title.toUpperCase());
            var newPoster =$('<img src='+still+'>');
            newPoster
                .attr({
                next: animated,
                style: "width:90%;"
            });
            var newScore = $("<h6>");
            newScore.text("Score: "+result[i]._score);

            newDiv.append(newTitle,newPoster,newScore);

            $animalview.append(newDiv);
        }
    });
}

// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons").empty();

    // Loops through the array of movies
    for (var i = 0; i < animals.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button class='btn btn-secondary btn-lg btn-block'>");
      var newDiv = $("<div>");
      // Adds a class of movie to our button
      a.addClass("animal");
      // Added a data-attribute
      a.attr("data-name", animals[i]);
      // Provided the initial button text
      a.text(animals[i].toUpperCase());
      // Added the button to the buttons-view div
      newDiv.append(a);
      $("#buttons").append(newDiv);
    }
}

function changeState(){
    var src = $(this).attr("src");
    console.log(src);

    var nextSrc =  $(this).attr("next");
    $(this).attr("src",nextSrc);
    $(this).attr("next",src);
}


$("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();
    
    // The movie from the textbox is then added to our array
    if(animal.trim() != ""){
        animals.push(animal);
    }

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});


$(document).on("click", ".animal", displayGifInfo);

$(document).on("click", "img", changeState);

renderButtons();