const cryptoRandomString = require('crypto-random-string');

class RandomCodesGenerator {
  CODES_TYPES = {
    ALPHA_NUMERIC: 'alphanumeric',
    NUMERIC: 'numeric'
  }

  generate(
    length = 10, 
    codeType = this.CODES_TYPES.ALPHA_NUMERIC
  ) {
    return cryptoRandomString({length, type: codeType});
  }
  
}

module.exports = new RandomCodesGenerator();