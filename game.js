var buttonColours = ['red', 'green', 'blue', 'yellow'];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).on("keypress", function () {
    if (!started) {
        nextSequence();
        $("h1").text("Level " + level);
        started = true;
    }
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    userClickedPattern = [];

    level++;


    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");

        $("body").addClass("game-over");

        $("h1").text("Game Over, Press Any Key to Restart");

        setInterval(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
