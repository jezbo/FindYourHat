//Text animation to console/prompt

const prompt = require('prompt-sync')({sigint: true});

exports.textAnimation = (message) => {
    const messageArray = [...message];
    let i=0;
  
    const printMessage = () => {
        if(i===0) process.stdout.clearLine();
        process.stdout.cursorTo(i);
        process.stdout.write(messageArray[i]);
        i++;
        if(i===messageArray.length) {
            i=0;
            process.stdout.cursorTo(0);
        }
    }

    let messageInterval = setInterval(printMessage, 225);

    const clearMainInterval = () => {
        clearInterval(messageInterval)
        messageInterval={};
        clearTimeout(messageEnd)
        messageEnd={};
    }
    const time = (3*(message.length*225))+225;
    
    let messageEnd = setTimeout(clearMainInterval,time);
}