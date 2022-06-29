const UserModel = require('../../models').user;
let HashSvc = require('../hash');

class User {
  userModel = UserModel.create();

  async getUserDetails({ userId }) {
    return await this.userModel.findUser({ userId });
  }

  async addNewUser({
    firstName, lastName, password,
    birthDate, gender, email, mobile,
    imgUrl, roleId, isActive
  }) {

    await this.userModel.addNewUser({
      firstName, lastName, password, 
      birthDate, gender, email, mobile,
      imgUrl, roleId, isActive
    });
  }

  async updateUser({
    userId, firstName, lastName, password,
    birthDate, gender, email, mobile,
    imgUrl, roleId, isActive
  }) {

    const hashedPassword = await HashSvc.create().hash(password);
    
    await this.userModel.updateUser({
      userId, firstName, lastName, 
      password: hashedPassword,
      birthDate, gender, email, mobile,
      imgUrl, roleId, isActive
    });
  }

  async activateAccount(activateCode) {
    await this.userModel.activateAccount(activateCode);
  }

  async addActivationCode({code, loginName}) {
    await this.userModel.addActivationCode({code, loginName});
  }

  async addResetPasswordCode({code, loginName}) {
    await this.userModel.addResetPasswordCode({code, loginName});
  }

  async resetPassword(resetCode, newPassword) {
    await this.userModel.resetPassword(resetCode, newPassword);
  }
}


module.exports = {
  create: () => new User
};