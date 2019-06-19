$(document).ready(function () {
    //<-----------------Global Variables----------------->
    var secondsA = 4;
    var secondsB = 8;
    var intervalId;
    var radioButtons = $('input[type="radio"]');
    var questionCounter = 0;
    var finalScore = 0;


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
    },
    {
        question: "Which planet is often referred to as “Earth’s sister planet” due to its similar size and composition?",
        answers: {
            a: "Venus",
            b: "Mercury",
            c: "Saturn",
            d: "Pluto"
        },
        solution: "a"
    }, {
        question: "The Solar System’s lowest temperature of -371 °F is recorded on which planet?",
        answers: {
            a: "Earth",
            b: "Mars",
            c: "Uranus",
            d: "Saturn"
        },
        solution: "c"
    }, {
        question: "In what year was Pluto demoted from Planet to Dwarf Planet?",
        answers: {
            a: "1976",
            b: "1986",
            c: "1996",
            d: "2006"
        },
        solution: "d"
    }, {
        question: "Which planet has the most extensive system of rings in the Solar System?",
        answers: {
            a: "Neptune",
            b: "Uranus",
            c: "Venus",
            d: "Saturn"
        },
        solution: "d"
    }, {
        question: "Approximately how old is the Earth?",
        answers: {
            a: "1.5 Billion Years",
            b: "4.5 Billion Years",
            c: "10.5 Billion Years",
            d: "13.5 Billion Years"
        },
        solution: "b"
    }, {
        question: "The Sun accounts for what percentage of the Solar System's mass?",
        answers: {
            a: "69%",
            b: "79%",
            c: "89%",
            d: "99%"
        },
        solution: "d"
    }, {
        question: "Which planet is the most distant planet from the Sun in the Solar System?",
        answers: {
            a: "Neptune",
            b: "Jupiter",
            c: "Venus",
            d: "Mars"
        },
        solution: "a"
    }, {
        question: "What was the name of the first spacecraft launched to visit the moon by the USSR in 1959?",
        answers: {
            a: "Voyager 1",
            b: "Moonship 1",
            c: "Luna 1",
            d: "Challenger 1"
        },
        solution: "c"
    }]

    $(".start-button").on("click", function () {
        $(".welcome-content").css("display", "none");
        $(".game-content").css("display", "flex");
        $("body").scrollTop(0);
        $(".next-button").click();
    })

    //Here we set an event listener for when the "Start Game!" button is clicked on the home page
    //Clicking the button will hide the welcome screen and display the quiz & timer
    $(".start-button").on("click", thirtySeconds)


    function threeSeconds() {
        intervalId = setInterval(threeSecondsDecrement, 1000)
    }

    function threeSecondsDecrement() {
        if (secondsA > 0) {
            secondsA--;
            $(".timer").html("⏳ " + (secondsA + 1) + " ⏳");
        } else if (secondsA === 0) {
            $(".next-button").click();
        }
    }

    function thirtySeconds() {
        clearInterval(intervalId);
        intervalId = setInterval(thirtySecondsDecrement, 1000);
    }

    function thirtySecondsDecrement() {
        if (secondsB > 0) {
            secondsB--;
            $(".timer").html("<h4>" + "⏳ " + secondsB + " ⏳" + "</h4>");
        }
        else if (secondsB === 0) {
            $("#win-or-loss-message").text("Oh no! You're out of time!");
            $("#correct-answer-message").text("The correct answer was " + triviaQuestions[questionCounter - 1].answers[triviaQuestions[questionCounter - 1].solution]);
            radioButtons.prop("disabled", true);
            clearInterval(intervalId);
            $(".timer").text("⏳ 5 ⏳");
            threeSeconds();
            $("#time-remaining").text("New question in");
            if (questionCounter === 9 && secondsB === 0) {
                $(".time-remaining").empty();
                $(".timer").empty();

            }
        }
    }

    $(".next-button").on("click", function () {
        $(".timer").text("⏳ 30 ⏳");
        secondsB = 8;
        thirtySeconds();
        radioButtons.prop("checked", false);
        radioButtons.prop("disabled", false);
        $("#win-or-loss-message").empty();
        $("#correct-answer-message").empty();
        secondsA = 4;
        $("#time-remaining").text("Time Remaining");
        $("#win-or-loss-message").html("&nbsp;");
        $("#correct-answer-message").html("&nbsp;");
        $("#question-number").text("Question " + (questionCounter + 1))
    })

    $(".finish-button").on("click", function () {
        clearTimeout(intervalId);
        $(".result-content").css("display", "flex");
        $(".welcome-content").css("display", "none");
        $(".game-content").css("display", "none");
    })

    $(".new-game-button").on("click", function () {
        location.reload();
    });

    $(".next-button").on("click", function () {
        if (questionCounter === 9) {
            $(".next-button").css("display", "none");
            $("#finish-button").css("display", "block");
        }

        if (questionCounter < triviaQuestions.length) {
            $(".question").html(triviaQuestions[questionCounter].question);

            $(".answer").attr("name", "question" + questionCounter);

            $(".label-a").attr("for", "question" + questionCounter);
            $(".label-a").html(triviaQuestions[questionCounter].answers.a);

            $(".label-b").attr("for", "question" + questionCounter);
            $(".label-b").html(triviaQuestions[questionCounter].answers.b);

            $(".label-c").attr("for", "question" + questionCounter);
            $(".label-c").html(triviaQuestions[questionCounter].answers.c);

            $(".label-d").attr("for", "question" + questionCounter);
            $(".label-d").html(triviaQuestions[questionCounter].answers.d);

            questionCounter++
        }
    });


    radioButtons.change(function () {
        var isChecked = radioButtons.filter(function () {
            return $(this).prop("checked");
        });

        if (isChecked) {
            radioButtons.prop("disabled", true);
            isChecked.prop("disabled", false);
            clearInterval(intervalId);
            $(".timer").text("⏳ 5 ⏳")
            threeSeconds();
            $("#time-remaining").text("New question in");
        }

        var chosenOption = isChecked.val();
        var correctOption = triviaQuestions[questionCounter - 1].solution;
        var correctAnswer = triviaQuestions[questionCounter - 1].answers[correctOption];

        if (chosenOption == correctOption) {
            $("#win-or-loss-message").text("Nicely Done!");
            $("#correct-answer-message").text("The correct answer is indeed " + correctAnswer);

            finalScore++;

            var numberOfCorrectAnswers = finalScore;
            var numberOfIncorrectAnswers = 10 - finalScore;
            $("#display-trivia-results").text(finalScore * 10 + "%");
            $("#final-tally").text("You got " + numberOfCorrectAnswers + " questions right and " + numberOfIncorrectAnswers + " questions wrong");
        } else {
            $("#win-or-loss-message").text("Oh no, you got it wrong!");
            $("#correct-answer-message").text("The correct answer was " + correctAnswer)
        }
        radioButtons.empty()

    });
});
