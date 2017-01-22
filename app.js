$(document).ready(function() {

  var $diceValue = [];
  var $rolls = 0;

  $( "#roll-button" ).click(function() {

      for (var i = 1; i < 6; i++) {
        var $die = document.getElementById("die-" + i + "");
        if ($($die).hasClass( "die-kept" )) {
          var $attribute = $die.getAttribute("dievalue");
          $diceValue.push({
            die: $die.id,
            value: $attribute
          });
        } else {
          var $dieNumber = Math.floor( Math.random() * 6 ) + 1;
          $die.setAttribute("dievalue", $dieNumber);
          $die.src = "images/" + $dieNumber + ".svg";
          $(".die-" + i + "").append($die);
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

});
