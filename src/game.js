/*TO DO:
All major features have been added.

Possible additions:
*Add limits to how close an object can spawn to the player. I've already made it so they can't spawn on the same place,
but having them not spawn directly next to each other would work too.
*Add CSS to the HTML pages. It's not needed, but it would make the pages look better.
*Color-code some of the text: red for enemies, green and blue for the health item and door.
*CHECK: Do enemies move before or after the room is drawn? They should spawn in as it's drawn, but only move after the player first moves.

Backend improvements:
*BUG: Text changes sizes slightly when moving. Is there a way to do it with percents instead of always being a set pixel size?
*CLEANUP: An easier way to check what's directly next to a space on the grid. getGridPosition is only for the player, it should be able to go from any position.
*CLEANUP: Reorganize functions and variables so they're in a more logical order.
*/

//Create the canvas
function setup() {
  createCanvas(800, 800);
  doorSound = loadSound("src/sound/door.mp3");
  healthSound = loadSound("src/sound/health.mp3");
  moveSound = loadSound("src/sound/move.mp3");
}

//Draw the grid
function draw() {
  for(var i = 0; i < room.roomWidth; i++){
    for(var j = 0; j < room.roomHeight; j++){
      xPos = 60 * i;
      yPos = (60 * j) + 60;
      textSize(50);
      switch(room.grid[i][j]) {
        case "wall":
          text("--", xPos, yPos)
          break
        case "player":
          text("P", xPos, yPos)
          break
        case "enemy":
          text("E", xPos, yPos)
          break
        case "healthItem":
          text("H", xPos, yPos)
          break
        case "door":
          text("D", xPos, yPos)
          break
      }
      //rect(i*60, j*60, 60, 60);
    }
  }
  drawPlayerHealth();
  drawScore();
}

//Draw the health at the bottom of the screen
function drawPlayerHealth() {
  //textSize(32);
  var healthX = 0;
  var healthY = (room.roomHeight * 60) + 60;
  text("Your Health:", healthX, healthY)
  fill("red")
  for(var i = 0; i < playerHealth; i++){
    //playerHealth * "♡"
    text("H", healthX, healthY + 50)
    healthX = healthX + 40;
  }
  if (playerHealth < 1) { //Place generateRoom in here and the room generates rapidly
    gameRunning = false;
    drawGameOver();
  }
  fill("black")
}

//Draw the score
function drawScore() {
  //textSize(32);
  var scoreX = 300;
  var scoreY = (room.roomHeight * 60) + 60;
  text("Your Score:", scoreX, scoreY)
  fill("lightgreen")
  text(score, scoreX, scoreY + 50)
  fill("black")
}

//If the player runs out of health, draw this text
function drawGameOver() { //Place generateRoom in here and the room generates rapidly
  fill("red")
  text("You've run out of health!", 10, 200)
  text("Press a key to restart.", 10, 300)
  fill("black")
}

//Create first room, set player health, initialize game running
var room = new Room(10, 10);
var playerHealth = 5;
var score = 0;
var gameRunning = true;

//This is used to check what's directly next to the player
function getGridPosition(keyCode) {
  if ((keyCode === LEFT_ARROW) || (keyCode == 1)) {
    return room.grid[playerX - 1][playerY];
  } else if ((keyCode === RIGHT_ARROW) || (keyCode == 2)) {
    return room.grid[playerX + 1][playerY];
  } else if ((keyCode === UP_ARROW) || (keyCode == 3)) {
    return room.grid[playerX][playerY - 1];
  } else if ((keyCode === DOWN_ARROW) || (keyCode == 4)) {
    return room.grid[playerX][playerY + 1];
  }
}

//Set player position
var playerX = 1;
var playerY = 1;

function generateRoom() {
  room.grid[playerX][playerY] = "floor";
  newRoomWidth = getRandomIntInclusive(6,13);
  newRoomHeight = getRandomIntInclusive(5,11);
  room.generateRoom(newRoomWidth, newRoomHeight);
  do {
    playerX = getRandomIntInclusive(1,(room.roomWidth - 1));
    playerX = Math.round(playerX);
    playerY = getRandomIntInclusive(1,(room.roomHeight - 1));
    playerY = Math.round(playerY);
  } while ((room.grid[playerX][playerY] != "floor") || (playerX >= room.newRoomWidth) || (playerY >= room.roomHeight))
}

//Player movement
room.grid[playerX][playerY] = "player";
function keyPressed() {
  if (gameRunning == true) {
    room.grid[playerX][playerY] = "floor";
    //moveSound.play();
    if (getGridPosition(keyCode) == "enemy") {
      playerHealth = playerHealth - 1;
    }
    if (getGridPosition(keyCode) == "healthItem") {
      if (playerHealth > 6){
        console.log("Health cap");
      } else {
        healthSound.play();
        playerHealth = playerHealth + 1;
      }
      room.grid[room.healthItemX][room.healthItemY] = "floor";
    }
    if (getGridPosition(keyCode) == "door") {
      score = score + 1;
      doorSound.play();
      generateRoom();
      //room.grid[playerX][playerY] = "player";
    }
    if ((keyCode === LEFT_ARROW) && (room.grid[playerX - 1][playerY] == "floor")) {
      playerX = playerX - 1;
    } else if ((keyCode === RIGHT_ARROW) && (room.grid[playerX + 1][playerY] == "floor")) {
      playerX = playerX + 1;
    } else if ((keyCode === UP_ARROW) && (room.grid[playerX][playerY - 1] == "floor")) {
      playerY = playerY - 1;
    } else if ((keyCode === DOWN_ARROW) && (room.grid[playerX][playerY + 1] == "floor")) {
      playerY = playerY + 1;
    }
    background("#FFFFFF");
    room.grid[playerX][playerY] = "player";
    for (var i = 0; i < room.enemies.length; i++){
      var enemy = room.enemies[i];
    
      enemy.enemyMove(room);
    }    
  } else {
    background("#FFFFFF");
    playerHealth = 5;
    score = 0;
    gameRunning = true;
    generateRoom();
    room.grid[playerX][playerY] = "player";
  }
}

//Better version of math.random()
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}