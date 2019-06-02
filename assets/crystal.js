$(document).ready(function() {

    var yourMatchingNumber = 0;
  
    // random number gen
    var randomNum = randomNumGen();
  
    // variables
    var wins = 0;
    var losses = 0;
    var crystals;
  
    // crystal value function
    function randomNumCrystals() {
      
      return {
        violet: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "./assets/crystal.jpg"
        },
        blue: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "./assets/crystal1.jpg"
        },
        pink: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "./assets/crystal2.jpg"
        },
        green: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "./assets/crystal3.jpg"
        }
      };
    }
  
    // random value 19-120
    function randomNumGen() {
      return Math.floor(Math.random() * 102) + 19;
    }
  
    // game reset
    function setGame() {
      // total
      yourMatchingNumber = 0;
      // crystal values
      crystals = randomNumCrystals();
      // random target number 
      randomNum = randomNumGen();
      $("#random-area").text(randomNum);
    }
  
    //page update
    function updateDom(didUserWin) {
      $("#win-area").empty();
  
      // wins
      if (didUserWin === true) {
        // win alert/restart/new random value
        $("#win-area").append($("<p>").text("Nice Your a Crystal Expert!"));
        setGame();
        renderMatchingNumber();
      }
      // losses
      else if (didUserWin === false) {
        // loss alert/restart
        $("#win-area").append($("<p>").text("Ouch, Try Again."));
        setGame();
        renderMatchingNumber();
      }
  
      // scoreboard
      var wSpan = $("<span>").text(wins);
      var lSpan = $("<span>").text(losses);
  
      var pWins = $("<p>").text("Wins: ");
      var pLosses = $("<p>").text("Losses: ");
  
      pWins.append(wSpan);
      pLosses.append(lSpan);
  
      $("#win-area").append(pWins);
      $("#win-area").append(pLosses);
    }
  
    // crystals display
    function renderCrystals() {
      for (var key in crystals) {
        var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
        var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
        crystalDiv.append(crystalImg);
        $("#crystal-area").append(crystalDiv);
      }
    }
  
    // updates crystal click value
    function updateMatchingNumber(crystal) {
      
      yourMatchingNumber += crystals[crystal.attr("data-name")].points;
    }
  
    // updates guess 
    function renderMatchingNumber() {
      var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
      $("#score-area").html();
      $("#score-area").html(scoreNumDiv);
    }
  
    // start game
    setGame();
    updateDom();
    renderCrystals();
    renderMatchingNumber();
  
    // crystal clicks
    $(".crystals-button").on("click", function(event) {
      //updates guess
      updateMatchingNumber($(this));
      renderMatchingNumber();
  
      // check wins/losses
      if (yourMatchingNumber === randomNum) {
        
        wins++;
        setGame();
        updateDom(true);
      }
     
      else if (yourMatchingNumber > randomNum) {
        
        losses++;
        setGame();
        updateDom(false);
      }
    });
  
  });
  