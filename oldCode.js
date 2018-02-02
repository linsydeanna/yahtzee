
// $(".total-number").click(function() {
//   if (rolls >= 1) {
//     scoredItem = event.target;
//     var totalNumber = document.getElementsByClassName('total-number');
//     for (var i = 1; i < 6; i++) {
//       var die = document.getElementById("die-" + i + "");
//       var attribute = die.getAttribute("dievalue");
//       diceValue.push(parseInt(attribute));
//     };
//     for (i = 0; i < 6; i++) {
//       if (event.target === totalNumber[i]) {
//         function matchNumber(die) {
//           return die === (i + 1);
//         };
//         var score = diceValue.filter(matchNumber);
//       };
//     };
//     function add(a, b) {
//       return a + b;
//     };
//     var totalScore = score.reduce(add, 0);
//     event.target.innerHTML = totalScore;
//     scoreForUpperTotal = totalScore;
//     diceValue = [];
//   };
// });
// $(".specified").click(function() {
//   if (rolls >= 1) {
//     scoredItem = event.target;
//     var itemScore = event.target.getAttribute("data-score");
//     event.target.innerHTML = itemScore;
//     for (var i = 1; i < 6; i++) {
//       var die = document.getElementById("die-" + i + "");
//       var attribute = die.getAttribute("dievalue");
//       diceValue.push(parseInt(attribute));
//     };
//     if ($(event.target).hasClass("yahtzee")) {
//       var yahtzee = function checkForYahtzee(dice) {
//         return dice.every(die => die === dice[0]);
//       }
//       if (yahtzee(diceValue)) {
//         event.target.innerHTML = itemScore;
//       } else {
//         event.target.innerHTML = 0;
//       }
//     }
//     diceValue = [];
//     scoreForUpperTotal = 0;
//   };
// });
// $(".total").click(function() {
//   if (rolls >= 1) {
//     scoredItem = event.target;
//     for (var i = 1; i < 6; i++) {
//       var die = document.getElementById("die-" + i + "");
//       var attribute = die.getAttribute("dievalue");
//       diceValue.push(parseInt(attribute));
//     };
//     function add(a, b) {
//       return a + b;
//     };
//     var totalScore = diceValue.reduce(add, 0);
//     event.target.innerHTML = totalScore;
//     diceValue = [];
//     scoreForUpperTotal = 0;
//   };
// });
// $("#score").click(function() {
//   upperTotal += scoreForUpperTotal;
//   if (upperTotal > 62) {
//     var bonusArea = document.getElementById('bonus');
//     bonusArea.innerHTML = 35;
//     upperTotal += 35
//   }
//   var upperTotalScore = document.getElementById('upper-total');
//   upperTotalScore.innerHTML = upperTotal;
//   rolls = 0;
//   rollsRemaining = 3;
//   buttonRollCount.innerHTML = 3;
//   $('img').removeClass("die-kept");
//   $(scoreButton).hide();
//   $(rollButton).show();
//   $(rollButton).addClass("button-wide");
//   scoredItem.setAttribute("status", "scored");
//   turnCount -= 1;
//   var turns = document.getElementById("turns");
//   turns.innerHTML = turnCount;
//   $(dice).removeClass("die-animate");
//   $(dice).addClass("die-animate-two");
//   $(dice).addClass("die-start");
// });
// var score = document.getElementsByClassName("score");
// for (var i = 0; i < 6; i++) {
//   score[i].setAttribute("status", "inactive");
// };
// $(".score").click(function() {
//   if (rolls >= 1) {
//     event.target.setAttribute("status", "active");
//     for (var i = 0; i < 13; i++) {
//       var status = score[i].getAttribute("status");
//       if (score[i] !== event.target && status !== 'scored') {
//         score[i].setAttribute("status", "inactive");
//         score[i].innerHTML = '';
//       };
//     };
//   };
// });
  // });
