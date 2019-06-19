$(document).ready(function () {
    //We start by defining our global variables
    //secondsA & secondsB are seconds that will be used for 2 different timers
    var secondsA = 2;
    var secondsB = 20;
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

    //We start by adding 2 event listeners to the "start-button" on the welcome-page
    //The first event listener does the following:
    //----Hide the the welcome-content screen, 
    //----Show the game-content screen
    //----Scroll to the top of the page
    //----And clicks the "next-button"
    $(".start-button").on("click", function () {
        $(".welcome-content").css("display", "none");
        $(".game-content").css("display", "flex");
        $("body").scrollTop(0);
        $(".next-button").click();
    })

    //Here we add a second event listener to the "start-button" on the welcome-page
    //It calls the the "twentySeconds" function
    $(".start-button").on("click", twentySeconds)

    //Here we define our first timing function, called "threeSeconds"
    //This timer function only gets called when our second timer function, called "twentySeconds", is finished
    //This function calls another function called "threeSecondsDecrement"
    function threeSeconds() {
        intervalId = setInterval(threeSecondsDecrement, 1000)
    }

    //Here we define our "threeSecondsDecrement" function
    //It counts down 3 seconds
    //It fires after the initial 20 seconds for each question are completed
    //It tells the player that they have 3 seconds left before the see the next question
    function threeSecondsDecrement() {
        if (secondsA > 0) {
            secondsA--;
            $(".timer").html("⏳ " + (secondsA + 1) + " ⏳");
        } else if (secondsA === 0 && questionCounter !== 10) {
            $(".next-button").click();
        }
    }

    //Here we define our second timing function, called "twentySeconds"
    //This timing functions fires first, but we declared it second because it calls "threeSeconds" inside itself
    //This function calls another function called "twentySeconds Decrement"
    function twentySeconds() {
        clearInterval(intervalId);
        intervalId = setInterval(twentySecondsDecrement, 1000);
    }

    //Here we define our "twentySecondsDecrement" function
    //This is a MASSIVE function with various components
    //Please look for comments inside the function that describe each component
    function twentySecondsDecrement() {
        //The first part is simple; it simply counts fown from 20 to 0 and puts the total on the html page
        if (secondsB > 0) {
            secondsB--;
            $(".timer").html("<h4>" + "⏳ " + secondsB + " ⏳" + "</h4>");
        }
        //The first condition executes if the seconds total (dummed "secondsB") reaches 0
        else if (secondsB === 0) {
            //Upon reaching 0, it means the user didn't select an answer in their allotted time
            //It displays a message telling the player they ran out of time 
            $("#win-or-loss-message").text("Oh no! You ran out of time!");
            //Then it shows them the right answer
            $("#correct-answer-message").text("The correct answer was " + triviaQuestions[questionCounter - 1].answers[triviaQuestions[questionCounter - 1].solution]);
            //It also disables the radio buttons so the player can't choose an answer after they've seen the solution
            radioButtons.prop("disabled", true);
            //And finally it clears the time interval so it doesn't continue to count into negative numbers territory
            clearInterval(intervalId);
            if (questionCounter < 10) {
                //Here we add our first of two sub-conditions
                //If secondsB = 0 and we're NOT on the final question (i.e. questions 1-9 only)
                //Then we call the "threeSeconds" function that warns the user they have 3 seconds before the see the next question
                $(".timer").text("⏳ 5 ⏳");
                threeSeconds();
                $("#time-remaining").text("New question in")
            }
            else if (questionCounter === 10) {
                //Here we add our second of two sub-conditions
                //If secondsB = 0 and we ARE on the final question (i.e. question 10 only)
                //Then we clear the time interval and we SKIP calling "threeSeconds" function
                //We then tell the player the game is over and display the "finish-button" which we hid in the css file
                clearTimeout(intervalId);
                $(".timer").remove();
                $("#time-remaining").text("Game Over!");
                $("#finish-button").css("display", "block");
            };
        }
    }

    //Here we add our first event listener for the "next-button"
    //IMPORTANT: The user never actually clicks the button; the click happens within the "threeSeconds" functions
    $(".next-button").on("click", function () {
        //First we set the html element "timer" to be 20 seconds
        $(".timer").text("⏳ 20 ⏳");
        //Then we re-define secondsB to 20
        secondsB = 20;
        //And immediately after, we call the twentySeconds function
        twentySeconds();
        //We then make sure all radio buttons are unchecked and *not* disabled (i.e. enabled)
        radioButtons.prop("checked", false);
        radioButtons.prop("disabled", false);
        //We hide the win/lose messages
        $("#win-or-loss-message").empty();
        //We also hide the solution
        $("#correct-answer-message").empty();
        //We also reset secondsA to 2 for teh next itteration
        secondsA = 2;
        //And we update the html elements of "time-remaining", "win-or-loss-message", and "correct-answer-message" to be empty
        $("#time-remaining").text("Time Remaining");
        $("#win-or-loss-message").html("&nbsp;");
        $("#correct-answer-message").html("&nbsp;");
        //And we display the number of question so the player can keep track of their progress (ex: Question 5)
        $("#question-number").text("Question " + (questionCounter + 1))
    })

    //Here we add our second event listener for the "next-button"
    $(".next-button").on("click", function () {
        //The "next-button" gets "clicked" (again, user isn't clicking, the threeSeconds function is) as long as the questionCounter is less than 11
        if (questionCounter < triviaQuestions.length && questionCounter < 11) {
            //Here we update the html element "question" with our question by referencing our array of objects
            $(".question").html(triviaQuestions[questionCounter].question);

            $(".answer").attr("name", "question" + questionCounter);

            //Here we have 4 repeated events for the various answer options for each question (a, b, c, d)
            //First we add a new attribute called "for" to each label for the right question (ex: question1, question 2, etc...)
            //This allows us to group our 4 radio buttons to compare them later
            //Then we update the html for each label to display its corresponding solution option
            $(".label-a").attr("for", "question" + questionCounter);
            $(".label-a").html(triviaQuestions[questionCounter].answers.a);

            $(".label-b").attr("for", "question" + questionCounter);
            $(".label-b").html(triviaQuestions[questionCounter].answers.b);

            $(".label-c").attr("for", "question" + questionCounter);
            $(".label-c").html(triviaQuestions[questionCounter].answers.c);

            $(".label-d").attr("for", "question" + questionCounter);
            $(".label-d").html(triviaQuestions[questionCounter].answers.d);

            //Then we update the questionCounter by adding 1
            questionCounter++
        }
    });

    //Here we an event listener for the "finish-button"
    //This event listener is only for styling
    //It hides/shows the desired html contents
    //And it clears the time-interval for the next iteration
    $(".finish-button").on("click", function () {
        clearTimeout(intervalId);
        $(".result-content").css("display", "flex");
        $(".welcome-content").css("display", "none");
        $(".game-content").css("display", "none");
    })

    //Here we add a "change" function to our radioButtons
    //This is a MASSIVE function with a lot of moving parts
    radioButtons.change(function () {
        //We begin by defining a variable called "isChecked"
        //This variable is set to a function that returns whether a radio button is checked
        var isChecked = radioButtons.filter(function () {
            return $(this).prop("checked");
        });

        //If we confirm a certain radio button is checked, then we enter the following conditional statement
        if (isChecked) {
            //First we disable all radio buttons so the player can't change their choice
            radioButtons.prop("disabled", true);
            //Then we enable the checked button immediately to highlight which choice the player chose
            isChecked.prop("disabled", false);
            //Then we clear the time interval for the twentySeconds function
            clearInterval(intervalId);
            //We reset the html text of "timer" to 3
            $(".timer").text("⏳ 3 ⏳")
            //And we immediately call the threeSeconds function
            //This function informs the player that now that their selection is complete, they have 3 seconds until the next question shows up
            threeSeconds();
            $("#time-remaining").text("New question in");

            //Here we add our first sub-conditional statement
            //If a radio button is checked AND the seconds of the threeSeconds function = 0 AND questionsCounter = 1-9 then do the following:
            //CRITICAL NOTE: the questionCounter function only updates IF the player chooses a radio button
            //It's entirely possible that the player answeres questions 1-9, and skips answering question 10
            //In that case, questionCounter stays at value 9 EVEN THOUGH Question 10 is displayed to the player
            if (questionCounter === 9 && secondsA === 1) {
                //We remove the timer element from the html page
                $(".timer").remove();
                //We tell the player the game is over
                $("#time-remaining").text("Game Over!");
                //And we display the "finish-button"
                $("#finish-button").css("display", "block");
            }

            //Here we add our second sub-conditional statement
            //If a radio button is checked AND the questionCounter is at 10, then do the following:
            else if (questionCounter === 10) {
                //We remove the timer element from the html page
                $(".timer").remove();
                //We tell the player the game is over
                $("#time-remaining").text("Game Over!");
                //And we display the "finish-button"
                $("#finish-button").css("display", "block");
            }
        }

        //Here we define three variables REGARDLESS of whether or not a radio button is checked

        //The variable "chosenOption" returns the value of our isChecked variable (which is itself a function)
        var chosenOption = isChecked.val();

        //The variable "correctAnswer" stores the right OPTION (ex: a, b, c, d) for each question by looking to our array of objects
        var correctOption = triviaQuestions[questionCounter - 1].solution;

        //The variable "correctAnswer" stores the right ANSWER (ex: "The Great Red Spot") for each question by looking to our array of objects
        var correctAnswer = triviaQuestions[questionCounter - 1].answers[correctOption];

        //Here we evaluate if the user chose the right radio button
        //If they did, do the following:
        if (chosenOption == correctOption) {
            //Display a short congratulations message
            $("#win-or-loss-message").text("Nicely Done!");
            //Display a message confirming that the indeed chose the right answer
            $("#correct-answer-message").text("The correct answer is indeed " + correctAnswer);

            //Then update the score by 1
            finalScore++;

            //Next we define two variables to keep track of how many questions the player got right
            var numberOfCorrectAnswers = finalScore;
            var numberOfIncorrectAnswers = 10 - finalScore;
            //And then we display the results on the "result-content" element of the html
            //We give the player a total score in percentages, and then break it down by number (number right vs number wrong)
            $("#display-trivia-results").text(finalScore * 10 + "%");
            $("#final-tally").text("You got " + numberOfCorrectAnswers + " questions right and " + numberOfIncorrectAnswers + " questions wrong");
        }

        //Else if the player did not choose the right radio button, do the following:
        else {
            //Display a short message of regret
            $("#win-or-loss-message").text("Oh no, you got it wrong!");
            //Display a message informing the player of the correct answer they missed
            $("#correct-answer-message").text("The correct answer was " + correctAnswer)
        }

        //Then we finally clear the value of our radio buttons ahead of the next iteration
        radioButtons.empty()
    });

    //Here we add a simple event listener on the "new-game-button"
    //It reloads the page to allow the player to start a new game
    $(".new-game-button").on("click", function () {
        location.reload();
    });
});
