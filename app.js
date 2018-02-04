// default game state

var defaultGameState = {
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
  chance: null,
  diceValues: [],
  rollsRemaining: 3,
  turnCount: 13,
  currentScoreSelection: {
    combinationName: '',
    value: null
  },
  leftScore: 0,
  rightScore: 0
}



// game state

var gameState = defaultGameState



// reducers

function updateScoreSheetValues(prevState, action) {
  console.log('prevState ', prevState)
  console.log('action ', action)
  switch (action.type) {
    case ('ones'):
      return Object.assign({}, prevState, {
        ones: getSumOfNumber(prevState.diceValues, action.numberToSum)
      })
    case ('twos'):
      return Object.assign({}, prevState, {
        twos: getSumOfNumber(prevState.diceValues, action.numberToSum)
      })
    case ('threes'):
      return Object.assign({}, prevState, {
        threes: getSumOfNumber(prevState.diceValues, action.numberToSum)
      })
    case ('fours'):
      return Object.assign({}, prevState, {
        fours: getSumOfNumber(prevState.diceValues, action.numberToSum)
      })
    case ('fives'):
      return Object.assign({}, prevState, {
        fives: getSumOfNumber(prevState.diceValues, action.numberToSum)
      })
    case ('sixes'):
      return Object.assign({}, prevState, {
        sixes: getSumOfNumber(prevState.diceValues, action.numberToSum)
      })
    default:
      return prevState
  }
}

function updateGameValues(prevState, action) {
  // console.log('prevState ', prevState)
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

    case ('updateCurrentScoreSelection'):
      return Object.assign({}, prevState, {
        currentScoreSelection: action.currentScoreSelection
      })

    case ('markScore'):
      return Object.assign({}, prevState, {
        [`${prevState.currentScoreSelection.combinationName}`]: prevState.currentScoreSelection.value
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

function updateCurrentScoreSelection(combinationName, value) {
  return {
    type: 'updateCurrentScoreSelection',
    currentScoreSelection: {
      combinationName: combinationName,
      value: value
    }
  }
}



// UI elements

var scoreButton = document.getElementById("score-button")
var rollButton = document.getElementById("roll-button")
var buttonRollCount = document.getElementById("rolls-remaining")
var dice = document.getElementsByClassName('die')
var ones = document.getElementById('ones-score')
var twos = document.getElementById('twos-score')
var threes = document.getElementById('threes-score')
var fours = document.getElementById('fours-score')
var fives = document.getElementById('fives-score')
var sixes = document.getElementById('sixes-score')
var elements = [
  {
    combination: 'ones',
    element: ones
  },
  {
    combination: 'twos',
    element: twos
  },
  {
    combination: 'threes',
    element: threes
  },
  {
    combination: 'fours',
    element: fours
  },
  {
    combination: 'fives',
    element: fives
  },
  {
    combination: 'sixes',
    element: sixes
  },
]



// helpers

function getNewDiceValues() {
  var diceValues = gameState.diceValues.slice()
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

function getSumOfNumber(diceValues, n) {
  return diceValues
    .filter(function(die) { return die == n })
    .reduce(function(a, b) { return a + b }, 0)
}

function getSumOfAllDice(diceValues) {
  return diceValues.reduce(function(a, b) { return a + b }, 0)
}

function removeListeners() {
  for (var i = 0; i < elements.length; i++) {
    console.log('remove listeners loop runs! ');
    var oldElement = elements[i].element
    var newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement)
  }
}



// update UI

function updateUIButtons() {
  buttonRollCount.innerHTML = gameState.rollsRemaining

  if (gameState.rollsRemaining < 3) scoreButton.classList.remove('button-invisible')

  if (gameState.rollsRemaining == 0) {
    rollButton.classList.add('button-invisible')
    scoreButton.classList.add('button-wide')
  }

  if (gameState.rollsRemaining == 3) {
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
    die.src = "images/" + gameState.diceValues[index] + ".svg"
  }
}

function unselectAllDice() {
  for (var i = 1; i < 6; i++) {
    var die = document.getElementById("die-position-" + i + "")
    die.classList.remove('die-kept')
  }
}

function updateUIScoreSheet(combination) {
  for (i = 0; i < elements.length; i++) {
    if (combination === elements[i].combination) {
      elements[i].element.innerHTML = gameState.currentScoreSelection.value
    } else {
      elements[i].element.innerHTML = ""
    }
  }
}



// click handlers

function listenForDieSelection() {
  console.log("listenForDieSelection runs")
  for (var i = 1; i < 6; i++) {
    var die = document.getElementById("die-position-" + i + "")
    die.addEventListener('click', function() {
      event.target.classList.toggle('die-kept', !event.target.className.includes('die-kept'))
    })
  }
}

function listenForScoreSelection() {
  console.log("listenForScoreSelection runs")
  function updateScoreStateAndUI(combination, numberToSum) {
    console.log('outer closure function runs')
    return function() {
      console.log('inner closure function runs')
      gameState = updateGameValues(
        gameState,
        updateCurrentScoreSelection(combination, getSumOfNumber(gameState.diceValues, numberToSum))
      )
      updateUIScoreSheet(combination)
    }
  }
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i].element
    var combination = elements[i].combination
    var numberToSum = i + 1
    var scored = gameState[combination]
    if (!scored) {
      element.addEventListener('click', updateScoreStateAndUI(combination, numberToSum))
    }

  }
}

rollButton.addEventListener('click', function() {
  gameState = updateGameValues(gameState, updateDiceValues(getNewDiceValues()))
  updateUIDice()
  var firstRoll = gameState.rollsRemaining == 3
  if (firstRoll) {
    console.log('first roll! ');
    rollDiceIn()
    listenForDieSelection()
    listenForScoreSelection()
  }
  gameState = updateGameValues(gameState, decrementRolls())
  updateUIButtons()
})

scoreButton.addEventListener('click', function() {
  gameState = updateGameValues(gameState, { type: 'markScore' })
  // console.log('gameState AFTER marking score', gameState)

  gameState = updateGameValues(gameState, resetRolls())
  rollDiceOut()
  unselectAllDice()
  updateUIButtons()
  removeListeners()
})
