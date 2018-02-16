// default game state

var defaultState = {
  currentScoreSelection: {
    combinationName: '',
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
  },
  turnCount: 13
}



// game state

var gameState = gameStateReducer()



// reducers

function gameStateReducer(prevState = defaultState, action = {}) {
  // console.log('prevState ', prevState);
  return {
    currentScoreSelection: currentScoreSelection(prevState.currentScoreSelection, action, prevState.diceValues),
    diceValues: diceValues(prevState.diceValues, action),
    rollsRemaining: rollsRemaining(prevState.rollsRemaining, action),
    scoreSheet: scoreSheet(prevState.scoreSheet, action, prevState.currentScoreSelection),
    turnCount: turnCount(prevState.turnCount, action)
  }
}

function currentScoreSelection(prevState = currentScoreSelectionDefaultState, action, diceValues) {
  // console.log('prevState ', prevState)
  // console.log('action ', action);
  switch (action.type) {
    case ('removeCurrentScoreSelection'):
      return {
        combinationName: '',
        value: null
      }
    case ('selectOnes'):
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 1)
      }
    case ('selectTwos'):
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 2)
      }
    case ('selectThrees'):
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 3)
      }
    case ('selectFours'):
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 4)
      }
    case ('selectFives'):
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 5)
      }
    case ('selectSixes'):
      return {
        combinationName: action.combinationName,
        value: getSumOfNumber(diceValues, 6)
      }
    case ('selectThreeOfAKind'):
      return {
        combinationName: action.combinationName,
        value: isNumberOfAKind(diceValues, 3) ?
          getSumOfAllDice(diceValues) :
          0
      }
    case ('selectFourOfAKind'):
      return {
        combinationName: action.combinationName,
        value: isNumberOfAKind(diceValues, 4) ?
          getSumOfAllDice(diceValues) :
          0
      }
    case ('selectChance'):
      return {
        combinationName: action.combinationName,
        value: getSumOfAllDice(diceValues)
      }
    case ('selectFullHouse'):
      return {
        combinationName: action.combinationName,
        value: isFullHouse(diceValues) ? 25 : 0
      }
    case ('selectSmallStraight'):
      return {
        combinationName: action.combinationName,
        value: isSmallStraight(diceValues) ?
          30 :
          0
      }
    case ('selectLargeStraight'):
      return {
        combinationName: action.combinationName,
        value: isLargeStraight(diceValues) ?
          40 :
          0
      }
    case ('selectYahtzee'):
      return {
        combinationName: action.combinationName,
        value: diceValues.every(die => die === dice[0]) ? 50 : 0
      }
    default:
      return prevState
  }
}

function diceValues(prevState, action) {
  if (action.type === 'updateDiceValues') console.log('action ', action);
  switch (action.type) {
    case ('updateDiceValues'):
      return [...action.newValues]
    default:
      return prevState
  }
}

function rollsRemaining(prevState, action) {
  // console.log('prevState ', prevState)
  // console.log('action ', action)
  switch (action.type) {
    case ('decrementRolls'): // NEEDSFIX remove parens
      return prevState - 1
    case ('resetRolls'):
      return 3
    default:
      return prevState
  }
}

function scoreSheet(prevState, action, { combinationName, value }) {
  // console.log('action ', action);
  switch (action.type) {
    case ('markScoreLeft'):
      return {
        ...prevState,
        left: {
          ...prevState.left,
          [`${combinationName}`]: value
        }
      }
    case ('markScoreRight'):
      return {
        ...prevState,
        right: {
          ...prevState.right,
          [`${combinationName}`]: value
        }
      }
    default:
      return prevState
  }
}

function turnCount(prevState = 13, action) {
  // console.log('prevState ', prevState)
  // console.log('action ', action)
  switch (action.type) {
    case ('decrementTurnCount'):
      return prevState - 1
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
  const isLeftScore = combinationName =>
    combinationName === 'ones' ||
    combinationName === 'twos' ||
    combinationName === 'threes' ||
    combinationName === 'fours' ||
    combinationName === 'fives' ||
    combinationName === 'sixes'
  return {
    type: isLeftScore(gameState.currentScoreSelection.combinationName) ? 'markScoreLeft' : 'markScoreRight'
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

function removeCurrentScoreSelection() {
  return {
    type: 'removeCurrentScoreSelection'
  }
}



// UI elements

var scoreButton = document.getElementById("score-button")
var rollButton = document.getElementById("roll-button")
var buttonRollCount = document.getElementById("rolls-remaining")
var turnCountEl = document.getElementById("turn-count")
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
  var values = gameState.diceValues.slice()
  for (var i = 1; i < 6; i++) {
    var die = document.getElementById("die-position-" + i + "")
    console.log('for die in position ', i, ' classes are ', die.classList);
    // console.log('die.className !== die-kept', die.className !== 'die-kept');
    if (die.className !== 'die-kept') {
      var newDieNumber = Math.floor(Math.random() * 6) + 1
      var index = i - 1
      values[index] = newDieNumber
    }
  }
  return values
}

function isNumberOfAKind(diceValues, number) {
  var values = diceValues.slice()
  var isCombination
  for (var i = 0; i < 4; i++) {
    if (values.filter(function(die) { return die == values[i] }).length >= number) {
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
  var diceValuesArray = diceValues.slice()
  var values = diceValuesArray.filter(function(die, index) { // remove duplicates, sort, and convert to string
    return diceValuesArray.indexOf(die) == index;
  }).sort().join('').toString()
  return values.includes('1234') || values.includes('2345') || values.includes('3456')
}

function isLargeStraight(diceValues) {
  var values = diceValues.slice()
  return values.sort().join('') === '12345' || values.sort().join('') === '23456'
}


function getSumOfNumber(diceValues, n) {
  var values = diceValues.slice()
  return values
    .filter(function(die) { return die == n })
    .reduce(function(a, b) { return a + b }, 0)
}

function getSumOfAllDice(diceValues) {
  var values = diceValues.slice()
  return values.reduce(function(a, b) { return a + b }, 0)
}

// function totalLeft() {

// }

// function totalRight() {

// }



// update UI

function updateUIButtons() { // checks current state and updates accordingly
  buttonRollCount.innerHTML = gameState.rollsRemaining

  var turnStart = gameState.rollsRemaining == 3
  var turnMiddle = gameState.rollsRemaining == 2 || gameState.rollsRemaining == 1
  var turnEnd = gameState.rollsRemaining == 0
  var scoreCombinationSelected = gameState.currentScoreSelection.value !== null

  if (turnMiddle && scoreCombinationSelected) { // display both roll button and score button
    scoreButton.classList.remove('button-invisible')
    rollButton.classList.remove('button-invisible')
  }

  if (turnStart || !scoreCombinationSelected) { // only display roll button
    rollButton.classList.remove('button-invisible')
    scoreButton.classList.add('button-invisible')
  }

  if (turnEnd && !scoreCombinationSelected) { // only display disabled score button
    rollButton.classList.add('button-invisible')
    scoreButton.classList.remove('button-invisible')
    scoreButton.classList.add('button-wide')
    scoreButton.disabled = true
  }

  if (turnEnd && scoreCombinationSelected) { // only display score button
    rollButton.classList.add('button-invisible')
    scoreButton.classList.remove('button-invisible')
    scoreButton.classList.add('button-wide')
    scoreButton.disabled = false
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
    var die = document.getElementById("die-position-" + i + "") // NEEDSFIX make all single quote
    die.classList.remove('die-kept')
  }
}

function updateUITurnCount() {
  turnCountEl.innerHTML = gameState.turnCount
}

function updateBonus() {
  var bonus = document.getElementById('bonus')
  console.log('gameState.scoreSheet.left ', gameState.scoreSheet.left);
}

function updateLeftTotal() {
  var leftTotalEl = document.getElementById('leftTotal')
  var leftScores = gameState.scoreSheet.left
  var leftTotal = Object.values(leftScores).reduce((acc, val) => acc + val)
  leftTotalEl.innerHTML = leftTotal
}

function updateRightTotal() {
  var rightTotalEl = document.getElementById('rightTotal')
  var rightScores = gameState.scoreSheet.right
  var rightTotal = Object.values(rightScores).reduce((acc, val) => acc + val)
  rightTotalEl.innerHTML = rightTotal
}

function updateUIScoreSheet(combination) {
  const scoreSheetCombinations = {
    ...gameState.scoreSheet.left,
    ...gameState.scoreSheet.right
  }
  for (i = 0; i < combinations.length; i++) {
    var element = document.getElementById(combinations[i].id)
    var combinationName = combinations[i].name
    var scored = scoreSheetCombinations[combinationName] !== null
    if (combination === combinationName) {
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
      gameState = gameStateReducer(
        gameState,
        selectScoreArea(combinationName)
      )
      updateUIScoreSheet(combinationName)
      updateUIButtons()
    }
  }
  const scoreSheetCombinations = {
    ...gameState.scoreSheet.left,
    ...gameState.scoreSheet.right
  }
  for (var i = 0; i < combinations.length; i++) {
    var element = document.getElementById(combinations[i].id)
    var combinationName = combinations[i].name
    var scored = scoreSheetCombinations[combinationName] !== null
    if (!scored) {
      element.addEventListener('click', updateScoreSelectionAndUI(combinationName))
    }
  }
}

rollButton.addEventListener('click', function() {
  gameState = gameStateReducer(gameState, updateDiceValues(getNewDiceValues()))
  updateUIDice()
  var firstRoll = gameState.rollsRemaining == 3
  if (firstRoll) {
    rollDiceIn()
    listenForDieSelection()
    listenForScoreSelection()
  }

  // These two blocks are order dependent

  gameState = gameStateReducer(gameState, removeCurrentScoreSelection())
  updateUIScoreSheet(gameState.currentScoreSelection.combinationName) // NEEDSFIX remove parameter

  gameState = gameStateReducer(gameState, decrementRolls())
  updateUIButtons()
})

scoreButton.addEventListener('click', function() {
  gameState = gameStateReducer(gameState, markScore())
  gameState = gameStateReducer(gameState, resetRolls())
  gameState = gameStateReducer(gameState, decrementTurnCount())
  updateLeftTotal()
  updateRightTotal()
  rollDiceOut()
  unselectAllDice()
  updateUIButtons()
  updateUITurnCount()
  removeScoreSelectionListeners()
  removeDiceListeners()
})

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
