const prompt = require('prompt-sync')({sigint: true});
const { move } = require('./move');
const { print } = require('./print');

exports.play = (mapArray,startingPosition) => {
    const map = mapArray;
    const moves = {
        u:{y:-1, x:0},
        d:{y:1, x:0},
        l:{y:0, x:-1},
        r:{y:0, x:1}
    };
    let mainInstructions = 'Move u, d, l, r (exit(x) or reset(s)): ';
    let endGame = false;
    let position = startingPosition;
    
    while(!endGame) {
        process.stdout.cursorTo(0,0);
        process.stdout.clearScreenDown();
        print(map);
        process.stdout.cursorTo(0,map.length+1);
        process.stdout.clearScreenDown();
        let UserInput = prompt(`${mainInstructions}`);
        let input = UserInput.toLowerCase();

        //***Exit***
        if(input==='x' || input==='exit') {
            process.stdout.cursorTo(0,0);
            process.stdout.clearScreenDown();
            endGame=true;
            return 'exit';
        }
        //***Reset Game***
        else if(input==='s' || input==='reset') {
            endGame = true;
            return 'reset';
        }
        else if(moves.hasOwnProperty(input)) {
            let newPosition = move(map,position,moves[input].y,moves[input].x)
            if(
                newPosition
                &&
                map[newPosition.y][newPosition.x]==='^'
            ) {
                endGame=true;
                return 'win'
            }
            else if(
                newPosition
                &&
                map[newPosition.y][newPosition.x]==='O'
            ) {
                map[position.y][position.x] = '*';
                map[newPosition.y][newPosition.x] = 'X';
                endGame=true;
                print(map);
                return 'lose'
            }
            else if(
                newPosition
                &&
                map[newPosition.y][newPosition.x]==='░'
            ) {
                map[position.y][position.x] = '*';
                map[newPosition.y][newPosition.x] = '|';
                position = newPosition;
            }
            else if(
                newPosition
                &&
                map[newPosition.y][newPosition.x]==='*'
            ) {
                map[newPosition.y][newPosition.x] = '|';
                position = newPosition;
            }
            else if(!newPosition) {
                process.stdout.cursorTo(0,map.length+1);
                process.stdout.clearScreenDown();
                prompt('You step off the edge of the Earth and\nsome time later land right back where\nyou started.\n\nHow strange.\n\nPress Enter to continue...');
                print(map);
            }
        }
    }
}