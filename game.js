var buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})


$('.btn').click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);
    animatePress(userChosenColor)
    playSound(userChosenColor)

    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");

        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function (){
            $("body").removeClass("game-over"); 
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    // increase level
    level ++;

    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var random_ChosenColour = buttonColours[randomNumber];
    // console.log(random_ChosenColour)
    gamePattern.push(random_ChosenColour);

    // flash random button
    $('#'+random_ChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // play sound according to random color
    playSound(random_ChosenColour)

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

function animatePress(currentColour) {
    $('#'+currentColour).addClass("pressed");
    setTimeout(function (){
        $('#'+currentColour).removeClass("pressed")},100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}