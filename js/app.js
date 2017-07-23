// helping variable
var highScoreTable = '<div class="center-block bg-info col-md-12 mt text-center bs-callout bs-callout-primary" id="scoreTable"><h4 class="text-center text-thick">High Scores</h4><table class="table table-hover"><thead><tr class="warning"><td>Player</td><td>Score</td><td>Level</td></tr></thead><tbody></table></div>';
var highScoreRow = '<tr><td>%name%</td><td>%score%</td><td>%level%</td></tr>';
// storage object
var storage = window.localStorage;

//game object to store basic game data
var Game = function(){
  this.numOfGems= 0;
  this.startTime= Date.now();
  this.gameTime= 0;
  this.nextGemCreateTime= 0;
  this.allGems=[];
  // various levels and their configurations
  this.levels= [
    {
      "NAME":"Easy",
      "INDEX": "0",
      "BUGS": 2,
      "LIVES":4,
      "ADDLIVES":0,
      "MAXGEMS": 50
    },
    {
      "NAME":"Medium",
      "INDEX": "1",
      "BUGS": 4,
      "LIVES":6,
      "ADDLIVES":1,
      "MAXGEMS": 100
    },
    {
      "NAME":"Hard",
      "INDEX": "2",
      "BUGS": 6,
      "LIVES":8,
      "ADDLIVES":2,
      "MAXGEMS": 150
    }
  ];
  this.playerSprites= [
    {
      "NAME": "char-boy",
      "SPRITE": "images/char-boy.png"
    },
    {
      "NAME": "char-cat-girl",
      "SPRITE": "images/char-cat-girl.png"
    },
    {
      "NAME": "char-horn-girl",
      "SPRITE": "images/char-horn-girl.png"
    },
    {
      "NAME": "char-pink-girl",
      "SPRITE": "images/char-pink-girl.png"
    },
    {
      "NAME": "char-princess-girl",
      "SPRITE": "images/char-princess-girl.png"
    }
  ];
};
  Game.prototype.gameTimeCounter = function() {
    // it tracks the time of the game in seconds
    this.gameTime = (Date.now() - this.startTime) / 1000;
  };

  //function to display the game time on the screen
  Game.prototype.renderTime= function() {
    $("#gameTime").html(Math.floor(this.gameTime));
  };

  //set time interval for the creation of the next gem especially if more than one gem is displayed simultaneously
  Game.prototype.gemCreator = function() {
    var gemCreateInterval = window.setInterval(Gems.createGems, 1000);
  };
  // reset game data
  Game.prototype.reset= function() {
    this.numOfGems = 0;
    this.startTime = Date.now();
    this.gameTime = 0;
    this.nextGemCreateTime = 0;
    $("#gameData1 h4:last").remove();
    $("#gameData2 h4:last").remove();
  };
  //initates the game by setting the values
  Game.prototype.startGame  = function() {
    var pName = $("#pName").val();
    var sprite = $("#pSprite option:selected").val();
    var level = $("#level option:selected").text();
    var levelIndex = $("#level option:selected").val();
    if(pName == null || pName == "") {
      alert("Please Enter a Player Name");
      return;
    }

    this.displayGameData();
    player.name = pName;
    player.sprite = sprite;
      var numBugs = this.levels[levelIndex].BUGS;
      //create bugs depending on the levels
      for(var i = 0; i<numBugs-1; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
      }
        this.gameTime = 0;
        this.startTime = Date.now();
      setInterval(this.renderTime, 1000);
      //set player properties according to the level and the data received
      player.init(this.levels[levelIndex]);
      init();
      //display main canvas and relevant data
      $("#start").addClass("hideContainer");
      $("#gameContainer").removeClass("hideContainer");
      $("#playerName").html(pName);
      $("#pLevel").html(level);
      $("#pLives").html(player.lives);
      $("#pScore").html(player.score);
  };
  //user settings
  Game.prototype.display= function(){
    $("#start .col-md-6:first").append('<input class="form-control form-group" id="pName" placeholder="Player Name">');
    $("#start .col-md-6:first").append('<select class="form-control form-group" id="level"></select>');
    this.levels.forEach(function(level) {
      $("#start .col-md-6:first select:last").append('<option value="'+level.INDEX+'">'+level.NAME+'</option>');
    });
    $("#start .col-md-6:first").append('<select class="form-control form-group" id="pSprite"></select>');
    this.playerSprites.forEach(function(sprite) {
      $("#start .col-md-6:first select:last").append('<option value="'+sprite.SPRITE+'">'+sprite.NAME+'</option>');
    });
    $("#start .col-md-6:first").append('<button class="btn btn-success form-group" id="startBtn">Start Game</select>');
    $("#start .col-md-6:first").append('<br><a class="text-center text-success" id="instructions">View Instructions</a>');
    // $("#canvas").addClass("hideContainer");
    // making canvas bit more responsive
    $("#canvas").addClass("img-responsive");
    $("#canvas").addClass("mauto");
    this.displayScore();
  };
  //display score table on the home screen
  Game.prototype.displayScore= function() {
    $("#scoreTable").remove("#scoreTable");
    if(storage.gameScoreDetails) {
      gameScoreDetails = JSON.parse(storage.gameScoreDetails);
    }
    if(gameScoreDetails.length != 0) {
      $("#start").append(highScoreTable);
      gameScoreDetails.forEach(function(detail) {
        $("#scoreTable tbody").append(highScoreRow.replace('%name%',detail.pName).replace('%score%',detail.hScore).replace('%level%',detail.level));
      });
      $("#scoreTable").append('<button id="clearScore" class="btn btn-danger hideContainer" onclick="game.clearScore()">Clear Score Data</button>');
      if(gameScoreDetails.length >1){
        $("#clearScore").removeClass("hideContainer");
      }
    }
  };
  //clear game score data
  Game.prototype.clearScore= function() {
    window.localStorage.clear(); // clear local storage
    gameScoreDetails.length = 1;
    this.displayScore();
  };

  //display time and the gems collected
  Game.prototype.displayGameData = function() {
    $("#gameData1").append('<h4>Time:<span id="gameTime"></span></h4>');
    $("#gameData2").append('<h4>Gems Collected:<span id="gemsCollected">0</span></h4>');
  };
//store the winner names at run time
var gameScoreDetails = [
    {
      "pName": "Divesh",
      "hScore": "1000",
      "level": "Hard"
  }
];

// Game Board to use blocks for the positioning of the gems and lives works fine even if the gameBoard settings change
var gameBoard = {
    "settings" : {
        "widthInBlocks" : 6,
        "heightInBlocks" : 7
    },
    "stats" : {
        "blockSizeX" : 101,
        "blockSizeY" : 83
    }
};

// Converts the Y block number to Y coordinate
gameBoard.calcYPosition = function(ypos, yOffset) {
    return ypos * gameBoard.stats.blockSizeY  - yOffset;
};

// Converts the X block number to X coordinate
gameBoard.calcXPosition = function(xpos, xOffset) {
    return xpos * gameBoard.stats.blockSizeX  - xOffset;
};

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    if(this.speed<70) {
      this.speed+=70;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // prevent bugs from moving at very slow speed
    if(this.speed<70) {
      this.speed+=70;
    }
    //mod function ensures that the bug is positioned at the initial position once it goes outside the canvas scope
    this.x = (this.x + (this.speed*dt))%610;
    //update the speed and the y coordinate of the bug
    if(this.x > 605) {
      this.y = Math.random() * 184 + 100;
      this.speed = Math.random() * 256;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //calculate the game time
    game.gameTimeCounter();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.name = "XYZ";
  this.x = x;
  this.y = y;
  this.gemsCollected = 0;
  this.lives = 4;
  this.playerYOffset = -30;
  this.playerXOffset = 20;
  this.score = 0;
  this.gameBoardX = 3;
  this.gameBoardY = 7;
  this.sprite = 'images/char-boy.png';
  this.addLives = 0; //additional lives for a player
};

//update player properties according to the game object passed
Player.prototype.init = function(gameObj) {
  this.level = gameObj.NAME;
  this.maxGems = gameObj.MAXGEMS;
  this.lives = gameObj.LIVES;
  this.addLives = gameObj.ADDLIVES;
};

//reset player details
Player.prototype.reset = function() {
  this.name = "XYZ";
  this.score = 0;
  this.gemsCollected = 0;
  this.addLives = 0;
  this.x = 202.5;
  this.y = 399;
};
//player update function
Player.prototype.update = function() {
      // check if player reaches bottom, right or left of canvas boundary
      if (this.y > 463 ) {
          this.y = 463;
      }
      if (this.x > 510.5) {
          this.x = 510.5;
      }
      if (this.x < 2.5) {
          this.x = 2.5;
      }
};
//update the lives of the player and generate the life lines if the level allows also checks for the game Over Status
Player.prototype.updateLives = function() {
  this.lives-=1;
  if(this.lives<2 && this.addLives>0) {
    var lifeLine = new LifeLines();
    this.addLives--;
    allLives.push(lifeLine);
  }
  if(this.lives<0) {
    $("#myModalLabel").html("You Loose!");
    $(".modal-body h3").html("Better Luck Next Time");
    $("#winnerModalSave").addClass("hideContainer");
    $("#start").removeClass("hideContainer");
    $("#gameContainer").addClass("hideContainer");
    $('#winnerModal').modal('show');
  }
  $("#pLives").html(player.lives);
};
// updates the score of the player and also checks if the player has won or not
Player.prototype.updateScore = function() {
  $("#pScore").html(player.score);
  this.gemsCollected+=1;
  $("#gemsCollected").html(player.gemsCollected);
  game.numOfGems-=1;
  if( this.gemsCollected >= this.maxGems) {
  $("#start").removeClass("hideContainer");
  $("#myModalLabel").html("You Won");
  $(".modal-body h3").html("Congratulations!");
  $("#winnerModalSave").removeClass("hideContainer");
  $("#gameContainer").addClass("hideContainer");
  $('#winnerModal').modal('show');
  }
};
// If player chooses to save his score than save it
Player.prototype.saveScore = function() {
  var data = {};
  data.pName = this.name;
  data.hScore = this.score;
  data.level = this.level;
  gameScoreDetails.push(data);
  storage.gameScoreDetails = JSON.stringify(gameScoreDetails);
};

//render the playeer on the canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//handle the movement of the player on the screen
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= 100;
    }
    if (keyPress == 'up') {
        this.y -= 80;
    }
    if (keyPress == 'right') {
        this.x += 100;
    }
    if (keyPress == 'down') {
        this.y += 80;
    }
};
//mouse events for the smaller screens
Player.prototype.handleMouseInput = function(e) {
  var height = $("#canvas").height();
  var width = $("#canvas").width();
  var xyOffset = $("#canvas").offset();
  var topOffset = xyOffset.top;
  var leftOffset = xyOffset.left;
  var height1 = height/4;
  var height3 = height1*3;
  width2 = width/2;
  var mouseX = parseInt(e.clientX);
  var mouseY = parseInt(e.clientY);
  if(mouseX>leftOffset && mouseX<width+leftOffset && mouseY>topOffset && mouseY<height1+topOffset) {
    console.log("top");
    this.y -= 80;
  }else if(mouseX>leftOffset && mouseX<width+leftOffset && mouseY>height3+topOffset-50 && mouseY<height+topOffset) {
      console.log("bottom");
      this.y += 80;
    }else if(mouseX>leftOffset && mouseX<width2+leftOffset && mouseY>height1+topOffset && mouseY<height3+topOffset-50) {
        console.log("left");
        this.x -= 100;
      }else if(mouseX>width2+leftOffset && mouseX<width+leftOffset && mouseY>height1+topOffset && mouseY<height3-50+topOffset) {
          console.log("right");
          this.x += 100;
        }
};

//checkCollisions between an enemy and the player
Player.prototype.checkCollision = function(enemy) {
    // check for collision between enemy and player
    if (this.y + 131 >= enemy.y + 90 && this.x + 20 <= enemy.x + 88 && this.y + 73 <= enemy.y + 140 && this.x + 71 >= enemy.x + 11) {
        console.log('died due to collision');
        this.updateLives();
        this.x = 202.5;
        this.y = 399;
    }

    //check for player reaching top of the canvas and die
    if (this.y + 23 <= 0) {
            this.x = 202.5;
            this.y = 399;
            console.log('You are out of canvas and so you Died!');
            this.updateLives();
        }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//gems
var Gems = function() {
  //set x and y offset of the gems
  this.spriteYOffset = 50;
  this.spriteXOffset = 82.5;

  //default sprite image Orange Gem
  this.sprite = 'images/gem-orange.png';
  this.gemValue = 2;
  var randGem = Math.floor(Math.random() * 3);
  if( randGem == 0) {
    this.gemValue = 2;
    this.sprite = 'images/gem-orange.png';
  } else if(randGem == 1) {
    this.gemValue = 4;
    this.sprite = 'images/gem-blue.png';
  } else if(randGem == 2) {
    this.gemValue = 6;
    this.sprite = 'images/gem-green.png';
  }
  // Position
  //if two gems are placed on the same location
        this.boardYPos = Math.floor((Math.random() * 10) / 3 ) + 2; // Generate number between 2 and 5
        this.boardXPos = Math.floor((Math.random() * 10) / 2 ) + 2; // Generate number between 1 and 6
        // uncomment below code if number of gems is greater than 1 at a particular interval of time
        // var collision = this.collidingGems();
        // console.log(collision);
        // while(collision > 0) {
        //   this.boardYPos = Math.floor((Math.random() * 10) / 3 ) + 3; // Generate number between 2 and 6
        //   this.boardXPos = Math.floor((Math.random() * 10) / 2 ) + 1; // Generate number between 1 and 5
        //   collision = this.collidingGems();
        //   console.log(collision);
        // }
          this.x = gameBoard.calcXPosition(this.boardXPos, this.spriteXOffset);
          this.y = gameBoard.calcYPosition(this.boardYPos, this.spriteYOffset);
};
//check gems for collisions with each other
Gems.prototype.collidingGems = function() {
  var result = 0;
  allGems.forEach(function(gem) {
    if ((this.boardXPos === gem.boardXPos) && (this.boardYPos === gem.boardYPos)) {
      result+=1;
    }else {
    }
  });
  return result;
};
// Render for each gem on the board
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), gameBoard.calcXPosition(this.boardXPos, this.spriteXOffset), gameBoard.calcYPosition(this.boardYPos, this.spriteYOffset));
};

// collision detection passed to each gem
Gems.prototype.checkCollision = function() {
  // Checks if player ha collided with a gem
  player.gameBoardX = Math.floor((player.x + player.playerXOffset)/gameBoard.stats.blockSizeX)+1;
  player.gameBoardY = Math.floor((player.y + player.playerYOffset)/gameBoard.stats.blockSizeY)+2;
    if (player.gameBoardX == this.boardXPos && player.gameBoardY == this.boardYPos) {
        this.boardXPos = -1;
        this.boardYPos = -1;
        player.score = player.score + this.gemValue; // update the score of the player
        player.updateScore(); //function to check if player has won and basic update
    }
};
//this function will be called independent of the objects
Gems.createGems = function() {
  //generate one gem at a time if number of gems > 1 then call collidingGems() function
  if(game.numOfGems<1) {
    if (Math.floor(game.gameTime) > game.nextGemCreateTime ) { // Check if it's time to create a new gem.
					var gem = new Gems(); // Create gem
              game.numOfGems+=1;
	        		allGems.push(gem);
	        	game.nextGemCreateTime =  Math.floor(game.gameTime) + Math.round((Math.random() * 10) / 3); // create gem every 0-3 seconds
	   		}
  }
};

//additional lives for medium level and hard level
var LifeLines = function () {
  this.spriteYOffset = 50;
  this.spriteXOffset = 85;
  this.sprite = "images/Heart.png";
  this.boardYPos = Math.floor((Math.random() * 10) / 3 ) + 2; // Generate number between 2 and 5
  this.boardXPos = Math.floor((Math.random() * 10) / 2 ) + 2; // Generate number between 1 and 6
  this.x = gameBoard.calcXPosition(this.boardXPos, this.spriteXOffset);
  this.y = gameBoard.calcYPosition(this.boardYPos, this.spriteYOffset);
};

LifeLines.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), gameBoard.calcXPosition(this.boardXPos, this.spriteXOffset), gameBoard.calcYPosition(this.boardYPos, this.spriteYOffset));
};

LifeLines.prototype.checkCollision = function() {
  player.gameBoardX = Math.floor((player.x + player.playerXOffset)/gameBoard.stats.blockSizeX)+1;
  player.gameBoardY = Math.floor((player.y + player.playerYOffset)/gameBoard.stats.blockSizeY)+2;
    if (player.gameBoardX == this.boardXPos && player.gameBoardY == this.boardYPos) {
        this.boardXPos = -1;
        this.boardYPos = -1;
        player.lives += 1; // update the player life by 1
        $("#pLives").html(player.lives);//display updated lifes
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var game = new Game();
var allEnemies = [];
var allGems = [];
var allLives = [];
var gem1 = new Gems();
allGems.push(gem1);
game.numOfGems+=1;
var player = new Player(202.5, 399);
var score = 0;
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);
