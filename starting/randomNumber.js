/****Create a random number between 0 and 
    (but not including) upperLimit****/

exports.randomNumber = (upperLimit) => {
    const randomNo = Math.floor(
        Math.random()*upperLimit
    );
    return randomNo;
};
