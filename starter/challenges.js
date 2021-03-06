/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// declare variables in the global scope
var scores, roundScore, activePlayer, gamePlaying, previousDiceRoll;
gamePlaying = true;
init();

// querySelector changed values and elements on the webpage
// this is changing the current score
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// anonymous function. Kind of like an in line function
// event listener is what makes an action happen when you click on button
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. random number
    // Math.floor removes the decimals
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // 3. update the round score IF the rolled number wasn't a 1
    if (dice1 !== 1 && dice2 !== 1) {
      // add score
      /* if (previousDiceRoll === 6 && dice == 6) {
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent =
          scores[activePlayer];
        nextPlayer();
      } */
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      //previousDiceRoll = dice;
    } else {
      // next player
      nextPlayer();
    }
  }
}); // closes btn-roll eventListener

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // 2. Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // 3. check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      // activePlayer wins
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
        document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // 4. next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Go to Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // Changes the CURRENT score back to 0
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // .toggle adds if class doesn't have element, or removes if it does have element
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // hides the dice
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // hides the dice in the beginning
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  // setting all score cards to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
