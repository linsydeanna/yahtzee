// default game state

var defaultGameState = {
  currentScoreSelection: {
    combinationName: '',
    value: null
  },
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
  leftScore: 0,
  rightScore: 0
}



// game state

var gameState = defaultGameState



// reducer

function updateCurrentScoreSelection(prevState, action) {
  console.log('action ', action);
  switch (action.type) {
    case ('selectOnes'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfNumber(prevState.diceValues, 1)
        }
      })
    case ('selectTwos'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfNumber(prevState.diceValues, 2)
        }
      })
    case ('selectThrees'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfNumber(prevState.diceValues, 3)
        }
      })
    case ('selectFours'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfNumber(prevState.diceValues, 4)
        }
      })
    case ('selectFives'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfNumber(prevState.diceValues, 5)
        }
      })
    case ('selectSixes'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfNumber(prevState.diceValues, 6)
        }
      })
    case ('selectThreeOfAKind'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfAllDice(prevState.diceValues)
        }
      })
    case ('selectFourOfAKind'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfAllDice(prevState.diceValues)
        }
      })
    case ('selectChance'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: getSumOfAllDice(prevState.diceValues)
        }
      })
    case ('selectFullHouse'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: 25
        }
      })
    case ('selectSmallStraight'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: 30
        }
      })
    case ('selectLargeStraight'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: 40
        }
      })
    case ('selectYahtzee'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: 50
        }
      })
    default:
      return prevState
  }
}

function updateGameValues(prevState, action) {
  // console.log('prevState ', prevState)
  // console.log('action ', action)
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
    case ('markScore'):
      return Object.assign({}, prevState, {
        [`${prevState.currentScoreSelection.combinationName}`]: prevState.currentScoreSelection.value
      })
    default:
      return prevState
  }
}



// action creators

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

function selectScoreArea(combinationName) {
  var type = "select" + combinationName.charAt(0).toUpperCase() + combinationName.slice(1)
  return {
    type: type,
    combinationName: combinationName
  }
}



// UI elements

var scoreButton = document.getElementById("score-button")
var rollButton = document.getElementById("roll-button")
var buttonRollCount = document.getElementById("rolls-remaining")
var dice = document.getElementsByClassName('die')

var combinations = [
  {
    name: 'ones',
    id: 'ones-score'
  },
  {
    name: 'twos',
    id: 'twos-score'
  },
  {
    name: 'threes',
    id: 'threes-score'
  },
  {
    name: 'fours',
    id: 'fours-score'
  },
  {
    name: 'fives',
    id: 'fives-score'
  },
  {
    name: 'sixes',
    id: 'sixes-score'
  },
  {
    name: 'threeOfAKind',
    id: 'three-of-a-kind-score'
  },
  {
    name: 'fourOfAKind',
    id: 'four-of-a-kind-score'
  },
  {
    name: 'chance',
    id: 'chance-score'
  },
  {
    name: 'fullHouse',
    id: 'full-house-score'
  },
  {
    name: 'smallStraight',
    id: 'small-straight-score'
  },
  {
    name: 'largeStraight',
    id: 'large-straight-score'
  },
  {
    name: 'yahtzee',
    id: 'yahtzee-score'
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
  for (var i = 0; i < combinations.length; i++) {
    var oldElement = document.getElementById(combinations[i].id)
    var newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement)
  }
}

function removeDiceListeners() {
  for (var i = 1; i < 6; i++) {
    var die = document.getElementById("die-position-" + i + "")
    var oldElement = die
    var newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement)
    die = newElement // mutated
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
  for (i = 0; i < combinations.length; i++) {
    var element = document.getElementById(combinations[i].id)
    var scored = gameState[combinations[i].name]
    if (combination === combinations[i].name) {
      element.innerHTML = gameState.currentScoreSelection.value // add value to score area
    } else if (!scored) {
      element.innerHTML = "" // clear previously selected score area
    }
  }
}



// click handlers

function listenForDieSelection() {
  for (var i = 1; i < 6; i++) {
    var die = document.getElementById("die-position-" + i + "")
    die.addEventListener('click', function() {
      event.target.classList.toggle('die-kept', !event.target.className.includes('die-kept'))
    })
  }
}

function listenForScoreSelection() {
  function updateScoreSelectionAndUI(combinationName) {
    return function() {
      gameState = updateCurrentScoreSelection(
        gameState,
        selectScoreArea(combinationName)
      )
      updateUIScoreSheet(combinationName)
    }
  }
  for (var i = 0; i < combinations.length; i++) {
    var element = document.getElementById(combinations[i].id)
    var combinationName = combinations[i].name
    var scored = gameState[combinationName]
    if (!scored) {
      element.addEventListener('click', updateScoreSelectionAndUI(combinationName))
    }
  }
}

rollButton.addEventListener('click', function() {
  gameState = updateGameValues(gameState, updateDiceValues(getNewDiceValues()))
  updateUIDice()
  var firstRoll = gameState.rollsRemaining == 3
  if (firstRoll) {
    rollDiceIn()
    listenForDieSelection()
    listenForScoreSelection()
  }
  gameState = updateGameValues(gameState, decrementRolls())
  updateUIButtons()
})

scoreButton.addEventListener('click', function() {
  gameState = updateGameValues(gameState, { type: 'markScore' })
  gameState = updateGameValues(gameState, resetRolls())
  rollDiceOut()
  unselectAllDice()
  updateUIButtons()
  removeListeners()
  removeDiceListeners()
})
