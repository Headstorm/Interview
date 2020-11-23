var encode = function(charString) {
    let charMap = [];
    var currCount = 1;
    for (let i = 0; i < charString.length; i++) {
        if (i == charString.length - 1 || charString[i] != charString[i+1]) {
            charMap.push(charString[i], currCount);
        } else {
            currCount ++;
        }
    }
}