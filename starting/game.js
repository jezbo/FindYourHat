const { chooseLevel } = require('./choose-level.js');
const Map = require('./map.js');
const { play } = require('./play.js');
const { verifyMap } = require('./verify-map.js');

 exports.game = () => {
        let gameOver = true;
        let mapArray = [];
        let startPosition = {x:0, y:0};
        let verified = false;
        let newMap;

        //User Selects Level
        const level = chooseLevel(gameOver);
        gameOver = level.gameOver;
        

        while(!verified) {
                const map = new Map();
                map.createMap(level.y, level.x);
                startPosition = map.position;
                mapArray = map.map;
                verified = verifyMap(mapArray,startPosition,map.hatTile,map.fieldTile)
        }
        
        const status = play(mapArray,startPosition);
        if (status==='exit') return 'exit';
        else if(status==='reset') return 'reset';
        else if(status==='win') return 'win';
        else if(status==='lose') return 'lose';
} 



