//move in a 2d field. returns object with x and y properties
const { findMapSize } = require('./findMapSize');

exports.move = (mapArray, startingPosition, yMove, xMove) => {
    const mapSize = findMapSize(mapArray);
    if(
        startingPosition.y+yMove<mapSize.y 
        && 
        startingPosition.x+xMove<mapSize.x[startingPosition.y]
        &&
        startingPosition.y+yMove>=0
        &&
        startingPosition.x+xMove>=0
    ){
        return {
            y:(startingPosition.y + yMove), 
            x:(startingPosition.x + xMove)
        }    
    }
    else return false;
}

