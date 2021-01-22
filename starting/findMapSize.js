/****Finds column length (y) of map by '.length' of mapArray's first dimension and 
interates through 2nd dimensions to find each row length (x) recording variations in x.
so returns x property as an array - {x:[]}****/
exports.findMapSize = (mapArray) => {
    return {
        y:mapArray.length,
        x:mapArray.map(e => e.length)
    };
}