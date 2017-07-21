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
      // code already executed when the modal iis displayed
      // $("#start").removeClass("hideContainer");
      // $("#gameContainer").addClass("hideContainer");
      $("#winnerModal").modal('hide');
      game.reset();
      player.reset();
      allEnemies.length=1;//reset the length of the enemy array
    });

    $("#winnerModalRestart").click(function() {
      $("#winnerModal").modal('hide');
      game.reset();
      player.reset();
      allEnemies.length=1;//reset the length of the enemy array
      game.startGame();
    });

    $("#winnerModalClose").click(function() {
      game.reset();
      player.reset();
      allEnemies.length=1;//reset the length of the enemy array
    });

});
