$(document).ready(function () {
    //variables
    var game = {
        questions: [
            {
                question: "Star-Lord's real name is?",
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

    startScreenBuilder();

    //functions
    //BUILDERS -- Screen Builders
    function startScreenBuilder() {
        //create screen content
        var startRow = $("<div>").addClass("row justify-content-center");
        var startCol = $("<div>").addClass("col-xs-12");
        var startBtn = $("<button>").addClass("btn-primary start-button").text("Start");

        //append content
        $(startCol).append(startBtn)
        $(startRow).append(startCol);
        $(".container").append(startRow);
    }

    //BUILDERS -- Element builders

    //HANDLERS

    //RANDOM FUNCTIONS
    
});