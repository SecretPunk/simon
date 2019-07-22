var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var colourSound = new Audio();
var wrongSound = new Audio();
var soundPath = "resources/media/sounds/";
wrongSound.src = soundPath + "wrong.mp3";

var level = 0;

$(document).keypress(function() {
  if (level === 0) {
    nextSequence();
  }
});

function nextSequence() {
  level++;
  $("h2").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4); // generates 0 to 3 inclusive
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(90).fadeIn(90, function() {
    playColourSound(randomChosenColour);
  });
}

$("button").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playColourSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

function playColourSound(colour) {
  colourSound.src = soundPath + colour + ".mp3";
  colourSound.play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  if (userClickedPattern.length === gamePattern.length) {
    if (compareArrays(userClickedPattern, gamePattern)) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 700);
    }
    else {
      wrongSound.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h2").text("GAME OVER. Press any key to start again.");
      startOver();
    }
  }
  else {
    // do nothing, just proceed with the game.
  }
}

// only designed for arrays of same length
function compareArrays(array1, array2) {

  var same = true;

  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      same = false;
      break;
    }
  }

  return same;
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
