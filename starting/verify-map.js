const { findMapSize } = require('./findMapSize');
const { move } = require('./move');
const clonedeep = require('lodash.clonedeep');

exports.verifyMap = (map, start, success, passableTiles) => {
    const possibleMoves = [['u',-1,0],['d',1,0],['l',0,-1],['r',0,1]];
    const testMap = clonedeep(map);
    //let count = 0;
    // console.log(map);
    // console.log('start ' + start.y + ' ' + start.x);
    // console.log('win is: ' + success);
    // console.log('passable is ' + passableTiles);
    let verified = false;
    const testArray = [start];
    //console.log('testArray: ' + testArray);
    //if(testArray.length>0) console.log('testArray[0]: ' + testArray[0].y + ' ' + testArray[0].x);
    //else console.log('testArray empty')
    const testIndex = () => testArray.length-1;
    //console.log('testIndex' + testIndex())
    //if(testIndex()>=0) console.log('testIndex>=0!!')
    while(!verified && testIndex()>=0){
        //console.log(testMap);
        //console.log(map);
        let index = testIndex();
        let testCase = testArray[index];
        for(let i=0; i<4; i++) {
            //console.log('i: ' + i);
            //count++;
            //console.log('count: ' + count + ' testArray.length: ' + testArray.length);
            const moveY = possibleMoves[i][1];
            //console.log('moveY:' + moveY)
            const moveX = possibleMoves[i][2];
            const newPosition = {y:testCase.y+moveY, x:testCase.x+moveX};
            //console.log('newPosition.y: ' + newPosition.y);
            const mapSize = findMapSize(testMap);
            const mapSizeY = mapSize.y;
            const mapSizeX = mapSize.x[newPosition.y]
            //console.log('mapsizes: ' + mapSizeY + ' and X: ' + mapSizeX)
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
                //console.log('move is valid')
                validMove=true;
                movedTo = testMap[newPosition.y][newPosition.x];
            }
            else {
                validMove=false;
                //console.log('move is not valid');
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