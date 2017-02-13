// $(document).ready(function() {

  var scoreButton = document.getElementById("score");
  $(scoreButton).hide();
  var rollButton = document.getElementById("roll-button");
  var buttonRollCount = document.getElementById("rolls-remaining");

  var diceValue = [];
  var rolls = 0;
  var rollsRemaining = 3;
  var upperTotal = 0;
  var lowerTotal = 0;
  var scoredItem;
  var turnCount = 13;
  var scoreForTotal;

  $( "#roll-button" ).click(function() {
    rolls += 1;
    rollsRemaining -= 1;
    buttonRollCount.innerHTML = rollsRemaining;
    $(scoreButton).show();
    $(scoreButton).removeClass( "button-wide" );
    $(rollButton).removeClass( "button-wide" );
    if (rolls >= 4) {
      console.log("You have no rolls left!");
    } else {
      if (rolls >= 3) {
        $(scoreButton).addClass( "button-wide" );
        $(rollButton).hide();
      };
      for (var i = 1; i < 6; i++) {
        var die = document.getElementById("die-" + i + "");
        if (!$(die).hasClass( "die-kept" )) {
          var dieNumber = Math.floor( Math.random() * 6 ) + 1;
          die.setAttribute("dievalue", dieNumber);
          die.src = "images/" + dieNumber + ".svg";
          $(".die-" + i + "").append(die);
        };
      };
    };
  });

  $( ".die" ).click(function() {
    if ($(event.target).hasClass( "die-kept" )) {
      $(event.target).removeClass( "die-kept" );
    } else {
      $(event.target).addClass( "die-kept" );
    };
  });

  $( ".total-number" ).click(function() {
    if (rolls >= 1) {
      scoredItem = event.target;
      var totalNumber = document.getElementsByClassName('total-number');
      for (var i = 1; i < 6; i++) {
        var die = document.getElementById("die-" + i + "");
        var attribute = die.getAttribute("dievalue");
        diceValue.push(parseInt(attribute));
      };
      for (i = 0; i < 6; i++) {
        if (event.target === totalNumber[i]) {
          function matchNumber(die) {
            return die === (i + 1);
          };
          var score = diceValue.filter(matchNumber);
        };
      };
      function add(a, b) {
        return a + b;
      };
      var totalScore = score.reduce(add, 0);
      event.target.innerHTML = totalScore;
      scoreForTotal = totalScore;
      console.log("scoreForTotal is ", scoreForTotal);
      diceValue = [];
    };
  });

  $( ".specified" ).click(function() {
    if (rolls >= 1) {
      scoredItem = event.target;
      var itemScore = event.target.getAttribute("data-score");
      event.target.innerHTML = itemScore;
      for (var i = 1; i < 6; i++) {
        var die = document.getElementById("die-" + i + "");
        var attribute = die.getAttribute("dievalue");
        diceValue.push(parseInt(attribute));
      };
      if ($(event.target).hasClass( "yahtzee" )) {
        var yahtzee = function checkForYahtzee(dice) {
         return dice.every(die => die === dice[0]);
        }
        if (yahtzee(diceValue)) {
          event.target.innerHTML = itemScore;
        } else {
          event.target.innerHTML = 0;
        }
      }
      diceValue = [];
    };
  });

  $( ".total" ).click(function() {
    if (rolls >= 1) {
      scoredItem = event.target;
      for (var i = 1; i < 6; i++) {
        var die = document.getElementById("die-" + i + "");
        var attribute = die.getAttribute("dievalue");
        diceValue.push(parseInt(attribute));
      };
      function add(a, b) {
        return a + b;
      };
      var totalScore = diceValue.reduce(add, 0);
      event.target.innerHTML = totalScore;
      diceValue = [];
    };
  });

  //the function below is impure!! because it relies on outside state/shared state

  $( "#score" ).click(function() {
    upperTotal += scoreForTotal;
    console.log("upperTotal is ", upperTotal);
    var upperTotalScore = document.getElementById('upper-total');
    upperTotalScore.innerHTML = upperTotal;
    rolls = 0;
    rollsRemaining = 3;
    buttonRollCount.innerHTML = 3;
    $('img').removeClass( "die-kept" );
    $(scoreButton).hide();
    $(rollButton).show();
    $(rollButton).addClass( "button-wide" );
    scoredItem.setAttribute("status", "scored");
    turnCount -= 1;
    var turns = document.getElementById("turns");
    turns.innerHTML = turnCount;
  });

  var score = document.getElementsByClassName( "score" );
  for (var i = 0; i < 6; i++) {
    score[i].setAttribute("status", "inactive");
  };

  $( ".score" ).click(function() {
    if (rolls >= 1) {
      event.target.setAttribute("status", "active");
      for (var i = 0; i < 13; i++) {
        var status = score[i].getAttribute("status");
        if (score[i] !== event.target && status !== 'scored') {
          score[i].setAttribute("status", "inactive");
          score[i].innerHTML = '';
        };
      };
    };
  });
// });
