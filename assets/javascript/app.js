//Click Start Button to start game
$(".start-button").on("click", function () {
    $(".welcome-content").css("display", "none");
    $(".game-content").css("display", "flex")
})

//Start Timer Function


$(".start-button").on("click", twoMinutes)

var seconds = 180;
var intervalId;

function twoMinutes() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000)
}

function decrement() {
    seconds--;
    $(".timer").html("<h4>" + "⏳ " + seconds + " ⏳" + "</h4>")
}