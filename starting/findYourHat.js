const { game } = require('./game');
const { textAnimation } = require('./textAnimation');
const { retryPrompt } = require('./retryPrompt');



const loop = () => {
    let message='';
    const time = () => (3*message.length*225)+225;
    let exit = false;
    const gameConclusion = game();
    if(gameConclusion==='exit') exit=true;
    else if(gameConclusion==='reset') {
        process.stdout.cursorTo(0,0);
        process.stdout.clearScreenDown();
        loop();
    }
    else if(gameConclusion==='win') {
        let msg = 'WINNER!!!'
        textAnimation(msg);
        message = msg;
    }
    else if(gameConclusion==='lose') {
        let msg = 'LOSER!!!'
        textAnimation(msg);
        message = msg;
    }
    
    if(!exit) {
    const retryCallback = () => {
        replay = retryPrompt();
        if(!replay)  exit=true;
        clearTimeout(retryTimeout);
        retryTimeout = {};
        if(!exit) loop();
        else if(exit) {
            process.stdout.cursorTo(0,0)
            process.stdout.clearScreenDown();
        }
    };
    
        let retryTimeout = setTimeout(retryCallback,time());
    };
}
loop();
