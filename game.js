var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var start = false;
var level = 0;

$(document).keypress(function(event){
    //console.log(event.key);
    if(start === false){
        $("h1").text("Level "+level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    theSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern);
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    theSound(randomChosenColor);
}

function checkAnswer(currLevel){
    if(gamePattern[currLevel] === userClickedPattern[currLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    start = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function animatePress(currColor){
    $("#"+currColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currColor).removeClass("pressed");
    },100);
}
function theSound(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}