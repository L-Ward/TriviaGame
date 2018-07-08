$(document).ready(function () {
    //variables
    var game = {
        questions: [
            {
                question: "What is Star-Lord's real name?",
                answers: ["Peter Dinklage", "Peter Parker", "Peter Venkman", "Peter Quill"],
                indexOfCorrectAnswer: 3
            },
            {
                question: "The first scene of the movie takes place on Earth in what year?",
                answers: ["1988", "1985", "1987", "1980"],
                indexOfCorrectAnswer: 0
            }
            // {
            //     question: "",
            //     answers: ["", "", "", ""],
            //     indexOfCorrectAnswer:
            // }
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
    //BUILDERS -- Screen Builders

    //Start Screen
    function startScreenBuilder() {
        //create screen content
        var startRow = $("<div>").addClass("row justify-content-center");
        var startCol = $("<div>").addClass("col-xs-12");
        var startBtn = $("<button>").addClass("btn-primary start-button").text("Start");

        //append content
        $(startCol).append(startBtn)
        $(startRow).append(startCol);
        $(".container").append(startRow);
        $(".start-button").click

        //move to next screen
        $(".start-button").click(start);
    }

    //Question Screen
    function questionScreenBuilder() {
        if (questionCounter < game.questions.length) {
            //timer
            var timerRow = $("<div>").addClass("row justify-content-center");
            var timerCol = $("<div>").addClass("col-xs-12 timer-col");
            //question
            var questionRow = $("<div>").addClass("row justify-content-center question-row");
            var questionCol = $("<div>").addClass("col-xs-12 question-col");

            //append and display timer
            $(timerRow).append(timerCol);
            $(".container").append(timerRow);
            timer();

            // append and display questions
            displayQuestion = game.questions[questionCounter].question;
            $(questionRow).append(questionCol);
            $(questionCol).append(displayQuestion);
            $(".container").append(questionRow);

            //Answers
            //looping through answer array to list answers
            for (var i = 0; i < game.questions[questionCounter].answers.length; i++) {
                //creating elements for answers
                var answerRow = $("<div>").addClass("row justify-content-center");
                var answerCol = $("<div>").addClass("col-xs-12 answer-options").attr("value", i);
                //appending answers
                $(answerRow).append(answerCol);
                $(answerCol).append(game.questions[questionCounter].answers[i]);
                $(".container").append(answerRow);
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
        var resultRow = $("<div>").addClass("row justify-content-center");
        var resultCol = $("<div>").addClass("col-xs-12 result-col");
        //display correct answer
        var correctAnswerRow = $("<div>").addClass("row justify-content-center");
        var correctAnswerCol = $("<div>").addClass("col-xs-12");
        var indexOfAnswer = game.questions[questionCounter].indexOfCorrectAnswer;
        var answer = game.questions[questionCounter].answers[indexOfAnswer];

        // append and display results
        $(resultRow).append(resultCol);
        $(".container").append(resultRow);

        //display correct answer
        if (playerAnswer != indexOfAnswer) {
            $(correctAnswerCol).text("The correct answer is: " + answer + ".");
            $(correctAnswerRow).append(correctAnswerCol);
            $(".container").append(correctAnswerRow);
        }

        //ADD GIFS!!!!!!!!!!!

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
        $(".container").append(finishedRow, correctRow, incorrectRow, unasweredRow, startOverRow);
        
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

    //empty container div
    function empty() {
        $(".container").empty();
    }

});