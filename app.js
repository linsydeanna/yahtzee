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
      return {
        ...prevState,
        rollsRemaining: prevState.rollsRemaining--
      }
      return prevState
    default:
      return prevState
  }
}



// actions

var decrementRolls = {
  type: 'decrementRolls'
}



// UI elements

var scoreButton = document.getElementById("score-button");
var rollButton = document.getElementById("roll-button");
var buttonRollCount = document.getElementById("rolls-remaining");
var dice = document.getElementsByClassName('die');



// click handlers

rollButton.addEventListener('click', function() {
  gamesValues = newGameValues(gameValues, decrementRolls)
  if (gameValues.rollsRemaining < 3) scoreButton.classList.remove('button-invisible');
})
