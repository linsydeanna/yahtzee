// default game state

var defaultScoreSheet = {
  ones: null,
  twos: null,
  threes: null,
  fours: null,
  fives: null,
  sixes: null,
  bonus: null,
  threeOfAKind: null,
  fourOfAKind: null,
  fullHouse: null,
  smallStraight: null,
  largeStraight: null,
  yahtzee: null,
  chance: null
}

var defaultGameValues = {
  canScore: false,
  diceValue: [],
  rollsRemaining: 3,
  turnCount: 13,
  scoredItem: 0,
  leftScore: 0,
  rightScore: 0
}



// game state

var gameValues = defaultGameValues;
var scoreSheet = defaultScoreSheet;



// reducers

var newScoreSheet = (prevState, action) => {
  console.log('prevState ', prevState);
  console.log('action ', action);
  switch (action.type) {
    case ('addTotalNumber'):
      return prevState
    default:
      return prevState
  }
}

function newGameValues(prevState, action) {
  console.log('prevState ', prevState);
  console.log('action ', action);
  switch (action.type) {

    case ('decrementRolls'):
      return Object.assign({}, prevState, {
        rollsRemaining: prevState.rollsRemaining--
      })

    case ('resetRolls'):
      return Object.assign(prevState, {
        rollsRemaining: 3
      })

    default:
      return prevState
  }
}



// actions

var decrementRolls = {
  type: 'decrementRolls'
}

var resetRolls = {
  type: 'resetRolls'
}



// UI elements

var scoreButton = document.getElementById("score-button");
var rollButton = document.getElementById("roll-button");
var buttonRollCount = document.getElementById("rolls-remaining");
var dice = document.getElementsByClassName('die');



// update UI

function updateUI() { // add switch statement
  buttonRollCount.innerHTML = gameValues.rollsRemaining;

  if (gameValues.rollsRemaining < 3) scoreButton.classList.remove('button-invisible');

  if (gameValues.rollsRemaining == 0) {
    rollButton.classList.add('button-invisible');
    scoreButton.classList.add('button-wide');
  }

  if (gameValues.rollsRemaining == 3) {
    rollButton.classList.remove('button-invisible');
    scoreButton.classList.add('button-invisible');
  }

}



// click handlers

rollButton.addEventListener('click', function() {
  gamesValues = newGameValues(gameValues, decrementRolls)
  updateUI();
})

scoreButton.addEventListener('click', function() {
  gamesValues = newGameValues(gameValues, resetRolls);
  updateUI();
})
