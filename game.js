/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;

function playSound(name) {
  const audio = new Audio(`/Simon Game/sounds/${name}.mp3`);
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');

  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}

$(document).keypress(() => {
  if (!gameStarted) {
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

$('.btn').click(function () {
  const userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
