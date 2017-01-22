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
        if ($rolls === 2) {
          var $attribute = $die.getAttribute("dievalue");
          $diceValue.push(parseInt($attribute));
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

  $( ".upper" ).click(function() {
    var $upper = document.getElementsByClassName('upper');
    for (i = 0; i < 6; i++) {
      if (event.target === $upper[i]) {
        function matchNumber(die) {
          return die === (i + 1);
        }
        var $score = $diceValue.filter(matchNumber)
      }
    }
    function add(a, b) {
      return a + b;
    }
    var $totalScore = $score.reduce(add, 0);
    event.target.innerHTML = $totalScore
  })

});
