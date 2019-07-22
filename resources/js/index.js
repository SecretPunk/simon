var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var colourSound = new Audio();
var wrongSound = new Audio();
var soundPath = "resources/media/sounds/";
wrongSound.src = soundPath + "wrong.mp3";

var level = 0;

$(document).keydown(function(e) {
  if (level === 0) {
    setTimeout(function() {
      nextSequence();
    }, 200); // so it doesn't start too instantly
  }
});

// if the player gets the sequence right, the user pattern is cleared, and
// a new colour is added to the game pattern
function nextSequence() {
  userClickedPattern = [];
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
  if (level > 0) { // ignore button clicks if the game hasn't started
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playColourSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
    this.blur();
  }
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

// the user pattern is only checked when the user has entered a full response
// i.e. if the game pattern consists of five colours, then the answer is not
// checked until the user has clicked a sequence of five buttons
function checkAnswer() {
  if (userClickedPattern.length === gamePattern.length) {
    if (compareArrays(userClickedPattern, gamePattern)) {
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
      $("h2").text("GAME OVER. Press any key to restart.");
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
}
