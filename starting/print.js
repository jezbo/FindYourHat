//print a map from a 2d array
exports.print = (map) => {
    process.stdout.cursorTo(0,0);
    process.stdout.clearScreenDown();
    map.forEach((e, i) => {
        process.stdout.cursorTo(0,i);
        process.stdout.write(e.join(''));
        if(i===map.length-1) {
            //move cursor onto new line
            process.stdout.cursorTo(0,i+1)
        }
    })
}