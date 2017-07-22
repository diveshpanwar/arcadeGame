$(function(){
  game.display();
  $("#pSprite").change(function(){
    $("#spriteO").attr("src",$("#pSprite option:selected").val());
  });

  $("#pName").keyup(function() {
    var newVal = $("#pName").val();
    $("#pNameO").html(newVal);
  });

  $("#startBtn").click(function(){
    game.startGame();
  });
// if save score button is clicked
    $("#winnerModalSave").click(function() {
      player.saveScore();
      game.displayScore();
      $("#winnerModal").modal('hide');
      game.reset();
      player.reset();
      allEnemies.length = 1;//reset the length of the enemy array
      allGems.length = 0;
      allLives.length = 0;
      game.numOfGems = 0;
    });
//if restart game button is clicked
    $("#winnerModalRestart").click(function() {
      $("#winnerModal").modal('hide');
      game.reset();
      player.reset();
      allEnemies.length=1;//reset the length of the enemy array
      allGems.length = 0;
      allLives.length = 0;
      game.numOfGems = 0;
      game.startGame();
    });
//modal is closed
    $("#winnerModalClose").click(function() {
      game.reset();
      player.reset();
      allEnemies.length=1;//reset the length of the enemy array
      allGems.length = 0;
      allLives.length = 0;
      game.numOfGems = 0;
    });
//if view instructions is clicked
    $("#instructions").click(function() {
      $("#instructionsModal").modal('show');
    });
//if mouse is clicked inside the canvas
    $("#canvas").mousedown(function (e) {
      //mouse handling events for devices with smaller screens only
      if(window.innerWidth < 992){
        console.log(window.innerWidth);
        player.handleMouseInput(e);
      }
    });
});
