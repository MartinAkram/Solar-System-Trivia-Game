$(document).ready(function () {

    //<--------------------QUIZ ARRAY-------------------->
    //This array contains 10 objects, each of which contains a question, possible solutions, and the solution
    const triviaQuestions = [{
        question: "What is the name of Jupiter’s massive storm that has been raging for more 350 years?",
        answers: {
            a: "The Great Red Storm",
            b: "The Great Red Spot",
            c: "The Great Red Tornado",
            d: "The Great Big Spot"
        },
        solution: "b"
    },
    {
        question: "Who was the first man to walk on the Moon?",
        answers: {
            a: "Neil Armstrong",
            b: "Lance Armstrong",
            c: "Louis Armstrong",
            d: "James Armstrong"
        },
        solution: "a"
    }]
    // }, {
    //     question: "Which planet is often referred to as “Earth’s sister planet” due to its similar size and composition?",
    //     answers: {
    //         a: "Venus",
    //         b: "Mercury",
    //         c: "Saturn",
    //         d: "Pluto"
    //     },
    //     solution: "a"
    // }, {
    //     question: "The Solar System’s lowest temperature of -371 °F is recorded on which planet?",
    //     answers: {
    //         a: "Earth",
    //         b: "Mars",
    //         c: "Uranus",
    //         d: "Saturn"
    //     },
    //     solution: "c"
    // }, {
    //     question: "In what year was Pluto demoted from Planet to Dwarf Planet?",
    //     answers: {
    //         a: "1976",
    //         b: "1986",
    //         c: "1996",
    //         d: "2006"
    //     },
    //     solution: "d"
    // }, {
    //     question: "Which planet has the most extensive system of rings in the Solar System?",
    //     answers: {
    //         a: "Neptune",
    //         b: "Uranus",
    //         c: "Venus",
    //         d: "Saturn"
    //     },
    //     solution: "d"
    // }, {
    //     question: "Approximately how old is the Earth?",
    //     answers: {
    //         a: "1.5 Billion Years",
    //         b: "4.5 Billion Years",
    //         c: "10.5 Billion Years",
    //         d: "13.5 Billion Years"
    //     },
    //     solution: "b"
    // }, {
    //     question: "The Sun accounts for what percentage of the Solar System's mass?",
    //     answers: {
    //         a: "69%",
    //         b: "79%",
    //         c: "89%",
    //         d: "99%"
    //     },
    //     solution: "d"
    // }, {
    //     question: "Which planet is the most distant planet from the Sun in the Solar System?",
    //     answers: {
    //         a: "Neptune",
    //         b: "Jupiter",
    //         c: "Venus",
    //         d: "Mars"
    //     },
    //     solution: "a"
    // }, {
    //     question: "What was the name of the first spacecraft launched to visit the moon by the USSR in 1959?",
    //     answers: {
    //         a: "Voyager 1",
    //         b: "Moonship 1",
    //         c: "Luna 1",
    //         d: "Challenger 1"
    //     },
    //     solution: "c"
    // }]


    //Below we define our first major function, the one which displays the quiz to the player
    //Please see inline comments for explanations of each steps
    function displayTriviaQuiz(arr) {
        var htmlOutput = [];
        var answers;

        for (var i = 0; i < triviaQuestions.length; i++) {
            var answers = [];

            for (answerOption in arr[i].answers) {
                answers.push('<div class="form-check form-check-inline">'
                    + '<label class="form-check-label">'
                    + '<input class="form-check-input" type="radio" name="question' + i + '" value="' + answerOption + '">'
                    + ' '
                    + arr[i].answers[answerOption] + '&nbsp'
                    + '</label>'
                    + '</div>');
            }

            htmlOutput.push(
                '<div class="question text-center">'
                + arr[i].question
                + '</div>'
                + '<div class=" text-center">' + answers.join('') + '</div>'
                + '<br>'
                + '<hr style="border-top: 1px dashed chartreuse; width: 50%">'
                + '<br>');
        }
        $("#display-trivia-questions").html(htmlOutput);
        console.log(htmlOutput)
    }

    //Here we immediately call our displayTriviaQuiz function and pass it our list of questions as an argument
    displayTriviaQuiz(triviaQuestions)


    //Below we define our second major function, which is very similar to the displayTriviaQuestions
    //This function, however, will display the solutions and will not take an input from the player
    function displayTriviaSolutions(arr) {
        var htmlOutput = [];

        for (var i = 0; i < triviaQuestions.length; i++) {
            htmlOutput.push('<div class="question text-center">'
                + arr[i].question
                + '</div>'
                + '<div class="solution text-center">'
                + arr[i].solution
                + '</div>'
                + '<br>'
                + '<hr style = "border-top: 1px dashed chartreuse; width: 50%">'
                + '<br>');
        }
        $("#display-trivia-results").html(htmlOutput);
    }

    displayTriviaSolutions(triviaQuestions);

    //Below we define a new function to tally up the results
    //If the player gets an answer correct, they add 10% to their score, for a total possible point of 100%
    function scoreTriviaGame(arr) {
        displayTriviaQuiz(triviaQuestions);
        var listOfAnswers = document.getElementById("display-trivia-questions").querySelectorAll('.answer');

        for (var i = 0; i < triviaQuestions.length; i++) {
            chosenAnswer = (listOfAnswers[i].querySelector("input[name=question" + i + "]:checked")).value;
            console.log(chosenAnswer)
        }

    }


    //<--------------------EVENT LISTENERS-------------------->

    //Here we set an event listener for when the "Start Game!" button is clicked on the home page
    //Clicking the button will hide the welcome screen and display the quiz & timer
    $(".start-button").on("click", function () {
        $(".welcome-content").css("display", "none");
        $(".game-content").css("display", "flex");
        $("body").scrollTop(0);
        //startGame()
    })

    //Here we add a second event listener for the "Start Game!" button on the home page
    //Clicking the button will get the timer started
    $(".start-button").on("click", threeMinutes)

    //Below I define the timer functionality of the app
    var seconds = 180;
    var intervalId;

    //This function sets the interval for the game
    function threeMinutes() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000)
    }

    //This function decreases the time by one second and updates the html accordingly
    function decrement() {
        if (seconds > 0) {
            seconds--;
            $(".timer").html("<h4>" + "⏳ " + seconds + " ⏳" + "</h4>")
        }
    }

    //Here we set an event listener for when the "Done!" button is clicked on the quiz page
    $(".finish-button").on("click", function () {
        $(".game-content").css("display", "none");
        $(".result-content").css("display", "flex");
        $("body").scrollTop(0)
        scoreTriviaGame(triviaQuestions);
    })

    //Here we add a second event listener for the "Done!" button on the quiz page
    $(".finish-button").on("click", pause)

    //This function freezes the timer once the "Done!" button is clicked
    function pause() {
        clearTimeout(intervalId);
    }

    //Here we set an event listener for when the "Play Again!" button is clicked on the results page
    //It simply refreshes the game and starts everything from scratch
    $(".new-game-button").on("click", function () {
        location.reload()
    })
})