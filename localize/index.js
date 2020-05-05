var arabicStr = require('./ar');
var enStr = require('./en');


module.exports = function(strKey, language) {
    language = language || 0;
    switch(language) {
        case 1: 
            return enStr[strKey];
        case 2:
            return arabicStr[strKey];
        default:
             return enStr[strKey];
    }
}