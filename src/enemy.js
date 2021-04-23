class Enemy {
    constructor(enemyX, enemyY,){
        this.enemyX = enemyX;
        this.enemyY = enemyY;
    }
    createEnemy(room) {
        this.enemyX = 0;
        this.enemyY = 0;
        while (room.grid[this.enemyX][this.enemyY] != "floor") {
            this.enemyX = getRandomIntInclusive(1,(room.roomWidth - 1));
            this.enemyX = Math.round(this.enemyX);
            this.enemyY = getRandomIntInclusive(2,(room.roomHeight - 1));
            this.enemyY = Math.round(this.enemyY);
        }
        room.grid[this.enemyX][this.enemyY] = "enemy";
      }
      enemyMove(room){
        room.grid[this.enemyX][this.enemyY] = "floor";
        var enemyDirection = getRandomIntInclusive(0,3);
        enemyDirection = Math.round(enemyDirection);
        var movesX = [-1,1,0,0];
        var movesY = [0,0,-1,1];
        var newX = this.enemyX + movesX[enemyDirection];
        var newY = this.enemyY + movesY[enemyDirection];
        if ((room.grid[newX][newY] == "floor")){
            this.enemyX = newX;
            this.enemyY = newY;
        }
        if ((room.grid[newX][newY] == "player")){
          playerHealth = playerHealth - 1;
        }
        room.grid[this.enemyX][this.enemyY] = "enemy";
      }  
}
/*

for (var i = 0; i < enemies.length; i++){
  var enemy = enemies[i];

  enemy.draw();
}
*/