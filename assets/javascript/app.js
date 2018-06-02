
var animals = ["dolphin", "guinea pig", "parakeet", "racoon", "cow", "puppy", "cat", "lion", "falcon", "panda", "eagle", "otter", "penguin", "wolf", "duck", "cricket", "ferret", "iguana", "chicken", "iguana"]
var still = [];
var moving = [];
var response;

function displayGifs() {
    var searchTerm = $(this).attr("data-name");
    var apiKey = "bw79f5nB2UMqatnUhZCZZ2PYtuvmRjMf"
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (x) {
        response = x;
        console.log(response);
        console.log(response.data[0].images.downsized_still.url);
        $("#left").empty();
        

        for (i = 0; i < 10; i++) {
            var newCard = $("<div>").addClass("gifDisplay");
            newCard.append("<img src=" + response.data[i].images.fixed_height_still.url + ' class="gif" imageNum="1" id="' + i + '">');
            $("#left").append(newCard);
            console.log("should have cards");
            console.log(response.data[i].images.fixed_height_still.url);
        };


    });
}

function createButtons() {
    $("#buttons").empty();

    $.each(animals, function (i, val) {
        var button = $("<button>").text(val).addClass("button").attr("data-name", val);
        $("#buttons").prepend(button);
    });
}




createButtons();

$("#add-searchTerm").on("click", function (event) {
    event.preventDefault();
    var animal = $("#searchTerm-input").val().trim();
    animals.push(animal);
    createButtons();
});

$(document).on("click", ".button", displayGifs);

$(document).on("click", ".gif", function () {
    var item = $(this).attr("id");
    var imageNum = $(this).attr("imageNum");
    if (imageNum == 1) {
        $(this).attr("src", response.data[item].images.fixed_height.url);
        $(this).attr("imageNum", 0);
    } 
    if (imageNum == 0) {
        $(this).attr("src", response.data[item].images.fixed_height_still.url);
        $(this).attr("imageNum", 1); 
    }
    
});