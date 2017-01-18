var dieNumber;

function rollDice() {
  dieNumber = Math.floor( Math.random() * 6 ) + 1
  document.querySelector('.dice').innerHTML = '<img src="images/' + dieNumber + '.svg" class="dice-image" alt="">'
  console.log(dieNumber)
}

rollDice()

for (var i = 1; i < 6; i++) {
  console.log(i)
}
