const { chooseLevel } = require('./choose-level.js');
const Map = require('./map.js');
const { play } = require('./play.js');
const { winLoseRoutine } = require('./winLoseRoutine');

 exports.game = () => {
        let gameOver = true;
        let mapArray = [];
        let startPosition = {x:0, y:0};

        //User Selects Level
        const level = chooseLevel(gameOver);
        gameOver = level.gameOver;

        let newMap = new Map();
        newMap.createMap(level.y, level.x);
        startPosition = newMap.position;
        mapArray = newMap.map;
        
        const status = play(mapArray,startPosition);
        if (status==='exit') return 'exit';
        else if(status==='reset') return 'reset';
        else if(status==='win') return 'win';
        else if(status==='lose') return 'lose';
} 



