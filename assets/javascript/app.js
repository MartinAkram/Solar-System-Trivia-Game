//Click Start Button to start game
$(".start-button").on("click", function () {
    $(".welcome-content").css("display", "none");
    $(".game-content").css("display", "flex");
    $("body").scrollTop(0);
})

$(".finish-button").on("click", function () {
    $(".game-content").css("display", "none");
    $(".result-content").css("display", "flex");
    $("body").scrollTop(0)
})

//Start Timer Function


$(".start-button").on("click", threeMinutes)

var seconds = 1;
var intervalId;

function threeMinutes() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000)
}

function decrement() {
    if (seconds > 0) {
        seconds--;
        $(".timer").html("<h4>" + "⏳ " + seconds + " ⏳" + "</h4>")
        // } else if (seconds === 0) {
        //     alert("Game Over");
        //finalGrade()
    }
}

var finalGrade;