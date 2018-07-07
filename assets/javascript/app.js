$(document).ready(function () {
    //variables
    var game = {
        questions: [
            {
                question: "What is Star-Lord's real name?",
                answer1: "Peter Dinklage",
                answer2: "Peter Parker",
                answer3: "Peter Venkman",
                answer4: "Peter Quill",
                correctAnswer: "answer4",
            },
            {
                question: "The first scene of the movie takes place on Earth in what year?",
                answer1: "1988",
                answer2: "1985",
                answer3: "1987",
                answer4: "1980",
                indCorrectAnswer: "answer1",
            }
            // {
            //     question: "",
            //     answer1: "",
            //     answer2: "",
            //     answer3: "",
            //     answer4: "",
            //     indCorrectAnswer: "",
            // }
        ]
    }
    var questionCount = "0";
    var timerNumber = 30;
    var intervalId;

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

    function questionScreenBuilder() {
        //timer
        var timerRow = $("<div>").addClass("row justify-content-center");
        var timerCol = $("<div>").addClass("col-xs-12 timer-col");
        //question
        var questionRow = $("<div>").addClass("row justify-content-center question-row");
        var questionCol = $("<div>").addClass("col-xs-12 question-col");
        //answers
        var answerRow = $("<div>").addClass("row justify-content-center");
        var answerCol = $("<div>").addClass("col-xs-12");

        //append timer
        $(timerRow).append(timerCol);
        $(".container").append(timerRow)
        timer();
        //display
        // for (var i = 0; i < game.questions.length; i++) {
        //     console.log(game.questions[i].question);
        // }
    }

    //BUILDERS -- Element builders

    //HANDLERS
    //Start button
    function start() {
        empty();
        questionScreenBuilder();
    }

    //timer
    function timer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        //  Decrease number by one.
        timerNumber--;
        //  Show the number in the #show-number tag.
        $(".timer-col").html("<h2>" + timerNumber + "</h2>");
        //  Once number hits zero...
        if (timerNumber === 0) {
            //  ...run the stop function.
            stop();
            //  Alert the user that time is up.
            alert("Time Up!");
        }
    }
    //  The stop function
    function stop() {
        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
    }

    //RANDOM FUNCTIONS
    function empty() {
        $(".container").empty();
    }
});