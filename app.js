$(document).ready(function() {

  $( "#roll-button" ).click(function() {
    for (var i = 1; i < 6; i++) {
      var $dieNumber = Math.floor( Math.random() * 6 ) + 1;
      var $die = document.getElementById("die-" + i + "");
      $die.src = "images/" + $dieNumber + ".svg";
      $(".dice-" + i + "").append($die);
    }
  });

})
