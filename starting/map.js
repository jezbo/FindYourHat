const { randomNumber } = require('./randomNumber');
const clonedeep = require('lodash.clonedeep');


module.exports = class Map {
    constructor() {
        this.mapSize = {
            small: {y:7, x:10},
            medium: {y:10, x:20},
            large: {y:14, x:30}
        };
        this.position = {y:0, x:0};
        this.map = [];
        this.hat = {y:0, x:0}
        
        //Map tiles
        this.hatTile = '^';
        this.holeTile = 'O';
        this.fieldTile = '░';
        this.pathTile = '*';
        this.playerTile = '|';
        this.deathTile = 'X';
    }

    //***Place hat in map w. dimensions ySize:xSize***
    loseHat(ySize, xSize) {
        //hat must be in bottom 2/3 of map
        while(this.hat.y<Math.floor(ySize/3)){
           this.hat.y = randomNumber(ySize) 
        }
        //horizontal position is anywhere
        this.hat.x = randomNumber(xSize);       
    };

    //***Set player start position***
    startPosition(ySize, xSize) {
        //player starts in top 1/3 of map
        this.position.y=ySize;
        do {this.position.y = randomNumber(ySize);} 
        while (this.position.y>Math.floor(ySize/3))
        
        this.position.x = randomNumber(xSize);
    }

    //***Create the map as 2-d array***
    createMap(ySize, xSize) {
        this.map = [];
        let holeCount=0;
        let rowPlaceholder = [];
        const clearRowPlaceholder = () => rowPlaceholder=[];
        this.loseHat(ySize, xSize);
        this.startPosition(ySize, xSize);

        for(let i=0; i<ySize; i++) {
            
            for(let j=0; j<xSize; j++) {
                const randomTile = randomNumber(100);
                if(
                    i===this.position.y 
                    && 
                    j===this.position.x
                ) {
                    rowPlaceholder.push(this.playerTile);
                }
                else if(
                    i===this.hat.y
                    &&
                    j===this.hat.x
                ) {
                    rowPlaceholder.push(this.hatTile);
                }
                else if(
                    randomTile>=0
                    &&
                    randomTile<=19
                    &&
                    holeCount<(xSize*ySize/3)+(4*ySize/10)
                ) {
                    rowPlaceholder.push(this.holeTile);
                    holeCount++;
                }
                else {
                    rowPlaceholder.push(this.fieldTile);
                }
            }
            this.map.push(rowPlaceholder);
            clearRowPlaceholder()
        }
    }
}