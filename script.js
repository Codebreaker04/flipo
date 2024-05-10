"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const playerScore0 = document.getElementById("score--0");
const playerScore1 = document.getElementById("score--1");
const currScore0 = document.getElementById("current--0");
const currScore1 = document.getElementById("current--1");

const dice = document.querySelector(".dice");
const newbtn = document.querySelector(".btn--new");
const rollbtn = document.querySelector(".btn--roll");
const holdbtn = document.querySelector(".btn--hold");
const trgtbtn = document.querySelector("#trgtinput");

let activePlayer;
let currentScore;
let score;
let target;
let canPlay;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  score = [0, 0];
  canPlay = true;

  // initializing the elements
  playerScore0.textContent = "0";
  playerScore1.textContent = "0";
  currScore0.textContent = "0";
  currScore1.textContent = "0";

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  trgtbtn.value = "";
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

const rollDice = function () {
  if (canPlay) {
    let isValid = true;
    target = trgtbtn.value;
    target === NaN || target === "" ? (isValid = false) : (isValid = true);
    if (!isValid) alert("Please enter the target value");
    if (isValid) {
      const diceNum = Math.trunc(Math.random() * 6 + 1);

      // switching dice
      dice.classList.remove("hidden");
      dice.src = `dice-${diceNum}.png`;

      // rooling of dice
      if (diceNum !== 1) {
        currentScore += diceNum;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }
  }
};
const holdScore = function () {
  if (canPlay) {
    let IsHold = true;
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= target && IsHold) {
      IsHold = false;
      canPlay = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
};

rollbtn.addEventListener("click", rollDice);
dice.addEventListener("click", rollDice);
holdbtn.addEventListener("click", holdScore);
newbtn.addEventListener("click", init);
