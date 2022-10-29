const gamePattern=[];
const userClickedPattern=[];
const buttonColours=["red", "blue", "green", "yellow"];
var level=0;
function nextSequence()
{
   var randomNumber= Math.floor(Math.random() * (3 - 0 + 1) + 0);
   var randomChosenColour= buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   level=level+1;
   $("h1").text("Level "+ level);
}


function playSound(randomChosenColour)
{
    switch(randomChosenColour)
    {
        case "red": audio=new Audio("sounds/red.mp3");
                    audio.play();
                    break;
        case "green": audio=new Audio("sounds/green.mp3");
                    audio.play();
                    break;
        case "blue": audio=new Audio("sounds/blue.mp3");
                    audio.play();
                    break;
        case "yellow": audio=new Audio("sounds/yellow.mp3");
                    audio.play();
                    break;
    }
}
$(".btn").click(function() {
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if(userClickedPattern.length===gamePattern.length)
    {
        checkAnswer(userClickedPattern.length);
    }
    
});

function animatePress(currentColour)
{
    $('#'+currentColour).addClass("pressed");
    setTimeout(function() {
        $('#'+currentColour).removeClass("pressed");
    },100);
    
}
var executed=false;
$(document).keypress(function() {
    if(executed===false)
    {
        nextSequence();  
        executed=true;
        $("h1").text("LEVEl "+level);
    }
    
});

function checkAnswer(currentLevel)
{
    if(JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern))
    {
        console.log("success");
       
        setTimeout(nextSequence,1000);

    }
    else{
        console.log("fail");
        executed=false;
        $("h1").text("Game Over!");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("h1").text("Press A Key To Start");
            $("body").removeClass("game-over");
        },1600);
        gamePattern.length=0;
        level=0;
    }
    console.log(gamePattern);
    console.log(userClickedPattern);
    userClickedPattern.length=0;
}
