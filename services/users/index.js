const UserModel = require('../../models').user;

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

    mobile = this.userModel.fixMobile({mobile});

    await this.userModel.addNewUser({
      firstName, lastName, password, 
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