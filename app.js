$(document).ready(function() {

function rollDice() {
  for (var i = 1; i < 6; i++) {

    console.log("i is ", i);

    var $dieNumber = Math.floor( Math.random() * 6 ) + 1;
    console.log($dieNumber);

    var $die = $( "<div class=' dice-image dice-" + i + "'></div>" )
    console.log("die is ", $die)
    $(".dice").append($die)
    console.log("die is ", $die)

    var $image = document.createElement('img');
    console.log($image);
    $image.src = "images/" + $dieNumber + ".svg";
    $(".dice-" + i + "").append($image);

  }

}

rollDice();




})
