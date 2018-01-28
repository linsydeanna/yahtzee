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
  diceValues: [],
  rollsRemaining: 3,
  turnCount: 13,
  scoredItem: 0,
  leftScore: 0,
  rightScore: 0
}



// game state

var gameValues = defaultGameValues
var scoreSheet = defaultScoreSheet



// reducers

var newScoreSheet = (prevState, action) => {
  console.log('prevState ', prevState)
  console.log('action ', action)
  switch (action.type) {
    case ('addTotalNumber'):
      return prevState
    default:
      return prevState
  }
}

function newGameValues(prevState, action) {
  console.log('prevState ', prevState)
  console.log('action ', action)
  switch (action.type) {

    case ('decrementRolls'):
      return Object.assign({}, prevState, {
        rollsRemaining: prevState.rollsRemaining - 1
      })

    case ('resetRolls'):
      return Object.assign({}, prevState, {
        rollsRemaining: 3
      })

    case ('updateDiceValues'):
      return Object.assign({}, prevState, {
        diceValues: action.newValues
      })

    default:
      return prevState
  }
}



// actions

function decrementRolls() {
  return {
    type: 'decrementRolls'
  }
}

function resetRolls() {
  return {
    type: 'resetRolls'
  }
}

function updateDiceValues(newValues) {
  return {
    type: 'updateDiceValues',
    newValues: newValues
  }
}



// UI elements

var scoreButton = document.getElementById("score-button")
var rollButton = document.getElementById("roll-button")
var buttonRollCount = document.getElementById("rolls-remaining")
var dice = document.getElementsByClassName('die')



// helpers

function getNewDiceValues() {
  var diceValues = gameValues.diceValues.slice()
  for (var i = 1; i < 6; i++) {
    var die = document.getElementById("die-position-" + i + "")
    if (die.className !== 'die-kept') {
      var newDieNumber = Math.floor(Math.random() * 6) + 1
      var index = i - 1
      diceValues[index] = newDieNumber
    }
  }
  return diceValues
}



// update UI

function updateUIButtons() {
  buttonRollCount.innerHTML = gameValues.rollsRemaining

  if (gameValues.rollsRemaining < 3) scoreButton.classList.remove('button-invisible')

  if (gameValues.rollsRemaining == 0) {
    rollButton.classList.add('button-invisible')
    scoreButton.classList.add('button-wide')
  }

  if (gameValues.rollsRemaining == 3) {
    rollButton.classList.remove('button-invisible')
    scoreButton.classList.add('button-invisible')
  }

}

function rollDiceIn() {
  for (i = 0; i < dice.length; i++) {
    dice[i].classList.remove("die-animate-roll-out")
    dice[i].classList.add("die-animate-roll-in")
    dice[i].classList.remove("die-start")
  }
}

function rollDiceOut() {
  for (i = 0; i < dice.length; i++) {
    dice[i].classList.remove("die-animate-roll-in")
    dice[i].classList.add("die-animate-roll-out")
    dice[i].classList.add("die-start")
  }
}

function updateUIDice() {
  for (var i = 1; i < 6; i++) {
    var die = document.getElementById("die-position-" + i + "")
    var index = i - 1
    die.src = "images/" + gameValues.diceValues[index] + ".svg"
  }
}



// click handlers

rollButton.addEventListener('click', function() {

  gameValues = newGameValues(gameValues, updateDiceValues(getNewDiceValues()));
  updateUIDice()
  if (gameValues.rollsRemaining == 3) rollDiceIn()

  gameValues = newGameValues(gameValues, decrementRolls())

  updateUIButtons()

})

scoreButton.addEventListener('click', function() {

  gameValues = newGameValues(gameValues, resetRolls())

  rollDiceOut()

  updateUIButtons()
})
