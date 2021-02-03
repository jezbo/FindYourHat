const { move } = require('./move');

exports.verifyMap = (mapArray, startPosition, winCriteria, passableTiles) => {
    //map dimensions, assuming symmetry 
    const testMap = mapArray;
    let verified = false;
    
    const testArray=[startPosition]
    const testIndex = () => testArray.length-1;
    let testCoordinates = testArray[testIndex()];
    const surveyedCoordinates = '*';
    
    const moves = [['u',-1,0],['d',1,0],['l',0,-1],['r',0,1]];
    let i = 0;
    
    while(!verified && testIndex()>=0) {
        console.log(`while loop started`)
        testCoordinates=testArray[testIndex()]
        moves.forEach(
            e => {
                console.log(`for each started`);
                const makeMove = move(testMap,testArray[testIndex()],e[1],e[2])
                console.log(makeMove);
                if(makeMove){console.log(testMap[e[1]][e[2]])};
                if(makeMove===winCriteria) {
                        console.log('verified')
                        verified=true;
                        return true;
                    }
                    else if(passableTiles.includes(makeMove)) {
                        i++;
                        console.log(`tested: ${i}`);
                        testArray.unshift({
                            y:e[1],
                            x:e[2]
                        });
                        testMap[e[1]][e[2]] = surveyedCoordinates;
                    }
                }  
        ) 
        testArray.splice(testIndex(),1);
    }
}
