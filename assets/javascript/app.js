$(document).ready(function () {
    //variables
    var game = {
        questions: [
            {
                question: "What is Star-Lord's real name?",
                answers: ["Peter Dinklage", "Peter Parker", "Peter Venkman", "Peter Quill"],
                indexOfCorrectAnswer: 3,
                img: function () {
                    var img = new Image();
                    img.src = "assets/images/starlord.gif";
                    return img;
                }
            },
            {
                question: "In the fight which lead to the Guardians of the Galaxy getting arrested on Zandar, what body body parts did Groot have cut off by Gamora?",
                answers: ["Arms", "Legs", "Head", "One arm and one leg"],
                indexOfCorrectAnswer: 0,
                img: function () {
                    var img = new Image();
                    img.src = "assets/images/Groot.gif";
                    return img;
                }
            },
            {
                question: "What is the name on the mix tape young Peter is listening to at the hospital?",
                answers: ["Music Volume 1", "80s Hits 1", "Awesome Mix Vol. 1", "Star's Music Mix 1"],
                indexOfCorrectAnswer: 2,
                img: function () {
                var img = new Image();
                img.src = "assets/images/awesome-mix.gif";
                return img;
                }
            },
            {
                question: "Which of the Guardian of the Galaxy is the result of an illegal genetic experiment on a lower life form?",
                answers: ["Groot", "Rocket", "Gamora", "Drax"],
                indexOfCorrectAnswer: 1,
                img: function () {
                var img = new Image();
                img.src = "assets/images/Rocket.gif";
                return img;
                }
            },
            {
                question: "At the prison, what color is the clothing all prisoners are wearing?",
                answers: ["yellow", "brown", "orange", "black"],
                indexOfCorrectAnswer: 0,
                img: function () {
                var img = new Image();
                img.src = "assets/images/yellow-clothes.gif";
                return img;
                }
            },
            {
                question: "While in prison, Rocket asks the others to retrieve 3 items for their escape. A guard's security band, a quarnex batter, what is the third item?",
                answers: ["A small explosive", "An electronic eye", "A guard's communication device", "A prosthetic leg"],
                indexOfCorrectAnswer: 3,
                img: function () {
                var img = new Image();
                img.src = "assets/images/leg.gif";
                return img;
                }
            },
            {
                question: "What media device does Peter Quill keep with him?",
                answers: ["An iPod", "A walkman", "A Zune", "A discman"],
                indexOfCorrectAnswer: 1,
                img: function () {
                var img = new Image();
                img.src = "assets/images/walkman.gif";
                return img;
                }
            },
            {
                question: "On Peter's ship Gamora claimed it was dirty. Peter said that if he had what, it would look like a Jackson Pollocl painting?",
                answers: ["A sponge", "A coat of Paint", "A blacklight", "A cleaner"],
                indexOfCorrectAnswer: 2,
                img: function () {
                var img = new Image();
                img.src = "assets/images/black-light.gif";
                return img;
                }
            }
        ]
    }
    var displayQuestion;
    var questionCounter = 0;
    var timerNumber = 30;
    var questionIntervalId;
    var resultIntervalId;
    var isPlayerAnswerChosen = false;
    var playerAnswer;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;

    startScreenBuilder();

    //functions
    //BUILDERS
    //Start Screen
    function startScreenBuilder() {
        //create screen content
        var startRow = $("<div>").addClass("row justify-content-center");
        var startCol = $("<div>").addClass("col-xs-12");
        var startBtn = $("<button>").addClass("btn-primary start-button").text("Start");

        //append content
        $(startCol).append(startBtn)
        $(startRow).append(startCol);
        $(".container-js-content").append(startRow);
        $(".start-button").click

        //move to next screen
        $(".start-button").click(start);
    }

    //Question Screen
    function questionScreenBuilder() {
        if (questionCounter < game.questions.length) {
            //timer
            var timerRow = $("<div>").addClass("row justify-content-center timer-row");
            var timerCol = $("<div>").addClass("col-xs-12 timer-col");
            //question
            var questionRow = $("<div>").addClass("row justify-content-center question-row");
            var questionCol = $("<div>").addClass("col-xs-12 question-col");

            //append and display timer
            $(timerRow).append(timerCol);
            $(".container-js-content").addClass("question-content").append(timerRow);
            timer();

            // append and display questions
            displayQuestion = game.questions[questionCounter].question;
            $(questionRow).append(questionCol);
            $(questionCol).append(displayQuestion);
            $(".container-js-content").append(questionRow);

            //Answers
            //looping through answer array to list answers
            for (var i = 0; i < game.questions[questionCounter].answers.length; i++) {
                //creating elements for answers
                var answerRow = $("<div>").addClass("row justify-content-center");
                var answerCol = $("<div>").addClass("col-xs-12 answer-options").attr("value", i);
                //appending answers
                $(answerRow).append(answerCol);
                $(answerCol).append(game.questions[questionCounter].answers[i]);
                $(".container-js-content").append(answerRow);
            }
            //get player's answer
            $(".answer-options").click(answerSelection);
        } else {
            //display finished screen
            finishedScreenBuilder();
        }
    }

    //Answer Screen
    function resultScreenBuilder() {
        // result of user input: correct, incorrect or out of time
        var resultRow = $("<div>").addClass("row justify-content-center result");
        var resultCol = $("<div>").addClass("col-xs-12 result-col");
        //display correct answer
        var correctAnswerRow = $("<div>").addClass("row justify-content-center");
        var correctAnswerCol = $("<div>").addClass("col-xs-12");
        var indexOfAnswer = game.questions[questionCounter].indexOfCorrectAnswer;
        var answer = game.questions[questionCounter].answers[indexOfAnswer];
        //GIF container
        var gifRow = $("<div>").addClass("row justify-content-center result");
        var gifCol = $("<div>").addClass("col-xs-12 image-container");
        // append and display results
        $(resultRow).append(resultCol);
        $(".container-js-content").append(resultRow);

        //display correct answer
        if (playerAnswer != indexOfAnswer) {
            $(correctAnswerCol).text("The correct answer is: " + answer + ".");
            $(correctAnswerRow).append(correctAnswerCol);
            $(".container-js-content").append(correctAnswerRow);
        }

        //display GIFs
        $(gifCol).append(game.questions[questionCounter].img());
        $(gifRow).append(gifCol);
        $(".container-js-content").append(gifRow);



        //Move to next screen after 5 seconds
        resultIntervalId = setInterval(nextQuestion, 5000);
    }

    //Finished Screen
    function finishedScreenBuilder() {
        //create elements for display
        var finishedRow = $("<div>").addClass("row justify-content-center");
        var finishedCol = $("<div>").addClass("col-xs-12 result-col").html("<h2>All done, here's how you did!</h2>");

        var correctRow = $("<div>").addClass("row justify-content-center");
        var correctCol = $("<div>").addClass("col-xs-12 result-col").html("<span> Correct answers: " + correctAnswers + " </span>");

        var incorrectRow = $("<div>").addClass("row justify-content-center");
        var incorrectCol = $("<div>").addClass("col-xs-12 result-col").html("<span> Incorrect answers: " + incorrectAnswers + " </span>");

        var unasweredRow = $("<div>").addClass("row justify-content-center");
        var unasweredCol = $("<div>").addClass("col-xs-12 result-col").html("<span> Unaswered questions: " + unanswered + " </span>");

        var startOverRow = $("<div>").addClass("row justify-content-center");
        var startOverCol = $("<div>").addClass("col-xs-12 result-col").html("<h2 class='try-again'> Try again? </h2>");

        //Append elements and display to html
        $(finishedRow).append(finishedCol);
        $(correctRow).append(correctCol);
        $(incorrectRow).append(incorrectCol);
        $(unasweredRow).append(unasweredCol);
        $(startOverRow).append(startOverCol);
        $(".container-js-content").append(finishedRow, correctRow, incorrectRow, unasweredRow, startOverRow);
        
        $(".try-again").click(tryAgain);
    }

    //HANDLERS
    //Start button
    function start() {
        empty();
        questionScreenBuilder();
    }

    //Question timer
    function timer() {
        clearInterval(questionIntervalId);
        //Display timer
        $(".timer-col").html("<h2>" + timerNumber + "</h2>");
        questionIntervalId = setInterval(decrement, 1000);
    }
    //Question Timer - Decrement function
    function decrement() {
        //Decrement timer number
        timerNumber--;
        //Display timer
        $(".timer-col").html("<h2>" + timerNumber + "</h2>");
        //Time up
        if (timerNumber === 0) {
            stop(questionIntervalId);
            // display result screen when player runs out of time
            empty();
            resultScreenBuilder();
            $(".result-col").html("<h2> You ran out of time </h2>");
            unanswered++;
        }
    }

    //Timer - Stop function
    function stop(intervalId) {
        //  Clears our intervalId
        clearInterval(intervalId);
    }

    //Answer selection handler
    function answerSelection() {
        if (isPlayerAnswerChosen === false) {
            isPlayerAnswerChosen = true;
            playerAnswer = $(this).attr("value");
            empty();
            resultScreenBuilder();
            checkAnswer();
        }
    }

    //Next Question
    function nextQuestion() {
        timerNumber = 30;
        stop(resultIntervalId);
        empty();
        questionCounter++;
        isPlayerAnswerChosen = false;
        questionScreenBuilder();
    }

    //Try again
        function tryAgain() {  
            displayQuestion;
            questionCounter = 0;  
            correctAnswers = 0;
            incorrectAnswers = 0;
            unanswered = 0;
            isPlayerAnswerChosen = false;
            timerNumber = 30;
            stop(questionIntervalId);
            stop(resultIntervalId);
            start();
        }

    //RANDOM FUNCTIONS
    //check if answer is correct
    function checkAnswer() {
        if (parseInt(playerAnswer) === game.questions[questionCounter].indexOfCorrectAnswer) {
            //display correct in h2
            $(".result-col").html("<h2> Correct! </h2>");
            correctAnswers++;
            stop(questionIntervalId);
        } else {
            //display incorrect
            $(".result-col").html("<h2> Incorrect! </h2>");
            stop(questionIntervalId);
            incorrectAnswers++;
        }
    }

    //empty container-js-content div
    function empty() {
        $(".container-js-content").empty();
    }

});