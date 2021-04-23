class Room{
    constructor(roomWidth, roomHeight){
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.generateRoom(10, 10);
    }
    generateRoom(width, height) {
      this.roomWidth = width;
      this.roomHeight = height;
      this.grid = [];
        for(var i = 0; i < this.roomWidth; i++){
            this.grid.push([]);
          for(var j = 0; j < this.roomHeight; j++){
            this.grid[i].push("wall");
          }
        }
        for(var i = 1; i < this.roomWidth - 1; i++){
          for(var j = 1; j < this.roomHeight - 1; j++){
            this.grid[i][j] = "floor";
          }
        }
        this.createHealthItem();
        this.createDoor();
        var enemyAmount = 0;
        var gridSquares = (width * height);
        if (gridSquares >= 200){
          enemyAmount = 3;
        } else if (gridSquares >= 70){
          enemyAmount = 2;
        } else if (gridSquares >= 25){
          enemyAmount = 1;
        }
        console.log(gridSquares);
        console.log(enemyAmount);
        //this.enemies.push(new Enemy(0, 0))
        this.enemies = [];
        //this.enemies = [new Enemy(3, 3), new Enemy(3, 2)];
        for (var i = 0; i < enemyAmount; i++){
          //this.enemies[i].createEnemy(this);
          this.enemies.push(new Enemy());
          this.enemies[i].createEnemy(this);
        }
        }
    createHealthItem() {
      this.healthItemX = 0;
      this.healthItemY = 0;
      while (this.grid[this.healthItemX][this.healthItemY] != "floor") {
        this.healthItemX = getRandomIntInclusive(1,(this.roomWidth - 1));
        this.healthItemX = Math.round(this.healthItemX);
        this.healthItemY = getRandomIntInclusive(2,(this.roomHeight - 1));
        this.healthItemY = Math.round(this.healthItemY);
      }
      this.grid[this.healthItemX][this.healthItemY] = "healthItem";
    }
    createDoor() {
      this.doorX = 0;
      this.doorY = 0;
      while (this.grid[this.doorX][this.doorY] != "floor") {
        this.doorX = getRandomIntInclusive(1,(this.roomWidth - 1));
        this.doorX = Math.round(this.doorX);
        this.doorY = getRandomIntInclusive(2,(this.roomHeight - 1));
        this.doorY = Math.round(this.doorY);
      }
      this.grid[this.doorX][this.doorY] = "door";
    }
}