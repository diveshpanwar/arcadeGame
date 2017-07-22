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
      game.numOfGems = 0;
    });

    $("#winnerModalRestart").click(function() {
      $("#winnerModal").modal('hide');
      game.reset();
      player.reset();
      allEnemies.length=1;//reset the length of the enemy array
      allGems.length = 0;
      game.numOfGems = 0;
      game.startGame();
    });

    $("#winnerModalClose").click(function() {
      game.reset();
      player.reset();
      allEnemies.length=1;//reset the length of the enemy array
      allGems.length = 0;
      game.numOfGems = 0;
    });

    $("#instructions").click(function() {
      $("#instructionsModal").modal('show');
    });

    $("#canvas").mousedown(function (e) {
      player.handleMouseInput(e);
        });

});
