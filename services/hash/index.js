const bcrypt = require('bcryptjs');

class Hash {
  static HASH_SALT_ROUND = 2;

  async hash(plainValue) {
    return await bcrypt.hash(plainValue , Hash.HASH_SALT_ROUND);
  }

  async isOrigin(plainValue, hashedValue) {
    try {
      return await bcrypt.compare(plainValue, hashedValue);
    } catch (err) {
      return false;
    }    
  }

}

module.exports = {
  create: () => new Hash
};