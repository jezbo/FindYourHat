const prompt = require('prompt-sync')({sigint: true});


exports.chooseLevel = (gameStatus) => {
    const level = {
        easy:{ySize:7, xSize:10},
        medium:{ySize:10, xSize:20},
        hard:{ySize:14, xSize:30}
    }
        
    while(gameStatus) {
        let userInput = prompt('Choose easy(e), medium(m), or hard(h): ');
            
        const input = userInput.toLowerCase();
        if(input==='e' || input==='easy') {
            return {
                y:level.easy.ySize, 
                x:level.easy.xSize, 
                gameOver:false
            };
        }
        else if(input==='m' || input==='medium') {
            return {
                y:level.medium.ySize, 
                x:level.medium.xSize, 
                gameOver:false
            };
        }
        else if(input==='h' || input==='hard') {
            return {
                y:level.hard.ySize, 
                x:level.hard.xSize, 
                gameOver:false
            };
        }
        else{console.log('Try again, choose from e, m or h: ')}
    }
}
