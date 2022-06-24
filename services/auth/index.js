let passport = require('./passport');
let UserSvc = require('../users');
let HashSvc = require('../hash');
const randomCodeGen = require('../random-codes-generator');
const {ERR_INVALID_ARGUMENT} = require('../../resources').errors.codes;

const passportInit = passport.initialize();
const passportSession = passport.session();

class Auth {
  userSvc = UserSvc.create();
  hashSvc = HashSvc.create();

  async signup({
    firstName, lastName, email, password, 
    mobile, birthDate, gender, imgUrl
  }) {
    const hashedPassword = await this.hashSvc.hash(password);

    await this.userSvc.addNewUser({
      firstName, lastName, email,
      password: hashedPassword, 
      mobile, birthDate, gender, 
      imgUrl, 
      isActive: true
    });
  }

  async activateAcount(activationCode) {
    await this.userSvc.activateAccount(activationCode);
  }

  async requestAccountActivationCode({loginName}) {
    let activateCode = randomCodeGen.generate (
      6, 
      randomCodeGen.CODES_TYPES.NUMERIC
    );
        
    await this.userSvc.addActivationCode ({
      code: activateCode,
      loginName
    });
  }

  async requestResetPassword({loginName}) {
    let resetCode = RandomCodeGen.generate(25); 
    await this.userSvc.addResetPasswordCode ({
      resetCode,
      loginName
    });
  }

  async resetPassword(resetCode, newPassword) {

    const hashedPassword = await this.hashSvc.hash(newPassword);
    
    await this.userSvc.resetPassword (
        resetCode,
        hashedPassword
    );
  }

  static getAuthenticateMiddleware(callback) {
    return passport.authenticate('local', (err, user, info) => { 
      if(typeof callback !== 'function')
        throw new Error(ERR_INVALID_ARGUMENT);
      
      callback({err, user, info});
    });
  }

  static getInitAuthMiddleware() {    
  return function (request, response, next) {
    passportInit(
      request,
      response,
      function () { passportSession(request, response, next); }
    );
  }
  }

}

module.exports = {
  create: () => new Auth,
  type: Auth
};

