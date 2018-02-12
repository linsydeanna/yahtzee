// default game state

var defaultGameState = {
  currentScoreSelection: {
    combinationName: '',
    value: null
  },
  diceValues: [],
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
  rollsRemaining: 3,
  turnCount: 13,
  leftScore: 0,
  rightScore: 0
}



// game state

var gameState = defaultGameState



// reducers

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
          value: isNumberOfAKind(prevState.diceValues, 3) ?
            getSumOfAllDice(prevState.diceValues) :
            0
        }
      })
    case ('selectFourOfAKind'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: isNumberOfAKind(prevState.diceValues, 4) ?
            getSumOfAllDice(prevState.diceValues) :
            0
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
          value: isFullHouse(prevState.diceValues) ? 25 : 0
        }
      })
    case ('selectSmallStraight'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: isSmallStraight(prevState.diceValues) ?
            30 :
            0
        }
      })
    case ('selectLargeStraight'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: prevState.diceValues.join('') === '12345' || prevState.diceValues.join('') === '23456' ?
            40 :
            0
        }
      })
    case ('selectYahtzee'):
      return Object.assign({}, prevState, {
        currentScoreSelection: {
          combinationName: action.combinationName,
          value: prevState.diceValues.every(die => die === dice[0]) ? 50 : 0 // ES6
        }
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
    case ('decrementTurnCount'):
      return Object.assign({}, prevState, {
        turnCount: prevState.turnCount - 1
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

function decrementTurnCount() {
  return {
    type: 'decrementTurnCount'
  }
}

function markScore() {
  return {
    type: 'markScore'
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
var turnCount = document.getElementById("turn-count")
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

function isNumberOfAKind(diceValues, number) {
  var isCombination
  for (var i = 0; i < 4; i++) {
    if (diceValues.filter(function(die) { return die == diceValues[i] }).length >= number) {
      isCombination = true
    }
  }
  return !!isCombination
}

function isFullHouse(diceValues) {
  count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  for (var i = 0; i < diceValues.length; i++) {
    count[diceValues[i]]++
  }
  return Object.values(count).filter(function(c) { return c != 0 }).sort().join('').toString() === '23'
}

function isSmallStraight(diceValues) {
  var values = diceValues.filter(function(die, index) { // remove duplicates, sort, and convert to string
    return diceValues.indexOf(die) == index;
  }).sort().join('').toString()
  return values.includes('1234') || values.includes('2345') || values.includes('3456')
}

function getSumOfNumber(diceValues, n) {
  return diceValues
    .filter(function(die) { return die == n })
    .reduce(function(a, b) { return a + b }, 0)
}

function getSumOfAllDice(diceValues) {
  return diceValues.reduce(function(a, b) { return a + b }, 0)
}

function removeScoreSelectionListeners() {
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

function updateUITurnCount() {
  turnCount.innerHTML = gameState.turnCount
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
  gameState = updateGameValues(gameState, markScore())
  gameState = updateGameValues(gameState, resetRolls())
  gameState = updateGameValues(gameState, decrementTurnCount())
  rollDiceOut()
  unselectAllDice()
  updateUIButtons()
  updateUITurnCount()
  removeScoreSelectionListeners()
  removeDiceListeners()
})
