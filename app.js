$(document).ready(function() {

  $( "#roll-button" ).click(function() {
    for (var i = 1; i < 6; i++) {
      var $dieNumber = Math.floor( Math.random() * 6 ) + 1;
      var $die = document.getElementById("die-" + i + "");
      $die.setAttribute("dievalue", $dieNumber)
      $die.src = "images/" + $dieNumber + ".svg";
      $(".die-" + i + "").append($die);
    }
  });

  $( ".die" ).click(function() {
    $(event.target).addClass( "die-kept" );
    var $attribute = event.target.getAttribute("dievalue");
    console.log("attribute of die is ", $attribute)
  });

})
