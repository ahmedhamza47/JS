'use strict';
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let btnRoll = document.querySelector('.btn--roll');
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
let currentScore1 = document.querySelector('#current--0');
let currentScore2 = document.querySelectorAll('#current--1');
let diceEl = document.querySelector('.dice');

let currentScore = 0;
let activePlayer = 0;
let nonActivePlayer = 1;
let Score = [0, 0];

//initial condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//function to change the player
function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  nonActivePlayer === 1 ? (nonActivePlayer = 0) : (nonActivePlayer = 1);

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${nonActivePlayer}`)
    .classList.remove('player--active');
}
//dice roll section
btnRoll.addEventListener('click', function () {
  let diceNum = Math.floor(Math.random() * 6) + 1;

  //2.display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceNum}.png`;

  //3.check if dice is rolled for 1 if true switch to next player
  if (diceNum !== 1) {
    currentScore += diceNum;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch to next player
    switchPlayer();
  }
});
// hold section
btnHold.addEventListener('click', function () {
  Score[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    Score[activePlayer];
  Score[activePlayer] >= 100 ? gameWon() : switchPlayer();
});

let gameWon = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  diceEl.classList.add('hidden');
};
//start a new game
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  // player1.classList.add('player--active');
  // player2.classList.remove('player--active');
  // player2.classList.remove('')
  diceEl.classList.add('hidden');
  activePlayer = 0;
  currentScore = 0;
});
