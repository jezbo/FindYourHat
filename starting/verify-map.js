const { findMapSize } = require('./findMapSize');
const { move } = require('./move');
const clonedeep = require('lodash.clonedeep');

exports.verifyMap = (map, start, success, passableTiles) => {
    const possibleMoves = [['u',-1,0],['d',1,0],['l',0,-1],['r',0,1]];
    const testMap = clonedeep(map);
    let verified = false;
    const testArray = [start];
    const testIndex = () => testArray.length-1;
    while(!verified && testIndex()>=0){
        let index = testIndex();
        let testCase = testArray[index];
        for(let i=0; i<4; i++) {
            const moveY = possibleMoves[i][1];
            const moveX = possibleMoves[i][2];
            const newPosition = {y:testCase.y+moveY, x:testCase.x+moveX};
            const mapSize = findMapSize(testMap);
            const mapSizeY = mapSize.y;
            const mapSizeX = mapSize.x[newPosition.y]
            let validMove = false;
            let movedTo;
            if
            (
                newPosition.y<mapSizeY
                &&
                newPosition.x<mapSizeX
                &&
                newPosition.y>=0
                &&
                newPosition.x>=0
            ){
                validMove=true;
                movedTo = testMap[newPosition.y][newPosition.x];
            }
            else {
                validMove=false;
            }

            if(validMove){
                if(movedTo===success) verified=true;
                else if(passableTiles.includes(movedTo)) {
                    testArray.unshift({y:newPosition.y, x:newPosition.x});
                    testMap[testCase.y][testCase.x] = 'J';
                }
            }
            if(i===3) testArray.splice(testIndex());
        }
        
    }
    return verified;
}