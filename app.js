$(document).ready(function() {

  var $diceValue = [];
  var $rolls = 0;

  $( "#roll-button" ).click(function() {
    if ($rolls >= 3) {
      console.log("You have no rolls left!");
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

  $( "#score" ).click(function() {
    $diceValue = [];
    $rolls = 0;
    $('img').removeClass( "die-kept" );
  });

  $( ".total-number" ).click(function() {
    var $totalNumber = document.getElementsByClassName('total-number');
    console.log($totalNumber)
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
        console.log($score)
      };
      console.log($score)
    };
    function add(a, b) {
      return a + b;
    };
    console.log($score)
    var $totalScore = $score.reduce(add, 0);
    event.target.innerHTML = $totalScore;
  });

  $( ".specified" ).click(function() {
    var $itemScore = event.target.getAttribute("data-score");
    console.log($itemScore);
    event.target.innerHTML = $itemScore;
  });

  $( ".total" ).click(function() {
    console.log("diceValue is ", $diceValue);
    for (var i = 1; i < 6; i++) {
      var $die = document.getElementById("die-" + i + "");
      var $attribute = $die.getAttribute("dievalue");
      $diceValue.push(parseInt($attribute));
      console.log("$diceValue in loop is ", $diceValue)
    }
    console.log("diceValue after is ", $diceValue);
    function add(a, b) {
      return a + b;
    };
    var $totalScore = $diceValue.reduce(add, 0);
    event.target.innerHTML = $totalScore;
  });


});
