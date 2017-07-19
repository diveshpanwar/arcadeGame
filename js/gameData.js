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
    var pName = $("#pName").val();
    var sprite = $("#pSprite option:selected").val();
    var level = $("#level option:selected").text();
    var levelIndex = $("#level option:selected").val();
    if(pName == null || pName == "") {
      alert("Please Enter a Player Name");
      return;
    }
    $("#start").addClass("hideContainer");
    $("#gameContainer").removeClass("hideContainer");
    $("#playerName").html(pName);
    $("#pLevel").html(level);
    $("#pLives").html(player.lives);
    $("#pScore").html(player.score);
    $("#canvas").removeClass("hideContainer");
    game.displayGameData();
    //console.log(sprite);
    player.name = pName;
    player.sprite = sprite;
      var numBugs = game.levels[levelIndex].bugs;
      for(var i = 0; i<numBugs-1; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
      }
      setInterval(game.renderTime, 1000);
      player.init(game.levels[levelIndex]);
    init();
  });

});
