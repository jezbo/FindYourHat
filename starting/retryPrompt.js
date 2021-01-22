const prompt = require('prompt-sync')({sigint: true});

exports.retryPrompt = () => {
    const userInput = prompt('Play again (y/n): ');
    const input = userInput.toLowerCase();
    if(input==='y' || input==='yes') {
        return true;
    }
    else if(input==='n' || input==='no') {
        return false;
    }
    else {
        console.log('I don\'t understand. Try again.');
    }
}