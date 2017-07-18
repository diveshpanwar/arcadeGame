var game = {
  "levels": [
    {
      "name":"Easy",
      "index": "0",
      "bugs": 3,
      "lives":0,
      "maxPoints": 300
    },
    {
      "name":"Medium",
      "index": "1",
      "bugs": 5,
      "lives":1,
      "maxPoints": 600
    },
    {
      "name":"Hard",
      "index": "2",
      "bugs": 7,
      "lives":2,
      "maxPoints": 900
    }
  ],
  "playerSprites": [
    {
      "name": "char-boy",
      "sprite": "images/char-boy.png"
    },
    {
      "name": "char-cat-girl",
      "sprite": "images/char-cat-girl.png"
    },
    {
      "name": "char-horn-girl",
      "sprite": "images/char-horn-girl.png"
    },
    {
      "name": "char-pink-girl",
      "sprite": "images/char-pink-girl.png"
    },
    {
      "name": "char-princess-girl",
      "sprite": "images/char-princess-girl.png"
    }
  ],
  display: function(){
    $("#start .col-md-6:first").append('<input class="form-control form-group" id="pName" placeholder="Player Name">');
    $("#start .col-md-6:first").append('<select class="form-control form-group" id="level"></select>');
    game.levels.forEach(function(level) {
      $("#start .col-md-6:first select:last").append('<option value="'+level.index+'">'+level.name+'</option>');
    });
    $("#start .col-md-6:first").append('<select class="form-control form-group" id="pSprite"></select>');
    game.playerSprites.forEach(function(sprite) {
      $("#start .col-md-6:first select:last").append('<option value="'+sprite.sprite+'">'+sprite.name+'</option>');
    });
    $("#start .col-md-6:first").append('<button class="btn btn-success form-group" id="startBtn">Start Game</select>');
    $("#canvas").addClass("hideContainer");
  }
};

var gameScore = {
  score: [
    {
      "pName": "Divesh",
      "hScore": "1000",
      "level": "3"
  }
],
  update : function() {

  }
};

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
    $("#pScore").html(score);
    $("#canvas").removeClass("hideContainer");
    console.log(sprite);
    player.sprite = sprite;
      var numBugs = game.levels[levelIndex].bugs;
      for(var i = 0; i<numBugs-1; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
      }

    init();
  });

});
