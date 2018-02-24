"use strict";

// default game state

const defaultState = {
  currentScoreSelection: {
    combinationName: "",
    value: null
  },
  diceValues: [],
  rollsRemaining: 3,
  scoreSheet: {
    left: {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null
    },
    right: {
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null
    }
  }
};

// game state

let gameState = gameStateReducer();

// reducers

function gameStateReducer(prevState = defaultState, action = {}) {
  return {
    currentScoreSelection: currentScoreSelection(
      prevState.currentScoreSelection,
      action,
      prevState.diceValues
    ),
    diceValues: diceValues(prevState.diceValues, action),
    rollsRemaining: rollsRemaining(prevState.rollsRemaining, action),
    scoreSheet: scoreSheet(
      prevState.scoreSheet,
      action,
      prevState.currentScoreSelection
    )
  };
}

function currentScoreSelection(
  prevState = currentScoreSelectionDefaultState,
  action,
  diceValues
) {
  switch (action.type) {
    case "removeCurrentScoreSelection":
      return {
        combinationName: "",
        value: null
      };
    case "selectOnes":
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 1)
      };
    case "selectTwos":
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 2)
      };
    case "selectThrees":
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 3)
      };
    case "selectFours":
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 4)
      };
    case "selectFives":
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 5)
      };
    case "selectSixes":
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 6)
      };
    case "selectThreeOfAKind":
      return {
        combinationName: action.combinationName,
        value: isNumberOfAKind(diceValues, 3) ? getSumOfAllDice(diceValues) : 0
      };
    case "selectFourOfAKind":
      return {
        combinationName: action.combinationName,
        value: isNumberOfAKind(diceValues, 4) ? getSumOfAllDice(diceValues) : 0
      };
    case "selectChance":
      return {
        combinationName: action.combinationName,
        value: getSumOfAllDice(diceValues)
      };
    case "selectFullHouse":
      return {
        combinationName: action.combinationName,
        value: isFullHouse(diceValues) ? 25 : 0
      };
    case "selectSmallStraight":
      return {
        combinationName: action.combinationName,
        value: isSmallStraight(diceValues) ? 30 : 0
      };
    case "selectLargeStraight":
      return {
        combinationName: action.combinationName,
        value: isLargeStraight(diceValues) ? 40 : 0
      };
    case "selectYahtzee":
      return {
        combinationName: action.combinationName,
        value: diceValues.every(die => die === diceValues[0]) ? 50 : 0
      };
    default:
      return prevState;
  }
}

function diceValues(prevState, action) {
  switch (action.type) {
    case "updateDiceValues":
      return [...action.newValues];
    default:
      return prevState;
  }
}

function rollsRemaining(prevState, action) {
  switch (action.type) {
    case "decrementRolls":
      return prevState - 1;
    case "resetRolls":
      return 3;
    default:
      return prevState;
  }
}

function scoreSheet(prevState, action, { combinationName, value }) {
  switch (action.type) {
    case "markScoreLeft":
      return Object.assign({}, prevState, {
        left: Object.assign({}, prevState.left, {
          [`${combinationName}`]: value
        })
      });
    case "markScoreRight":
      return Object.assign({}, prevState, {
        right: Object.assign({}, prevState.right, {
          [`${combinationName}`]: value
        })
      });
    default:
      return prevState;
  }
}

// action creators

function decrementRolls() {
  return {
    type: "decrementRolls"
  };
}

function resetRolls() {
  return {
    type: "resetRolls"
  };
}

function markScore() {
  const isLeftScore = combinationName =>
    combinationName === "ones" ||
    combinationName === "twos" ||
    combinationName === "threes" ||
    combinationName === "fours" ||
    combinationName === "fives" ||
    combinationName === "sixes";
  return {
    type: isLeftScore(gameState.currentScoreSelection.combinationName)
      ? "markScoreLeft"
      : "markScoreRight"
  };
}

function updateDiceValues(newValues) {
  return {
    type: "updateDiceValues",
    newValues: newValues
  };
}

function selectScoreArea(combinationName) {
  let type =
    "select" +
    combinationName.charAt(0).toUpperCase() +
    combinationName.slice(1);
  return {
    type: type,
    combinationName: combinationName
  };
}

function removeCurrentScoreSelection() {
  return {
    type: "removeCurrentScoreSelection"
  };
}

// UI elements

let scoreButton = document.getElementById("score-button");
let rollButton = document.getElementById("roll-button");
let buttonRollCount = document.getElementById("rolls-remaining");
var dice = document.getElementsByClassName("die"); // using var because of safari issue https://stackoverflow.com/questions/40091136/cant-create-duplicate-variable-that-shadows-a-global-property
let startGameButton = document.getElementById("start-game");
let gameInstructions = document.getElementById("game-instructions");
let scoreSheetEl = document.getElementById("score-sheet");
let currentScoreSection = document.getElementById("current-score-section");
let diceSection = document.getElementById("dice");
let gameOver = document.getElementById("game-over");
let finalScore = document.getElementById("final-score");
let leaderBoardBody = document.getElementById("leader-board-body");
let formMessage = document.getElementById("form-message");

// Flags

let scoreSubmitted = false;

const combinations = [
  {
    name: "ones",
    id: "ones-score"
  },
  {
    name: "twos",
    id: "twos-score"
  },
  {
    name: "threes",
    id: "threes-score"
  },
  {
    name: "fours",
    id: "fours-score"
  },
  {
    name: "fives",
    id: "fives-score"
  },
  {
    name: "sixes",
    id: "sixes-score"
  },
  {
    name: "threeOfAKind",
    id: "three-of-a-kind-score"
  },
  {
    name: "fourOfAKind",
    id: "four-of-a-kind-score"
  },
  {
    name: "chance",
    id: "chance-score"
  },
  {
    name: "fullHouse",
    id: "full-house-score"
  },
  {
    name: "smallStraight",
    id: "small-straight-score"
  },
  {
    name: "largeStraight",
    id: "large-straight-score"
  },
  {
    name: "yahtzee",
    id: "yahtzee-score"
  }
];

// helpers

function getNewDiceValues() {
  let values = gameState.diceValues.slice();
  for (let i = 1; i < 6; i++) {
    const die = document.getElementById("die-position-" + i + "");
    if (die.className !== "die-kept") {
      let newDieNumber = Math.floor(Math.random() * 6) + 1;
      let index = i - 1;
      values[index] = newDieNumber;
    }
  }
  return values;
}

function isNumberOfAKind(diceValues, number) {
  let values = diceValues.slice();
  let isCombination;
  for (let i = 0; i < 4; i++) {
    if (
      values.filter(function(die) {
        return die === values[i];
      }).length >= number
    ) {
      isCombination = true;
    }
  }
  return !!isCombination;
}

function isFullHouse(diceValues) {
  let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  for (let i = 0; i < diceValues.length; i++) {
    count[diceValues[i]]++;
  }
  return (
    Object.values(count)
      .filter(function(c) {
        return c !== 0;
      })
      .sort()
      .join("")
      .toString() === "23"
  );
}

function isSmallStraight(diceValues) {
  const diceValuesArray = diceValues.slice();
  const values = diceValuesArray
    .filter(function(die, index) {
      // remove duplicates, sort, and convert to string
      return diceValuesArray.indexOf(die) === index;
    })
    .sort()
    .join("")
    .toString();
  return (
    values.includes("1234") ||
    values.includes("2345") ||
    values.includes("3456")
  );
}

function isLargeStraight(diceValues) {
  let values = diceValues.slice();
  return (
    values.sort().join("") === "12345" || values.sort().join("") === "23456"
  );
}

function getSumOfNumber(diceValues, n) {
  const values = diceValues.slice();
  return values
    .filter(function(die) {
      return die === n;
    })
    .reduce(function(a, b) {
      return a + b;
    }, 0);
}

function getSumOfAllDice(diceValues) {
  const values = diceValues.slice();
  return values.reduce(function(a, b) {
    return a + b;
  }, 0);
}

function checkForGameOver() {
  const scoreSheetCombinations = Object.assign(
    {},
    gameState.scoreSheet.left,
    gameState.scoreSheet.right
  );
  return !Object.values(scoreSheetCombinations).some(score => score === null);
}

// update UI

function updateUIButtons() {
  // checks current state and updates accordingly
  buttonRollCount.innerHTML = gameState.rollsRemaining;

  const turnStart = gameState.rollsRemaining === 3;
  const turnMiddle =
    gameState.rollsRemaining === 2 || gameState.rollsRemaining === 1;
  const turnEnd = gameState.rollsRemaining === 0;
  const scoreCombinationSelected =
    gameState.currentScoreSelection.value !== null;

  if (turnMiddle && scoreCombinationSelected) {
    // display both roll button and score button
    scoreButton.classList.remove("button-invisible", "button-wide");
    rollButton.classList.remove("button-invisible", "button-wide");
  }

  if (turnStart || !scoreCombinationSelected) {
    // only display roll button
    rollButton.classList.remove("button-invisible");
    rollButton.classList.add("button-wide");
    scoreButton.classList.add("button-invisible");
  }

  if (turnEnd && !scoreCombinationSelected) {
    // only display disabled score button
    rollButton.classList.add("button-invisible");
    scoreButton.classList.remove("button-invisible");
    scoreButton.classList.add("button-wide");
    scoreButton.disabled = true;
  }

  if (turnEnd && scoreCombinationSelected) {
    // only display score button
    rollButton.classList.add("button-invisible");
    scoreButton.classList.remove("button-invisible");
    scoreButton.classList.add("button-wide");
    scoreButton.disabled = false;
  }
}

function rollDiceIn() {
  for (let i = 0; i < dice.length; i++) {
    dice[i].classList.remove("die-animate-roll-out");
    dice[i].classList.add("die-animate-roll-in");
    dice[i].classList.remove("die-start");
  }
}

function rollDiceOut() {
  for (let i = 0; i < dice.length; i++) {
    dice[i].classList.remove("die-animate-roll-in");
    dice[i].classList.add("die-animate-roll-out");
    dice[i].classList.add("die-start");
  }
}

function updateUIDice() {
  for (let i = 1; i < 6; i++) {
    let die = document.getElementById("die-position-" + i + "");
    const index = i - 1;
    die.src = "images/" + gameState.diceValues[index] + ".svg";
  }
}

function unselectAllDice() {
  for (let i = 1; i < 6; i++) {
    let die = document.getElementById("die-position-" + i + "");
    die.classList.remove("die-kept");
  }
}

function getTotal(scoreSheetSide) {
  const scoreValues = gameState.scoreSheet[`${scoreSheetSide}`];
  return Object.values(scoreValues).reduce((acc, val) => acc + val);
}

function getBonus() {
  return getTotal("left") >= 63 ? 35 : 0;
}

function updateUIBonus() {
  let bonus = document.getElementById("bonus");
  if (getTotal("left") >= 63) bonus.innerHTML = 35;
}

function updateUILeftTotal() {
  let leftTotalEl = document.getElementById("leftTotal");
  const leftTotal = getTotal("left") + getBonus();
  leftTotalEl.innerHTML = leftTotal;
}

function updateUIRightTotal() {
  let rightTotalEl = document.getElementById("rightTotal");
  const rightTotal = getTotal("right");
  rightTotalEl.innerHTML = rightTotal;
}

function updateUICurrentScore() {
  let currentScore = document.getElementById("current-score");
  currentScore.innerHTML = getTotal("left") + getBonus() + getTotal("right");
}

function updateUIScoreSheet(combination) {
  const scoreSheetCombinations = Object.assign(
    {},
    gameState.scoreSheet.left,
    gameState.scoreSheet.right
  );
  for (let i = 0; i < combinations.length; i++) {
    let element = document.getElementById(combinations[i].id);
    const combinationName = combinations[i].name;
    const scored = scoreSheetCombinations[combinationName] !== null;
    if (combination === combinationName) {
      element.innerHTML = gameState.currentScoreSelection.value; // add value to score area
      element.classList.remove("unmarked"); // remove hover style
    } else if (!scored) {
      element.innerHTML = ""; // clear previously selected score area
      if (!element.className.includes("unmarked"))
        element.classList.add("unmarked"); // add hover style
    }
  }
}

function removeGameInstructions() {
  gameInstructions.classList.add("game-instructions-inactive");
  scoreSheetEl.classList.remove("score-sheet-invisible");
  currentScoreSection.classList.remove("current-score-invisible");
  diceSection.classList.remove("dice-invisible");
}

function displayGameOverUI() {
  gameOver.classList.remove("game-over-invisible");
  scoreSheetEl.classList.add("score-sheet-invisible");
  currentScoreSection.classList.add("current-score-invisible");
  diceSection.classList.add("dice-invisible");

  refreshBoard();
}

function removeGameOverUI() {
  gameOver.classList.add("game-over-invisible");
  scoreSheetEl.classList.remove("score-sheet-invisible");
  currentScoreSection.classList.remove("current-score-invisible");
  diceSection.classList.remove("dice-invisible");
}

function resetTotals() {
  let leftTotalEl = document.getElementById("leftTotal");
  let rightTotalEl = document.getElementById("rightTotal");
  let currentScore = document.getElementById("current-score");
  leftTotalEl.innerHTML = 0;
  rightTotalEl.innerHTML = 0;
  currentScore.innerHTML = 0;
}

// click handlers

function listenForDieSelection() {
  for (let i = 1; i < 6; i++) {
    let die = document.getElementById("die-position-" + i + "");
    die.addEventListener("click", function(event) {
      event.target.classList.toggle(
        "die-kept",
        !event.target.className.includes("die-kept")
      );
    });
  }
}

function listenForScoreSelection() {
  function updateScoreSelectionAndUI(combinationName) {
    return function() {
      gameState = gameStateReducer(gameState, selectScoreArea(combinationName));
      updateUIScoreSheet(combinationName);
      updateUIButtons();
    };
  }
  const scoreSheetCombinations = Object.assign(
    {},
    gameState.scoreSheet.left,
    gameState.scoreSheet.right
  );
  for (let i = 0; i < combinations.length; i++) {
    let element = document.getElementById(combinations[i].id);
    const combinationName = combinations[i].name;
    const scored = scoreSheetCombinations[combinationName] !== null;
    if (!scored) {
      element.addEventListener(
        "click",
        updateScoreSelectionAndUI(combinationName)
      );
    }
  }
}

rollButton.addEventListener("click", function() {
  const newGame =
    gameState.rollsRemaining === 3 &&
    (gameState.currentScoreSelection.value === null || checkForGameOver());
  if (newGame) {
    removeGameInstructions();
    removeGameOverUI();
    resetTotals();
    gameState = gameStateReducer();
    scoreSubmitted = false;
  }

  gameState = gameStateReducer(gameState, updateDiceValues(getNewDiceValues()));
  updateUIDice();
  const firstRoll = gameState.rollsRemaining === 3;
  if (firstRoll) {
    rollDiceIn();
    listenForDieSelection();
    listenForScoreSelection();
  }

  gameState = gameStateReducer(gameState, removeCurrentScoreSelection());
  updateUIScoreSheet(gameState.currentScoreSelection.combinationName);

  gameState = gameStateReducer(gameState, decrementRolls());
  updateUIButtons();
});

scoreButton.addEventListener("click", function() {
  gameState = gameStateReducer(gameState, markScore());
  gameState = gameStateReducer(gameState, resetRolls());

  updateUIBonus();
  updateUILeftTotal();
  updateUIRightTotal();
  updateUICurrentScore();
  rollDiceOut();
  unselectAllDice();
  updateUIButtons();
  removeScoreSelectionListeners();
  removeDiceListeners();

  const gameOver = checkForGameOver();
  if (gameOver) {
    displayGameOverUI();
    finalScore.innerHTML = getTotal("left") + getBonus() + getTotal("right");
  }
});

function removeScoreSelectionListeners() {
  for (let i = 0; i < combinations.length; i++) {
    let oldElement = document.getElementById(combinations[i].id);
    const newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }
}

function removeDiceListeners() {
  for (let i = 1; i < 6; i++) {
    let die = document.getElementById("die-position-" + i + "");
    let oldElement = die;
    const newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    die = newElement;
  }
}

const username = document.getElementById("username");
const song = document.getElementById("song");

function getScores() {
  return new Promise((resolve, reject) => {
    let XHR = new XMLHttpRequest();

    XHR.addEventListener("load", function(event) {
      resolve(event.target.responseText);
    });

    XHR.addEventListener("error", function(event) {
      alert("Oups! Something goes wrong.");
      reject(event);
    });

    XHR.open(
      "GET",
      "https://wt-9247ad9527b09dac68774fb59a2c93f6-0.run.webtask.io/scores/users"
    );
    XHR.setRequestHeader("Content-Type", "application/json");
    // The data sent is what the user provided in the form
    XHR.send();
  });
}

function isValidUser(user) {
  return user.length > 0;
}

function isValidSong(song) {
  return song.length > 0;
}

function isValidType(userType) {
  return !!userType;
}

function sendData() {
  if (scoreSubmitted) {
    formMessage.innerText = "Your score was already saved.";
    return;
  }

  const userType = document.querySelector('input[name="typeUser"]:checked');

  if (
    isValidUser(username.value) &&
    isValidSong(song.value) &&
    isValidType(userType) &&
    !scoreSubmitted
  ) {
    let XHR = new XMLHttpRequest();

    const userTypeValue = userType.value;

    const user = {
      username: username.value,
      song: song.value,
      score: finalScore.innerText
    };

    // Define what happens on successful data submission
    XHR.addEventListener("load", function(event) {
      const status = event.target.status;
      const response = event.target.responseText;

      if (status !== 200) {
        formMessage.innerText = response;
      } else {
        formMessage.innerText = response;
        scoreSubmitted = true;
        refreshBoard();
      }
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function(event) {
      alert("Oups! Something goes wrong.");
    });

    let requestType = "";

    if (userTypeValue === "new") {
      requestType = "user";
    } else if (userTypeValue === "existing") {
      requestType = "score";
    }

    let request =
      "https://wt-9247ad9527b09dac68774fb59a2c93f6-0.run.webtask.io/scores/";
    request += requestType;

    XHR.open("POST", request);
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.send(JSON.stringify(user));
  } else {
    formMessage.innerText = `Invalid form.`;
  }
}

function refreshBoard() {
  getScores().then(data => {
    const usersData = JSON.parse(data);

    usersData.sort((userA, userB) => {
      const scoreA = userA.highScore;
      const scoreB = userB.highScore;

      return scoreB - scoreA;
    });

    while (leaderBoardBody.firstChild) {
      leaderBoardBody.removeChild(leaderBoardBody.firstChild);
    }

    usersData.map(user => {
      let row = document.createElement("div");
      row.className = "leader-board-row";
      let username = document.createElement("span");
      let highScore = document.createElement("span");
      username.innerText = user.username;
      highScore.innerText = user.highScore;
      row.appendChild(username);
      row.appendChild(highScore);
      leaderBoardBody.appendChild(row);
    });
  });
}

let form = document.getElementById("score-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  sendData();
});
