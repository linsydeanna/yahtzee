$(document).ready(function() {

  var $scoreButton = document.getElementById("score");
  $($scoreButton).hide();
  var $rollButton = document.getElementById("roll-button");

  var $diceValue = [];
  var $rolls = 0;
  var $upperTotal = 0;
  var $lowerTotal = 0;

  $( "#roll-button" ).click(function() {
    $($scoreButton).show();
    $($scoreButton).removeClass( "button-wide" );
    $($rollButton).removeClass( "button-wide" );
    if ($rolls >= 3) {
      console.log("You have no rolls left!");
    } else if ($rolls > 1) {
      $($scoreButton).addClass( "button-wide" );
      $($rollButton).hide();
    } else {
      for (var i = 1; i < 6; i++) {
        var $die = document.getElementById("die-" + i + "");
        if (!$($die).hasClass( "die-kept" )) {
          var $dieNumber = Math.floor( Math.random() * 6 ) + 1;
          $die.setAttribute("dievalue", $dieNumber);
          $die.src = "images/" + $dieNumber + ".svg";
          $(".die-" + i + "").append($die);
        };
      };
    };
    $rolls += 1;
  });

  $( ".die" ).click(function() {
    if ($(event.target).hasClass( "die-kept" )) {
      $(event.target).removeClass( "die-kept" );
    } else {
      $(event.target).addClass( "die-kept" );
    };
  });

  $( ".total-number" ).click(function() {
    var $totalNumber = document.getElementsByClassName('total-number');
    for (var i = 1; i < 6; i++) {
      var $die = document.getElementById("die-" + i + "");
      var $attribute = $die.getAttribute("dievalue");
      $diceValue.push(parseInt($attribute));
    }
    for (i = 0; i < 6; i++) {
      if (event.target === $totalNumber[i]) {
        function matchNumber(die) {
          return die === (i + 1);
        };
        var $score = $diceValue.filter(matchNumber);
      };
    };
    function add(a, b) {
      return a + b;
    };
    var $totalScore = $score.reduce(add, 0);
    event.target.innerHTML = $totalScore;
  });
  $( ".specified" ).click(function() {
    var $itemScore = event.target.getAttribute("data-score");
    event.target.innerHTML = $itemScore;
  });

  $( ".total" ).click(function() {
    for (var i = 1; i < 6; i++) {
      var $die = document.getElementById("die-" + i + "");
      var $attribute = $die.getAttribute("dievalue");
      $diceValue.push(parseInt($attribute));
    };
    function add(a, b) {
      return a + b;
    };
    var $totalScore = $diceValue.reduce(add, 0);
    event.target.innerHTML = $totalScore;
  });

  $( "#score" ).click(function() {
    $diceValue = [];
    $rolls = 0;
    $('img').removeClass( "die-kept" );
    $($scoreButton).hide();
    $($rollButton).show();
    $($rollButton).addClass( "button-wide" );
  });

});
