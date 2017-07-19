var game = {
  "numOfGems": 0,
  "startTime": Date.now(),
  "gameTime": 0,
  "nextGemCreateTime": 0,
  "allGems":[],
  "levels": [
    {
      "name":"Easy",
      "index": "0",
      "bugs": 2,
      "lives":0,
      "maxGems": 10
    },
    {
      "name":"Medium",
      "index": "1",
      "bugs": 4,
      "lives":1,
      "maxGems": 50
    },
    {
      "name":"Hard",
      "index": "2",
      "bugs": 6,
      "lives":2,
      "maxGems": 50
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
  gameTimeCounter : function() {
    // Game time is tracked in  seconds
    game.gameTime = (Date.now() - game.startTime) / 1000;
  },

  renderTime: function() {
    $("#gameTime").html(Math.floor(game.gameTime));
  },

  gemCreator : function() {
    var gemCreateInterval = window.setInterval(Gems.createGems, 1000);
  },

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
  },
  displayGameData : function() {
    $("#gameContainer").append('<div calss="row text-center"><div class="col-md-3"><h3>Time:<span id="gameTime"></span></h3></div></div>');
  }
};

var gameScoreDetails = [
    {
      "pName": "Divesh",
      "hScore": "1000",
      "level": "Hard"
  }
];

// Game Board settings. Could be used for larger boards with other code modifications
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

// Turns Y grid co-ords into pixels
gameBoard.calcYPosition = function(ypos, yOffset) {
    return ypos * gameBoard.stats.blockSizeY  - yOffset;
};

// Turns X grid co-ords into pixels
gameBoard.calcXPosition = function(xpos, xOffset) {
    return xpos * gameBoard.stats.blockSizeX  - xOffset;
};

// Turns X pixels into grid co-ords
gameBoard.calcXPosPixelsToGrid = function(xposPixels, xOffset) {
    return Math.round((xposPixels + xOffset) / gameBoard.stats.blockSizeX);
};


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
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
    this.x = (this.x + (this.speed*dt))%610;
    //mod function ensures that the bug is positioned at the initial position once it goes outside the canvas scope
    //update the speed and the y coordinate of the bug
    if(this.x > 605) {
      this.y = Math.random() * 184 + 50;
      this.speed = Math.random() * 256;
    }
//I am calling check Collisions here instead of in engine.js
    checkCollision(this);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
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
  this.lives = 10;
  this.playerYOffset = -30;
  this.playerXOffset = 20;
  this.score = 0;
  this.gameBoardX = 3;
  this.gameBoardY = 7;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.init = function(gameObj) {
  this.level = gameObj.name;
  this.maxGems = gameObj.maxGems;
};

Player.prototype.update = function() {
      // check if player reaches left, bottom, or right canvas boundary
      if (this.y > 463 ) {
          this.y = 463;
      }
      if (this.x > 510.5) {
          this.x = 510.5;
      }
      if (this.x < 2.5) {
          this.x = 2.5;
      }

      $("#pScore").html(player.score);

};

Player.prototype.updateLives = function() {
  this.lives-=1;
  $("#pLives").html(player.lives);
};

Player.prototype.updateScore = function() {
  player.gemsCollected+=1;
  game.numOfGems-=1;
  if( this.gemsCollected >= this.maxGems) {
    alert("You Won");
    var data = {};
    data.pName = player.name;
    data.hScore = player.score;
    data.level = player.level;
    gameScoreDetails.push(data);
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
  //  console.log('keyPress is: ' + keyPress);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//checkCollisions between an enemy and the player
var checkCollision = function(enemy) {
    // check for collision between enemy and player
    if (player.y + 131 >= enemy.y + 90 && player.x + 25 <= enemy.x + 88 && player.y + 73 <= enemy.y + 135 && player.x + 76 >= enemy.x + 11) {
        console.log('died due to collision');
        player.updateLives();
        player.x = 202.5;
        player.y = 383;
    }

    //check for player reaching top of the canvas and die
    if (player.y + 23 <= 0) {
            player.x = 202.5;
            player.y = 383;
            console.log('You are out of canvas and so you Died!');
            player.updateLives();
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
  var randGem = Math.floor(Math.random() * (3 - 0)) + 0;
  if( randGem == 0) {
    this.sprite = 'images/gem-orange.png';
    this.gemValue = 2;
  } else if(randGem == 1) {
    this.sprite = 'images/gem-blue.png';
    this.gemValue = 4;
  } else if( randGem == 2) {
    this.sprite = 'images/gem-green.png';
    this.gemValue = 6;
  }
  // Position
  this.boardYPos = Math.floor((Math.random() * 10) / 3 ) + 2; // Generate number between 2 and 5
  this.boardXPos = Math.floor((Math.random() * 10) / 2 ) + 1; // Generate number between 1 and 5
  this.x = gameBoard.calcXPosition(this.boardXPos, this.spriteXOffset);
  this.y = gameBoard.calcYPosition(this.boardYPos, this.spriteYOffset);
};

// Render for each gem on the board
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), gameBoard.calcXPosition(this.boardXPos, this.spriteXOffset), gameBoard.calcYPosition(this.boardYPos, this.spriteYOffset));
};

// collision detection passed to each gem
Gems.prototype.collisionDetection = function() {
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

Gems.createGems = function() {
  if(game.numOfGems<3) {
    if (Math.floor(game.gameTime) > game.nextGemCreateTime ) { // Check if it's time to create a new gem.

				var gemsToCreate = Math.round((Math.random() * 10) / 5) + 1; // Generate # between 1-3

				for (var i = 1; i <= gemsToCreate; i++) {
					var gem = new Gems(); // Create gem
              game.numOfGems+=1;
	        		allGems.push(gem);
				}

	        	game.nextGemCreateTime =  Math.floor(game.gameTime) + Math.round((Math.random() * 10) / 3); // create gem every 0-3 seconds
	   		}
  }
};
var allEnemies = [];
var allGems = [];
var gem1 = new Gems();
allGems.push(gem1);
game.numOfGems+=1;
var player = new Player(202.5, 383);
var score = 0;
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);
