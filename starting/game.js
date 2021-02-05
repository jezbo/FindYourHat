const { chooseLevel } = require('./choose-level.js');
const Map = require('./map.js');
const { play } = require('./play.js');
const { verifyMap } = require('./verify-map.js');

 exports.game = () => {
        //console.log("\x1b[34mnnamdi\x1b[89m")
        let gameOver = true;
        let mapArray = [];
        let startPosition = {x:0, y:0};
        let verified = false;
        const map = new Map();
        const mapTiles = {
                hat: map.hatTile,
                hole: map.holeTile,
                field: map.fieldTile,
                path: map.pathTile,
                player: map.playerTile,
                death: map.deathTile
        };

        //User Selects Level
        const level = chooseLevel(gameOver);
        gameOver = level.gameOver;
        

        while(!verified) {
                map.createMap(level.y, level.x);
                startPosition = map.position;
                mapArray = map.map;
                verified = verifyMap(mapArray,startPosition,mapTiles.hat,mapTiles.field)
        }
        
        const status = play(mapArray,startPosition,mapTiles);
        if (status==='exit') return 'exit';
        else if(status==='reset') return 'reset';
        else if(status==='win') return 'win';
        else if(status==='lose') return 'lose';
} 



